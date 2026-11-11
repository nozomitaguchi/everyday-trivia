#!/usr/bin/env node
// みのまわり図鑑: static site build. Node 22 standard library only, no packages.
//
//   node tools/build.mjs                 -> _site/ for https://nozomitaguchi.github.io/everyday-trivia/
//   SITE_URL=https://example.com/ node tools/build.mjs   (a custom domain later)
//   BASE_PATH=/everyday-trivia/  OUT=_site               (optional overrides)
//
// Reads the same sources as the in-browser version (README.md index, trivia/*.md, items/*.md,
// assets/figures-*.js) through assets/core.js, and writes one HTML file per page with the text
// of all three reader levels already in it; CSS shows the level the reader picked.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { makeCover, contentBox } from './cover.mjs';

const t0 = performance.now();
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const require = createRequire(import.meta.url);
const CORE = require(path.join(ROOT, 'assets/core.js'));
const { LEVELS, ANGLES, esc, inline, toHtml, parseIndex, parseEntry, entryView, angleLabels, angleId, firstParagraph, plain, displayTitle } = CORE;

let SITE = process.env.SITE_URL || 'https://nozomitaguchi.github.io/everyday-trivia/';
if (!SITE.endsWith('/')) SITE += '/';
let B = process.env.BASE_PATH || new URL(SITE).pathname;
if (!B.startsWith('/')) B = '/' + B;
if (!B.endsWith('/')) B += '/';
const OUT = path.resolve(ROOT, process.env.OUT || '_site');
const abs = p => new URL(p.replace(/^\//, ''), SITE).href; // site-relative path -> absolute URL
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

// ---------- sources ----------
const idx = parseIndex(read('README.md'));
const allItems = idx.cats.flatMap(c => c.items);
const allEntries = allItems.flatMap(i => i.entries);
const md = new Map(allEntries.map(e => [e.slug, read(`trivia/${e.slug}.md`)]));
const itemMd = new Map(allItems.map(i => [i.id, fs.existsSync(path.join(ROOT, `items/${i.id}.md`)) ? read(`items/${i.id}.md`) : null]));

// figures: the figure files only build strings (no DOM), so they run in one shared context with a fake window,
// in the order index.html loads them (some files use helpers that earlier files put on window);
// figure files not listed in index.html yet come after, in name order.
const F = {};
const figCtx = { window: { AHA_FIGURES: F } };
vm.createContext(figCtx);
{
  const listed = [...read('index.html').matchAll(/<script src="assets\/(figures-[^"]+\.js)"><\/script>/g)].map(m => m[1]);
  const all = fs.readdirSync(path.join(ROOT, 'assets')).filter(f => /^figures-.*\.js$/.test(f)).sort();
  for (const f of [...listed.filter(f => all.includes(f)), ...all.filter(f => !listed.includes(f))]) {
    try { vm.runInContext(read(`assets/${f}`), figCtx, { filename: f }); } catch (e) { console.warn(`warning: ${f}: ${e.message}`); }
  }
}
const hasFig = n => !!(n && F[n]);
const widgetCtx = { window: {} };
vm.createContext(widgetCtx);
vm.runInContext(read('assets/widgets.js'), widgetCtx);
const WIDGET_SLUGS = new Set(widgetCtx.window.AHA_WIDGETS.slugs);

// ---------- dates (for "recently deepened" and sitemap lastmod) ----------
// With full git history (CI uses fetch-depth: 0) each file's last commit date; otherwise tools/working.txt.
function gitDates() {
  try {
    const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 << 20, stdio: ['ignore', 'pipe', 'ignore'] });
    if (git('rev-parse', '--is-shallow-repository').trim() === 'true') return null;
    const map = new Map();
    let date = null;
    for (const line of git('log', '--format=@%cI', '--name-only', '--', 'trivia', 'items').split('\n')) {
      if (line.startsWith('@')) { date = line.slice(1); continue; }
      if (line && date && !map.has(line)) map.set(line, date);
    }
    return new Set(map.values()).size > 1 ? map : null;
  } catch (e) { return null; }
}
const fileDates = gitDates();
const itemDate = it => {
  if (!fileDates) return null;
  const ds = [...it.entries.map(e => fileDates.get(`trivia/${e.slug}.md`)), fileDates.get(`items/${it.id}.md`)].filter(Boolean);
  return ds.length ? ds.reduce((a, b) => (Date.parse(a) > Date.parse(b) ? a : b)) : null;
};
function recentItems() {
  if (fileDates) {
    return allItems.map((it, i) => ({ it, i, d: itemDate(it) })).filter(x => x.d)
      .sort((a, b) => Date.parse(b.d) - Date.parse(a.d) || a.i - b.i).map(x => x.it);
  }
  const txt = fs.existsSync(path.join(ROOT, 'tools/working.txt')) ? read('tools/working.txt') : '';
  const rows = txt.split('\n').map(l => l.match(/^([a-z0-9-]+)\s+(\d{4}-\d\d-\d\dT[\d:]+Z?)\s*$/)).filter(Boolean)
    .map(m => ({ id: m[1], at: m[2] })).sort((a, b) => (a.at < b.at ? 1 : -1));
  const seen = new Set();
  return rows.filter(r => idx.items.has(r.id) && !seen.has(r.id) && seen.add(r.id)).map(r => idx.items.get(r.id));
}

// ---------- assets (with a content hash for cache busting) ----------
const ASSETS = ['assets/style.css', 'assets/core.js', 'assets/widgets.js', 'assets/site.js'];
const ver = {};
for (const a of ASSETS) ver[a] = crypto.createHash('sha1').update(read(a)).digest('hex').slice(0, 8);
const asset = a => `${B}${a}?v=${ver[a]}`;

// ---------- small HTML helpers ----------
const LV = LEVELS.map(l => l.id);
// one string per reader level -> only what differs is repeated; CSS shows the reader's level
function lvx(o, tag = 'span', cls = '') {
  const groups = new Map();
  LV.forEach(l => { const v = o[l] ?? ''; groups.set(v, [...(groups.get(v) || []), l]); });
  const c = cls ? ` class="${cls}"` : '';
  if (groups.size === 1) { const [v] = groups.keys(); return v && (cls || tag !== 'span') ? `<${tag}${c}>${v}</${tag}>` : v; }
  return [...groups].filter(([v]) => v).map(([v, ls]) => `<${tag}${c} data-lv="${ls.join(' ')}">${v}</${tag}>`).join('');
}
const say = (small, kid, adult) => lvx({ small, kid, adult });
const angleSay = a => { const L = angleLabels(a); return lvx(L); };

const PICTO = {
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  food: '<path d="M3 11h18a9 9 0 0 1-18 0Z"/><path d="M9 4v3M12 3v4M15 4v3"/>',
  town: '<path d="M4 21V7l7-3v17"/><path d="M11 10h9v11"/><path d="M2 21h20M14 14h3M14 17h3"/>',
  vehicles: '<rect x="5" y="3" width="14" height="14" rx="3"/><path d="M5 10h14M8 21l2-4M16 21l-2-4"/>',
  'living-things': '<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15Z"/><path d="M5 19 14 10"/>',
  sky: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"/>',
  body: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/>',
};
const LOGO_MARK = (cls = '') => `<svg class="logo-mark ${cls}" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle class="lm-lens" cx="20" cy="20" r="14.5"/><path class="lm-key" d="M20 12.5a4.5 4.5 0 0 1 2.6 8.200L24 28h-8l1.400-7.300A4.500 4.500 0 0 1 20 12.500Z"/><path class="lm-handle" d="M31 31l11 11"/></svg>`;
const picto = id => `<svg class="picto" viewBox="0 0 24 24" aria-hidden="true">${PICTO[id] || '<circle cx="12" cy="12" r="8"/>'}</svg>`;

// a drawing that reaches past its viewBox (a tree poking over the top, ...) gets a viewBox that holds it,
// so nothing is drawn outside the picture panel (shapes only; text cannot be measured without fonts)
const boxCache = new Map();
function figBox(n) {
  if (boxCache.has(n)) return boxCache.get(n);
  const box = F[n].box || '0 0 320 200';
  let out = box;
  const v = box.trim().split(/[\s,]+/).map(Number);
  const c = v.length === 4 && v.every(Number.isFinite) ? contentBox(F[n].svg) : null;
  if (c) {
    const x0 = Math.min(v[0], c.x - 2), y0 = Math.min(v[1], c.y - 2), x1 = Math.max(v[0] + v[2], c.x + c.w + 2), y1 = Math.max(v[1] + v[3], c.y + c.h + 2);
    // only grow, and only within reason (a stray far-away shape must not shrink the whole picture)
    if ((x0 < v[0] - 5 || y0 < v[1] - 5 || x1 > v[0] + v[2] + 5 || y1 > v[1] + v[3] + 5) && (x1 - x0) < v[2] * 1.35 && (y1 - y0) < v[3] * 1.35) {
      const r = q => Math.round(q * 10) / 10;
      out = `${r(x0)} ${r(y0)} ${r(x1 - x0)} ${r(y1 - y0)}`;
    }
  }
  boxCache.set(n, out);
  return out;
}
const figureHtml = n => (F[n] ? `<figure class="fig"><svg viewBox="${figBox(n)}" role="img" aria-label="${esc(F[n].alt || '')}">${CORE.figSvg(F[n].svg)}</svg></figure>` : '');
// cover art (tools/cover.mjs): decorative, the words taken out and the drawing cropped to what is drawn
const coverCache = new Map();
const coverFor = (key, itemId, figName) => {
  if (!coverCache.has(key)) coverCache.set(key, makeCover(F, itemId, figName));
  return coverCache.get(key);
};
const itemCover = it => coverFor(`i:${it.id}`, it.id, itemFig(it));
const entryCover = e => (hasFig(e.slug) ? coverFor(`e:${e.slug}`, null, e.slug) : itemCover(e.item));
const coverSvg = c => `<svg viewBox="${c.box}" preserveAspectRatio="xMidYMid meet" focusable="false">${CORE.figSvg(c.svg)}</svg>`;
const coverHtml = (c, catId) => (c ? `<span class="fig cover" aria-hidden="true">${coverSvg(c)}</span>` : `<span class="no-pic" aria-hidden="true">${picto(catId)}</span>`);
const itemFig = it => CORE.itemFigName(it, hasFig);

const U = {
  home: () => B,
  cats: () => `${B}c/`,
  cat: id => `${B}c/${id}/`,
  angles: () => `${B}a/`,
  angle: a => `${B}a/${angleId(a)}/`,
  item: id => `${B}i/${id}/`,
  trivia: slug => { const e = idx.bySlug.get(slug); return e ? `${B}i/${e.item.id}/#t-${slug}` : `${B}t/${slug}/`; },
  search: () => `${B}s/`,
  about: () => `${B}about/`,
};
const mdOpts = { figure: figureHtml, link: U.trivia, images: `${B}images/` };
const html = s => toHtml(s, mdOpts);

const countSay = it => say(`${it.entries.length}わ`, `おはなし ${it.entries.length}こ`, `${it.entries.length}話`);
const homeCrumb = () => ({ href: U.home(), text: say('さいしょ', 'ホーム', 'ホーム') });
function band(catId, parts) {
  return `<nav class="band cat-${catId || 'none'}" aria-label="いまいる ところ"><ol>${parts.map(p =>
    `<li>${p.href ? `<a href="${p.href}">${p.text}</a>` : `<span aria-current="page">${p.text}</span>`}</li>`).join('')}</ol></nav>`;
}
function itemCard(it, { tags = true } = {}) {
  const angles = [...new Set(it.entries.map(e => e.angle))];
  return `<li><a class="card cat-${it.cat.id}" href="${U.item(it.id)}">
      <span class="card-pic">${coverHtml(itemCover(it), it.cat.id)}</span>
      <span class="card-body">
        <span class="card-cat">${it.cat.name}</span>
        <span class="card-title">${it.name}</span>
        <span class="card-sub">${countSay(it)}</span>
        ${tags ? `<span class="card-tags" data-lv="adult">${angles.map(a => `<span class="tag">${esc(angleLabels(a).adult)}</span>`).join('')}</span>` : ''}
      </span></a></li>`;
}
const kidTitle = e => { const m = parseEntry(md.get(e.slug)).meta; return m.kidtitle || m.title || e.title; };
// a title shown next to its angle chip, without a trailing "（そもそも）" that repeats the chip
const shownTitle = (t, e) => esc(displayTitle(t, e.angle));
// the short form for lists: a trailing parenthesis (a subtitle) is left for the article itself
const shortTitle = t => { const m = String(t).match(/^(.*\S)\s*[（(][^（）()]*[）)]\s*$/); return m && m[1].length >= 6 ? m[1] : String(t); };
function entryCard(e) {
  const kt = esc(kidTitle(e));
  return `<li><a class="card cat-${e.item.cat.id}" href="${U.trivia(e.slug)}">
      <span class="card-pic">${coverHtml(entryCover(e), e.item.cat.id)}</span>
      <span class="card-body">
        <span class="card-cat">${e.item.cat.name}・${e.item.name}</span>
        ${lvx({ small: kt, kid: kt, adult: shownTitle(e.title, e) }, 'span', 'card-title')}
        <span class="card-sub">${angleSay(e.angle)}</span>
      </span></a></li>`;
}
const catNo = c => String(idx.cats.indexOf(c) + 1).padStart(2, '0');
const catCount = c => {
  const n = c.items.reduce((s, i) => s + i.entries.length, 0);
  return n ? say(`${c.items.length}こ`, `${c.items.length}こ の もの`, `${c.items.length}種・${n}話`) : say('じゅんびちゅう', 'じゅんびちゅう', '準備中');
};
// a few covers of one category: one large and two small ("chapter opener")
function catCovers(c, n = 3) {
  const cs = c.items.map(itemCover).filter(Boolean).slice(0, n);
  if (!cs.length) return `<span class="cc-empty">${picto(c.id)}</span>`;
  return cs.map((cv, k) => `<span class="cc cc-${k}">${coverHtml(cv, c.id)}</span>`).join('');
}
function catCard(c, k) {
  const n = c.items.filter(itemCover).length;
  return `<li${k === 0 ? ' class="chapter-wide"' : ''}><a class="chapter cat-${c.id}" href="${U.cat(c.id)}">
      <span class="chapter-pics n${Math.min(3, n)}${n >= 5 ? ' n5' : ''}" aria-hidden="true">${catCovers(c, k === 0 ? 5 : 3)}</span>
      <span class="chapter-body">
        <span class="chapter-no" aria-hidden="true">${catNo(c)}</span>
        <span class="chapter-name">${c.name}</span>
        <span class="chapter-count">${catCount(c)}</span>
      </span></a></li>`;
}
const angleCounts = new Map();
allEntries.forEach(e => angleCounts.set(e.angle, (angleCounts.get(e.angle) || 0) + 1));
const angleKeys = [...Object.keys(ANGLES).filter(a => angleCounts.has(a)), ...[...angleCounts.keys()].filter(a => !ANGLES[a])];
const angleChips = current => `<ul class="chips">${angleKeys.map(a => `<li><a class="chip" href="${U.angle(a)}"${a === current ? ' aria-current="page"' : ''}>${angleSay(a)}<span class="chip-n">${angleCounts.get(a)}</span></a></li>`).join('')}</ul>`;
const tilesHtml = items => `<ul class="tiles">${items.map(it => `<li><a class="tile cat-${it.cat.id}" href="${U.item(it.id)}">
      <span class="tile-pic">${coverHtml(itemCover(it), it.cat.id)}</span>
      <span class="tile-name">${it.name}</span></a></li>`).join('')}</ul>`;
// one category as a shelf: a row of covers that scrolls sideways (touch, trackpad, keyboard; buttons with JS)
function shelf(c) {
  const id = `shelf-${c.id}`;
  return `<section class="shelf-sec cat-${c.id}${c.items.length <= 4 ? ' shelf-short' : ''}" aria-labelledby="${id}-h">
        <div class="shelf-head">
          <h3 class="shelf-title" id="${id}-h"><span class="shelf-no" aria-hidden="true">${catNo(c)}</span>${c.name}</h3>
          <span class="shelf-count">${catCount(c)}</span>
          <a class="shelf-all" href="${U.cat(c.id)}">${say('ぜんぶ みる', 'ぜんぶ 見る', 'すべて見る')}<span class="vh">（${c.name}）</span> →</a>
        </div>
        <div class="shelf-wrap">
          <ul class="shelf" id="${id}" tabindex="0" aria-labelledby="${id}-h">${c.items.map(it => `<li><a class="shelf-card" href="${U.item(it.id)}">
            <span class="shelf-pic">${coverHtml(itemCover(it), c.id)}</span>
            <span class="shelf-name">${it.name}</span>
            <span class="shelf-sub">${countSay(it)}</span></a></li>`).join('')}</ul>
          <button type="button" class="shelf-btn prev" aria-controls="${id}" aria-label="${c.name}の たなを まえへ" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5 7 12l7 7"/></svg></button>
          <button type="button" class="shelf-btn next" aria-controls="${id}" aria-label="${c.name}の たなを つぎへ" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5l7 7-7 7"/></svg></button>
        </div>
      </section>`;
}

// ---------- page shell ----------
const ANGLE_IDS = Object.fromEntries(Object.entries(ANGLES).map(([k, v]) => [k, v.id]));
function page({ file, title, description, view, body, nav = '', noindex = false, canonical = null, widgets = false, head = '', ogType = 'website', og = 'site' }) {
  const fullTitle = title ? `${title}｜みのまわり図鑑` : 'みのまわり図鑑';
  const d0 = description || '見ているけど知らない、触っているけど知らない。身の回りの仕組みを、読む人の年齢に合わせて説明する図鑑。';
  const desc = d0.length > 120 ? `${d0.slice(0, 119)}…` : d0;
  const url = canonical || abs(file.replace(/index\.html$/, ''));
  const navLink = (k, href, text) => `<a href="${href}"${nav === k ? ' aria-current="page"' : ''}>${text}</a>`;
  const out = `<!doctype html>
<html lang="ja" data-level="adult" data-view="${view}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#fffaf0" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#262420" media="(prefers-color-scheme: dark)">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
${noindex ? '<meta name="robots" content="noindex, follow">\n' : ''}<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="みのまわり図鑑">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:locale" content="ja_JP">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(desc)}">
<!--og-image:${og}-->
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%234f6f5f'/%3E%3Cg transform='translate(7 7) scale(1.08)'%3E%3Cpath d='M31 31l11 11' stroke='%23fffaf0' stroke-width='7' stroke-linecap='round'/%3E%3Ccircle cx='20' cy='20' r='16' fill='%23fffaf0'/%3E%3Cpath d='M20 11.500a5 5 0 0 1 3 9L24.500 29h-9l1.500-8.500a5 5 0 0 1 3-9Z' fill='%231e1d19'/%3E%3C/g%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${asset('assets/style.css')}">
<script>
  // before the first paint: old #/ links go to their new address, and the stored reader level applies (key shared with the old version)
  (function () {
    var B = ${JSON.stringify(B)};
    function go() {
      var h = location.hash;
      if (h.indexOf('#/') !== 0) return;
      var A = ${JSON.stringify(ANGLE_IDS)}, p = h.slice(2).split('/'), k = p[0], id = p.slice(1).join('/'), d = id;
      try { d = decodeURIComponent(id); } catch (e) {}
      var to = !h.slice(2) ? B : k === 'c' ? B + 'c/' + (id ? id + '/' : '') : k === 'a' ? B + 'a/' + (id ? (A[d] || encodeURIComponent(d)) + '/' : '')
        : k === 's' ? B + 's/?q=' + encodeURIComponent(d) : k === 'i' ? B + 'i/' + id + '/' : k === 't' ? B + 't/' + id + '/' : B + 't/' + k + '/';
      location.replace(to);
    }
    go();
    window.addEventListener('hashchange', go);
    try { var a = parseInt(localStorage.getItem('aha-age'), 10); if (a) document.documentElement.dataset.level = a <= 5 ? 'small' : a <= 9 ? 'kid' : 'adult'; } catch (e) {}
  })();
</script>
${head}</head>
<body data-base="${B}">
<a class="skip" href="#main">本文へ</a>
<header class="site">
  <div class="site-inner">
    <a class="logo" href="${U.home()}" aria-label="みのまわり図鑑"><svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle class="lm-lens" cx="20" cy="20" r="14.5"/><path class="lm-key" d="M20 12.5a4.5 4.5 0 0 1 2.6 8.200L24 28h-8l1.400-7.300A4.500 4.500 0 0 1 20 12.500Z"/><path class="lm-handle" d="M31 31l11 11"/></svg><span class="logo-text">みのまわり<span class="logo-zukan">図鑑</span></span></a>
    <nav class="site-nav" aria-label="メインメニュー">
      ${navLink('c', U.cats(), 'カテゴリ')}
      ${navLink('a', U.angles(), 'きりくち')}
      ${navLink('about', U.about(), 'このサイトについて').replace('<a ', '<a class="nav-about" ')}
    </nav>
    <button type="button" class="search-toggle" aria-expanded="false" aria-controls="search" aria-label="さがす">
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21"/></svg>
    </button>
    <form class="search" id="search" role="search" action="${U.search()}" method="get" autocomplete="off">
      <label class="search-field">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21"/></svg>
        <span class="vh">ものや おはなしを さがす</span>
        <input type="search" id="q" name="q" enterkeyhint="search" placeholder="さがす（れい：えんぴつ）" aria-describedby="search-status">
      </label>
      <p class="vh" id="search-status" aria-live="polite"></p>
      <div class="search-results" id="search-results" hidden></div>
    </form>
    <div class="reader">
      <p class="reader-label" id="reader-label">読む人</p>
      <div class="seg" id="level-seg" role="radiogroup" aria-labelledby="reader-label">
        <span class="seg-thumb" aria-hidden="true"></span>
        <button type="button" role="radio" data-level="small"><b>ちいさい子</b><small>3〜5さい</small></button>
        <button type="button" role="radio" data-level="kid"><b>こども</b><small>6〜9さい</small></button>
        <button type="button" role="radio" data-level="adult" aria-checked="true"><b>おとな</b><small>10さい〜</small></button>
      </div>
      <a class="about-mini" href="${U.about()}" aria-label="この サイトに ついて"${nav === 'about' ? ' aria-current="page"' : ''}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v6"/><circle class="dot" cx="12" cy="7.5" r="1.3"/></svg></a>
    </div>
  </div>
</header>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="site-foot">
  <div class="foot-inner">
    <div>
      <p class="foot-name logo"><svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle class="lm-lens" cx="20" cy="20" r="14.5"/><path class="lm-key" d="M20 12.5a4.5 4.5 0 0 1 2.6 8.200L24 28h-8l1.400-7.300A4.500 4.500 0 0 1 20 12.500Z"/><path class="lm-handle" d="M31 31l11 11"/></svg><span class="logo-text">みのまわり<span class="logo-zukan">図鑑</span></span></p>
      <p class="foot-note">説明はそれぞれの出典をもとに書いています。</p>
    </div>
    <ul class="foot-links">
      <li><a href="${U.about()}">このサイトについて</a></li>
      <li><a href="https://github.com/nozomitaguchi/everyday-trivia">まちがいを見つけたら GitHub で教えてください</a></li>
    </ul>
  </div>
</footer>
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <marker id="ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M1 1 9 5 1 9Z" class="ah-head"/>
    </marker>
  </defs>
</svg>
<script src="${asset('assets/core.js')}" defer></script>
${widgets ? `<script src="${asset('assets/widgets.js')}" defer></script>\n` : ''}<script src="${asset('assets/site.js')}" defer></script>
</body>
</html>
`;
  write(file, out);
  return url;
}

let pageCount = 0;
function write(file, content) {
  const f = path.join(OUT, file);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content);
  if (file.endsWith('.html')) pageCount++;
}
const sitemap = [];

// ---------- home ----------
function todayCard(e, key, shown) {
  const m = md.get(e.slug);
  const { meta, sections } = parseEntry(m);
  const kidSec = sections.find(s => s.heading === '6〜9歳むけ');
  const adultSec = sections.find(s => s.heading === '見るとわかること') || sections[0];
  const part = (sec, t) => {
    const firstFig = sec && (sec.text.match(/\{\{fig:([a-z0-9-]+)\}\}/) || [])[1];
    const fig = figureHtml(e.slug) || (firstFig ? figureHtml(firstFig) : '');
    const text = sec ? inline(CORE.fixPaths(firstParagraph(sec.text), mdOpts)) : '';
    return `<h2 class="today-title">${esc(t)}</h2>${fig ? `<div class="today-pic">${fig}</div>` : ''}${text ? `<p class="today-text">${text}</p>` : ''}`;
  };
  const adult = part(adultSec, displayTitle(meta.title || e.title, e.angle));
  const kid = kidSec ? part(kidSec, meta.kidtitle || meta.title || e.title) : adult;
  return `<article class="today cat-${e.item.cat.id}" data-day="${key}"${shown ? '' : ' hidden'} aria-label="きょうの ひとつ">
          <p class="labels"><span class="label">きょうの ひとつ</span><span class="label label-cat">${e.item.cat.name}</span><span class="label-plain">${e.item.name}・${angleSay(e.angle)}</span></p>
          ${lvx({ small: kid, kid, adult }, 'div', 'today-body')}
          <a class="more" href="${U.trivia(e.slug)}">つづきを 読む →</a>
        </article>`;
}
// the hero's specimen cabinet: covers taken in turn from each category, the logo mark in the middle
function heroPicks(n = 8) {
  const lists = idx.cats.map(c => c.items.filter(itemCover));
  const out = [];
  for (let r = 0; out.length < n && lists.some(l => l.length > r); r++) lists.forEach(l => { if (l[r] && out.length < n) out.push(l[r]); });
  return out;
}
function cabinet(picks, cls = '') {
  const cells = picks.map(it => `<li class="cab-cell cat-${it.cat.id}"><a href="${U.item(it.id)}"><span class="cab-pic">${coverHtml(itemCover(it), it.cat.id)}</span><span class="cab-name">${it.name}</span></a></li>`);
  cells.splice(Math.min(4, cells.length), 0, `<li class="cab-cell cab-mark" aria-hidden="true">${LOGO_MARK('hero-mark')}</li>`);
  return `<ul class="cabinet${cls}" aria-label="ずかんの なかみ（れい）">${cells.join('')}</ul>`;
}
function buildHome() {
  // one card per day from yesterday to a week ahead; the browser shows the one for its own date.
  // Without JavaScript the card for today in Japan is shown.
  const jst = new Date(Date.now() + 9 * 3600e3);
  const keys = [];
  for (let d = -1; d <= 7; d++) {
    const x = new Date(Date.UTC(jst.getUTCFullYear(), jst.getUTCMonth(), jst.getUTCDate() + d));
    keys.push(`${x.getUTCFullYear()}-${x.getUTCMonth() + 1}-${x.getUTCDate()}`);
  }
  const todayKey = keys[1];
  const recent = recentItems().slice(0, 4);
  const picks = heroPicks(8);
  const filled = idx.cats.filter(c => c.items.length);
  const body = `<div data-lv="kid adult">
      <section class="hero">
        <div class="wrap hero-inner">
          <div class="hero-text">
            <p class="hero-kicker">${say('', 'みのまわりの ずかん', '身の回りの図鑑')}<span class="hero-kicker-n">${allItems.length}${say('', 'こ の もの', '種')}・${allEntries.length}${say('', 'この おはなし', '話')}</span></p>
            <h1 class="hero-title"><span>見てるけど、</span><span>知らない。</span><br><span>さわってるけど、</span><span>知らない。</span></h1>
            ${lvx({ small: '', kid: 'まいにち 見る ものの「なにで できてる？」「どうやって つくる？」「どんな しくみ？」「なぜ この かたち？」を あつめた ずかんです。読む人に あわせて、せつめいが かわります。', adult: '身の回りのものの「なにでできてる？」「どうやってつくる？」「どんなしくみ？」「なぜこのかたち？」を集めた図鑑。読む人の年齢に合わせて、説明が切り替わります。' }, 'p', 'hero-lead')}
            <div class="btns">
              <a class="btn btn-primary" href="${U.cats()}">カテゴリから さがす</a>
              <a class="btn" href="${U.angles()}">きりくちから さがす</a>
            </div>
          </div>
          ${cabinet(picks)}
        </div>
      </section>
      <div class="wrap">
      <section class="section today-sec" aria-label="きょうの ひとつ">
        <div class="today-set">${keys.map(k => todayCard(CORE.dayPick(allEntries, k), k, k === todayKey)).join('')}</div>
      </section>

      <section class="section" aria-labelledby="h-cats">
        <div class="section-head"><h2 class="section-title" id="h-cats">カテゴリ</h2><a class="more" href="${U.cats()}">${say('ぜんぶ みる', 'ぜんぶ 見る', 'カテゴリ一覧')} →</a></div>
        <ul class="chapter-grid reveal">${idx.cats.map(catCard).join('')}</ul>
      </section>

      ${recent.length ? `<section class="section" aria-labelledby="h-recent">
        <div class="section-head"><h2 class="section-title" id="h-recent">さいきん くわしく なった もの</h2></div>
        <ul class="grid grid-4 reveal">${recent.map(it => itemCard(it, { tags: false })).join('')}</ul>
      </section>` : ''}

      <section class="section shelves" aria-labelledby="h-shelves">
        <div class="section-head"><h2 class="section-title" id="h-shelves">${say('たなから えらぶ', 'たなから えらぶ', 'たなから選ぶ')}</h2>
          ${lvx({ small: '', kid: 'よこに すすむと、もっと あるよ。', adult: 'カテゴリごとの棚。横にスクロールすると続きがあります。' }, 'p', 'section-note')}</div>
        <div class="shelves-grid">${filled.map(shelf).join('')}</div>
      </section>

      <section class="section angles-box" aria-labelledby="h-angles">
        <h2 class="section-title" id="h-angles">きりくちで さがす</h2>
        ${lvx({ small: '', kid: 'おなじ きりくちで、いろいろな ものを くらべて 読めます。', adult: '同じ切り口（素材・歴史・しるし…）で、いろいろなものを横にくらべて読めます。' }, 'p', 'section-lead')}
        ${angleChips()}
      </section>
    </div></div>
    <div data-lv="small"><div class="wrap">
      <div class="small-top">
        ${LOGO_MARK('small-mark')}
        <h1 class="small-title">どれを みる？</h1>
      </div>
      ${filled.map(c => `<section class="tile-group cat-${c.id}" aria-labelledby="g-${c.id}">
        <h2 class="tile-cat" id="g-${c.id}">${picto(c.id)}${c.name}</h2>
        ${tilesHtml(c.items)}
      </section>`).join('')}
    </div></div>`;
  sitemap.push({ loc: page({ file: 'index.html', view: 'home', body }) });
}

// ---------- category list / category ----------
function buildCategories() {
  const body = `<div class="wrap">
      <header class="page-head"><h1 class="page-title">カテゴリ</h1>
        ${lvx({ small: '', kid: 'ばしょや なかまで わけた 7つの グループ。', adult: '身の回りのものを、ある場所やなかまで7つに分けています。' }, 'p', 'page-lead')}</header>
      <ul class="chapter-grid reveal">${idx.cats.map(catCard).join('')}</ul>
      <div class="cat-index">${idx.cats.filter(c => c.items.length).map(c => `<section class="cat-index-group cat-${c.id}">
        <h2><a href="${U.cat(c.id)}"><span class="cat-index-no" aria-hidden="true">${catNo(c)}</span>${c.name}</a></h2>
        <ul class="chips">${c.items.map(i => `<li><a class="chip" href="${U.item(i.id)}">${i.name}<span class="chip-n">${i.entries.length}</span></a></li>`).join('')}</ul>
      </section>`).join('')}</div>
    </div>`;
  sitemap.push({ loc: page({ file: 'c/index.html', title: 'カテゴリ', view: 'categories', nav: 'c', body,
    description: `みのまわり図鑑のカテゴリ：${idx.cats.map(c => c.name).join('、')}。` }) });
  for (const c of idx.cats) {
    const body = `<div class="page cat-${c.id}">
      ${band(c.id, [homeCrumb(), { href: U.cats(), text: 'カテゴリ' }, { text: c.name }])}
      <div class="wrap">
        <header class="cat-head">
          <div class="cat-head-text">
            <p class="cat-head-no"><span aria-hidden="true">${catNo(c)}</span><span class="vh">カテゴリ ${idx.cats.indexOf(c) + 1}</span></p>
            <h1 class="page-title">${c.name}</h1>
            <p class="cat-head-count">${catCount(c)}</p>
          </div>
          <div class="chapter-pics cat-head-pics n${Math.min(3, c.items.filter(itemCover).length)}" aria-hidden="true">${catCovers(c)}</div>
        </header>
        ${!c.items.length ? `<p class="empty">${say('いま つくって いるよ。まってね。', 'いま つくって いるよ。もうすこし まってね。', 'この分類はまだ準備中です。')}</p>`
          : `<ul class="grid reveal" data-lv="kid adult">${c.items.map(i => itemCard(i)).join('')}</ul><div data-lv="small">${tilesHtml(c.items)}</div>`}
      </div>
    </div>`;
    sitemap.push({ loc: page({ file: `c/${c.id}/index.html`, title: c.name, view: 'category', body,
      description: `${c.name}のもの：${c.items.map(i => i.name).join('、')}。見ているけど知らない仕組みを、読む人の年齢に合わせて説明します。` }) });
  }
}

// ---------- angles ----------
function buildAngles() {
  const body = `<div class="wrap">
      <header class="page-head"><h1 class="page-title">きりくち</h1>
        ${lvx({ small: 'どれを みる？', kid: 'おなじ きりくちで、いろいろな ものを くらべて 読めます。', adult: 'どのものにも、同じ切り口（そもそも・素材・作り方・仕組み・形・しるし・歴史・ことば・小ネタ）の話があります。切り口を選ぶと、ものをまたいで横にくらべて読めます。' }, 'p', 'page-lead')}</header>
      <div class="angles-box">${angleChips()}</div>
    </div>`;
  sitemap.push({ loc: page({ file: 'a/index.html', title: 'きりくち', view: 'angles', nav: 'a', body,
    description: '素材・作り方・仕組み・形・しるし・歴史・ことばなどの切り口で、身の回りのものを横にくらべて読めます。' }) });
  for (const a of angleKeys) {
    const list = allEntries.filter(e => e.angle === a);
    const L = angleLabels(a);
    const body = `<div class="page">
      ${band(null, [homeCrumb(), { href: U.angles(), text: 'きりくち' }, { text: angleSay(a) }])}
      <div class="wrap">
        <header class="page-head"><h1 class="page-title">${angleSay(a)}</h1>
          ${lvx({ small: `${list.length}この おはなし`, kid: `${list.length}この おはなし`, adult: `${list.length}話（README の切り口「${esc(a)}」）` }, 'p', 'page-lead')}</header>
        <div class="section-lead">${angleChips(a)}</div>
        <ul class="grid reveal">${list.map(entryCard).join('')}</ul>
      </div>
    </div>`;
    sitemap.push({ loc: page({ file: `a/${angleId(a)}/index.html`, title: L.adult, view: 'angle', body,
      description: `切り口「${L.adult}」の話 ${list.length}本：${list.slice(0, 6).map(e => e.item.name).join('、')}など。` }) });
  }
}

// ---------- search (results are drawn in the browser from data/search.json) ----------
function buildSearch() {
  const body = `<div class="wrap search-page">
      <header class="page-head"><h1 class="page-title" id="search-title">さがす</h1>
        <p class="page-lead" id="search-lead">ものの名前や、おはなしのタイトルで さがせます。</p></header>
      <form class="search-page-form" action="${U.search()}" method="get" role="search">
        <label class="search-field"><span class="vh">ことば</span><input type="search" name="q" id="q2" enterkeyhint="search" placeholder="れい：えんぴつ"></label>
        <button type="submit" class="btn btn-primary">さがす</button>
      </form>
      <noscript><p class="empty">さがす には JavaScript が いります。<a href="${U.cats()}">カテゴリ</a>や<a href="${U.angles()}">きりくち</a>から さがして ください。</p></noscript>
      <div id="search-page-results"></div>
    </div>`;
  page({ file: 's/index.html', title: 'さがす', view: 'search', body, noindex: true });
  const data = {
    cats: Object.fromEntries(idx.cats.map(c => [c.id, c.name])),
    items: allItems.map(i => ({ id: i.id, name: i.name, cat: i.cat.id, n: i.entries.length })),
    entries: allEntries.map(e => ({ slug: e.slug, item: e.item.id, angle: e.angle, title: e.title, kid: kidTitle(e) })),
  };
  write('data/search.json', JSON.stringify(data));
}

// ---------- items ----------
function entryArticle(e, n, total, skipFig) {
  const m = md.get(e.slug);
  const views = Object.fromEntries(LV.map(l => [l, entryView(e, m, l)]));
  const headings = Object.fromEntries(LV.map(l => [l, views[l].heading ? shownTitle(views[l].heading, e) : '']));
  const bodies = Object.fromEntries(LV.map(l => [l,
    `${views[l].note ? `<p class="level-note">${views[l].note}</p>` : ''}<div class="body level-${views[l].textLevel}">${toHtml(views[l].bodyMd, { ...mdOpts, shift: 1 })}</div>`]));
  const src = views.adult.sources;
  return `
      <article class="trivia" id="t-${e.slug}" aria-label="${esc(views.adult.title)}">
        <div class="trivia-meta">${total > 1 ? `<span class="trivia-n">${n + 1}<span>／${total}</span></span>` : ''}<p class="angle${e.angle === 'きほん' ? ' basic' : ''}">${angleSay(e.angle)}</p></div>
        ${lvx(headings, 'h2', 'trivia-title')}
        ${skipFig ? '' : figureHtml(e.slug)}
        ${lvx(bodies, 'div', 'trivia-text')}
        ${WIDGET_SLUGS.has(e.slug) ? `<div class="widget-mount" data-slug="${e.slug}"></div>` : ''}
        ${src ? `<details class="sources" open><summary>出典</summary>${html(src)}</details>` : ''}
      </article>`;
}
function bookHtml(it, pages, next) {
  const chapters = [...new Set(pages.map(p => p.chapter))];
  const arrowL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5 7 12l7 7"/></svg>';
  const arrowR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5l7 7-7 7"/></svg>';
  const slugs = it.entries.map(e => e.slug);
  return `<div class="book cat-${it.cat.id}" data-lv="small">
      <div class="book-head">
        <a class="round-btn" href="${U.home()}" aria-label="もどる">${arrowL}</a>
        <h1>${it.name}</h1>
      </div>
      <p class="read-aloud">おとなの ひとが よんで あげてね。</p>
      <section class="book-pages" aria-roledescription="えほん" aria-label="${it.name}の えほん">
        ${pages.map((p, i) => `<div class="book-page" data-chapter="${chapters.indexOf(p.chapter)}"${p.chapter >= 0 ? ` data-slug="${slugs[p.chapter]}"` : ''}${i ? ' hidden' : ''}>
          <p class="book-chapter">${esc(p.angle ? angleLabels(p.angle).small : 'これは なあに？')}</p>
          <div class="book-pic">${p.fig && F[p.fig] ? figureHtml(p.fig) : `<div class="book-panel">${picto(it.cat.id)}</div>`}</div>
          <p class="book-text">${inline(CORE.fixPaths(p.text, mdOpts))}</p>
        </div>`).join('')}
        <p class="book-end" hidden>${next ? `<a href="${U.item(next.id)}">つぎは ${next.name} →</a>` : `<a href="${U.home()}">さいしょに もどる</a>`}</p>
      </section>
      <div class="book-nav">
        <button type="button" class="round-btn prev" aria-label="まえへ" aria-disabled="true">${arrowL}</button>
        <div class="dots" aria-hidden="true">${chapters.map((_, k) => `<span${k ? '' : ' class="on"'}></span>`).join('')}</div>
        <button type="button" class="round-btn next" aria-label="つぎへ"${pages.length < 2 ? ' aria-disabled="true"' : ''}>${arrowR}</button>
      </div>
      <div class="book-progress" aria-hidden="true"><span style="width:${(100 / pages.length).toFixed(2)}%"></span></div>
      <p class="vh book-count" aria-live="polite"></p>
    </div>`;
}
// the item's overview: the first sentence as a lead, the rest behind "つづきを 読む" (a <details>, so no JS needed).
// Adults get it open when the rest is short.
function introHtml(text, lv) {
  const blocks = text.split(/\n\s*\n/);
  const first = blocks[0] || '';
  const simple = !/^(#|\{\{fig:|\||[-*]\s|\d+\.\s|```)/.test(first.trim());
  let lead = '', rest = text;
  if (simple) {
    const flat = first.split('\n').map(x => x.trim()).join('');
    let depth = 0, cut = -1;
    for (let k = 0; k < flat.length; k++) {
      const ch = flat[k];
      if ('（(「『['.includes(ch)) depth++;
      else if ('）)」』]'.includes(ch)) depth = Math.max(0, depth - 1);
      else if ((ch === '。' || ch === '！' || ch === '？') && depth === 0) { cut = k + 1; break; }
    }
    if (cut < 0) cut = flat.length;
    lead = flat.slice(0, cut);
    rest = [flat.slice(cut).trim(), ...blocks.slice(1)].filter(x => x.trim()).join('\n\n');
  }
  const leadHtml = lead ? `<p class="item-lede">${inline(CORE.fixPaths(lead, mdOpts))}</p>` : '';
  if (!rest.trim()) return leadHtml;
  const open = lv === 'adult' && plain(rest).length <= 120;
  return `${leadHtml}<details class="intro-more"${open ? ' open' : ''}><summary><span class="intro-more-label">つづきを 読む</span></summary><div class="intro-rest">${html(rest)}</div></details>`;
}
function buildItems() {
  allItems.forEach((it, k) => {
    const prev = allItems[k - 1] || null;
    const next = allItems[k + 1] || null;
    const mds = it.entries.map(e => md.get(e.slug));
    const ov = itemMd.get(it.id);
    const lead = Object.fromEntries(LV.map(l => {
      if (!ov) return [l, ''];
      const L = LEVELS.find(x => x.id === l);
      const { sections } = parseEntry(ov);
      const sec = sections.find(s => s.heading === (L.heading || 'ひとことで')) || sections.find(s => s.heading === 'ひとことで');
      return [l, sec ? introHtml(sec.text, l) : ''];
    }));
    const pages = CORE.bookPages(it, mds, ov, hasFig, itemFig(it));
    const first = it.entries[0];
    const heroFig = first && hasFig(first.slug) ? figureHtml(first.slug) : '';
    const hasToc = it.entries.length > 1;
    const learn = hasToc ? `<nav class="learn" aria-labelledby="learn-h">
            <h2 class="learn-title" id="learn-h">${say('この ページで わかる こと', 'この ページで わかる こと', 'このページでわかること')}</h2>
            <ol class="learn-list">${it.entries.map((e, i) => {
      const meta = parseEntry(mds[i]).meta;
      const adult = esc(shortTitle(displayTitle(meta.title || e.title, e.angle)));
      const kid = esc(meta.kidtitle || shortTitle(displayTitle(meta.title || e.title, e.angle)));
      return `<li><a href="#t-${e.slug}"><span class="learn-angle${e.angle === 'きほん' ? ' basic' : ''}">${angleSay(e.angle)}</span>${lvx({ small: kid, kid, adult }, 'span', 'learn-name')}</a></li>`;
    }).join('')}</ol>
          </nav>` : '';
    const toc = hasToc ? `<nav class="toc" aria-label="この ページの もくじ"><p class="toc-label">${say('この ページの おはなし', 'もくじ', 'もくじ')}</p><ol>${it.entries.map((e, i) => {
      const meta = parseEntry(mds[i]).meta;
      const adult = esc(meta.title || e.title);
      const kid = esc(meta.kidtitle || meta.title || e.title);
      return `<li><a href="#t-${e.slug}" data-toc="${e.slug}"><span class="toc-n" aria-hidden="true">${i + 1}</span><span class="toc-angle">${angleSay(e.angle)}</span>${lvx({ small: kid, kid, adult: esc(displayTitle(meta.title || e.title, e.angle)) }, 'span', 'toc-name')}</a></li>`;
    }).join('')}</ol></nav>` : '';
    const pn = prev || next ? `<nav class="pn" aria-label="まえと つぎの もの">
              ${prev ? `<a class="pn-prev" href="${U.item(prev.id)}"><span>← まえ</span>${prev.name}</a>` : ''}
              ${next ? `<a class="pn-next" href="${U.item(next.id)}"><span>つぎ →</span>${next.name}</a>` : ''}
            </nav>` : '';
    const body = `<div class="page item-page cat-${it.cat.id}">
      ${band(it.cat.id, [homeCrumb(), { href: U.cat(it.cat.id), text: it.cat.name }, { text: it.name }]).replace('<nav class="band', pages.length ? '<nav data-lv="kid adult" class="band' : '<nav class="band')}
      <div class="wrap"${pages.length ? ' data-lv="kid adult"' : ''}>
        <header class="item-hero${heroFig ? ' has-fig' : ''}">
          <div class="item-intro">
            <p class="item-kicker"><a href="${U.cat(it.cat.id)}">${it.cat.name}</a><span>${countSay(it)}</span></p>
            <h1 class="item-title">${it.name}</h1>
            ${lvx(Object.fromEntries(LV.map(l => [l, lead[l] ? `<div class="item-lead level-${l}">${lead[l]}</div>` : ''])), 'div')}
            ${say('<span class="read-aloud">おとなの ひとが よんで あげてね。</span>', '<span class="hint">うえの「読む人」を かえると、せつめいが かわるよ。</span>', '<span class="hint">上の「読む人」を切りかえると、説明が子ども向けに変わります。</span>')}
          </div>
          ${heroFig ? `<div class="hero-fig">${heroFig}</div>` : ''}
        </header>
        ${learn}
        <div class="item-layout${hasToc ? ' has-toc' : ''}">
          ${toc}
          <div class="item-main">
            ${it.entries.map((e, i) => entryArticle(e, i, it.entries.length, i === 0 && !!heroFig)).join('')}
            ${pn}
          </div>
        </div>
      </div>
      ${pages.length ? bookHtml(it, pages, next) : ''}
    </div>`;
    const ovSec = ov && parseEntry(ov).sections.find(s => s.heading === 'ひとことで');
    const desc = ovSec ? plain(firstParagraph(ovSec.text)) : `${it.name}について：${it.entries.map(e => e.title).slice(0, 3).join('／')}`;
    const loc = page({ file: `i/${it.id}/index.html`, title: it.name, view: 'item', body, ogType: 'article', og: `i/${it.id}`,
      description: desc, widgets: it.entries.some(e => WIDGET_SLUGS.has(e.slug)) });
    sitemap.push({ loc, lastmod: itemDate(it) });
  });
}

// ---------- one address per trivia: a short page with its own title/OGP that forwards to its place on the item page ----------
function buildTriviaRedirects() {
  for (const e of allEntries) {
    const { meta, sections } = parseEntry(md.get(e.slug));
    const to = U.trivia(e.slug);
    const sec = sections.find(s => s.heading === '見るとわかること');
    const d0 = sec ? plain(firstParagraph(sec.text)) : e.title;
    const desc = d0.length > 120 ? `${d0.slice(0, 119)}…` : d0;
    const title = `${meta.title || e.title}（${e.item.name}）`;
    const fullTitle = `${title}｜みのまわり図鑑`;
    const out = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${esc(abs(U.item(e.item.id)))}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="みのまわり図鑑">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(abs(`${B}t/${e.slug}/`))}">
<meta property="og:locale" content="ja_JP">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(desc)}">
<!--og-image:i/${e.item.id}-->
<meta http-equiv="refresh" content="0; url=${esc(to)}">
<script>location.replace(${JSON.stringify(to)});</script>
</head>
<body>
<p><a href="${esc(to)}">${esc(title)}</a></p>
</body>
</html>
`;
    write(`t/${e.slug}/index.html`, out);
  }
}

// ---------- about (この サイトに ついて) ----------
// Only facts that README.md and WRITING.md state; the owner reviews this wording.
function buildAbout() {
  const GH = 'https://github.com/nozomitaguchi/everyday-trivia';
  const ME = 'https://nozomitaguchi.github.io/';
  const sec = (h, inner) => `<section class="about-sec"><h2>${h}</h2>${inner}</section>`;
  const modes = (rows) => `<dl class="about-modes">${rows.map(([n, a, d]) => `<div><dt><b>${n}</b><small>${a}</small></dt><dd>${d}</dd></div>`).join('')}</dl>`;
  const adult = `
      ${sec('どんな図鑑か', `<p>見てるけど、知らない。さわってるけど、知らない。身の回りのものの「なにでできてる？」「どうやってつくる？」「どんなしくみ？」「なぜこのかたち？」を集めた図鑑です。いま ${allItems.length}種のもの・${allEntries.length}話があります。</p>
        <p>ひとつの「もの」について、そもそも何か（きほん）から始めて、仕組み・素材・作り方・歴史・ことば・形・しるしといった切り口で話を積み上げます。読んだあとに実物のどこを見ると面白いかを、どの話も最後に「みてみよう」として書いています。</p>`)}
      ${sec('読む人に合わせた3つの読み方', `<p>画面の上の「読む人」で切りかえます。選んだ読み方は、このブラウザに記憶されます。</p>
        ${modes([['ちいさい子', '3〜5さい', '大人が読み聞かせる前提の、ひらがなとカタカナの短い文。絵本のように、1つの画面に1つの文と1枚の絵が出ます。'],
          ['こども', '6〜9さい', '6歳が自分で読める前提の、ひらがな中心で区切りにスペースを入れた文。「なぜ」を1つは入れています。'],
          ['おとな', '10さい〜', '深掘りした本文と、表や絵、出典のすべてが出ます。']])}`)}
      ${sec('出典について', `<p>どの話にも、最後に出典をつけています。メーカーの技術資料、規格、法令、論文、特許、当時の記録といった一次資料までたどって確かめることを基準にしています。</p>
        <ul><li>出典を確認できたものだけを載せ、確かめられないネタは載せずに残しておきます。</li><li>わかっていないことは「わかっていない」と書きます。</li><li>子ども向けの文も、出典で確認できたことだけを書きます。</li><li>写真は自分で撮ったものだけを使い、ほかのサイトの画像は使いません。</li></ul>
        <p class="about-ai">記事は AI の助けを借りて書いており、それぞれに出典をつけています。</p>`)}
      ${sec('まちがいを見つけたら', `<p>内容のまちがいや、気になるところがあれば、<a href="${GH}/issues">GitHub</a> で教えてください。サイトのもとになる文章や絵も、すべて <a href="${GH}">GitHub のリポジトリ</a>で公開しています。</p>`)}
      ${sec('つくった人', `<p><a href="${ME}">nozomitaguchi</a> がつくっています。</p>`)}`;
  const kid = `
      ${sec('どんな ずかん？', `<p>まいにち 見る ものの「なにで できてる？」「どうやって つくる？」「どんな しくみ？」「なぜ この かたち？」を あつめた ずかんです。いま ${allItems.length}こ の もの、${allEntries.length}この おはなしが あります。</p>
        <p>おはなしの さいごには「みてみよう」が あります。読んだ あとに、ほんものの どこを 見ると おもしろいかが わかるよ。</p>`)}
      ${sec('3つの 読みかた', `<p>うえの「読む人」で かえられます。</p>
        ${modes([['ちいさい子', '3〜5さい', 'おとなの ひとが 読んで あげる、えほんの ような ページ。'],
          ['こども', '6〜9さい', 'じぶんで 読める ことばで かいた ページ。'],
          ['おとな', '10さい〜', 'ぜんぶの せつめいと、しらべた ところ（しゅってん）。']])}`)}
      ${sec('ほんとうか どうか', `<p>どの おはなしも、つくった かいしゃの しりょうや、くにの きまりなどで たしかめて、さいごに「しゅってん」（しらべた ところ）を かいて います。わからない ことは「わからない」と かきます。</p>
        <p class="about-ai">おはなしは AI（エーアイ）に てつだって もらって かいて いて、どれにも しゅってんが ついて います。</p>`)}
      ${sec('まちがいを みつけたら', `<p>おうちの ひとと いっしょに <a href="${GH}/issues">GitHub（ギットハブ）</a> で おしえてね。</p>`)}
      ${sec('つくった ひと', `<p><a href="${ME}">nozomitaguchi</a> が つくって います。</p>`)}`;
  const small = `
      ${sec('どんな ずかん？', `<p>まいにち みる ものの ひみつを あつめた ずかんだよ。</p><p>おとなの ひとと いっしょに みてね。</p>`)}
      ${sec('おうちの かたへ', `<p>「ちいさい子」は 読み聞かせ用です。「こども」「おとな」に切りかえると、くわしい説明と出典が読めます。まちがいは <a href="${GH}/issues">GitHub</a> で教えてください。つくった人：<a href="${ME}">nozomitaguchi</a></p>`)}`;
  const body = `<div class="wrap about">
      <header class="page-head about-head">
        ${LOGO_MARK('about-mark')}
        <div><h1 class="page-title">${say('この ずかんの こと', 'この サイトに ついて', 'このサイトについて')}</h1>
        ${lvx({ small: '', kid: 'みのまわり図鑑（ずかん）の せつめいです。', adult: 'みのまわり図鑑が何をしていて、どうやって書いているか。' }, 'p', 'page-lead')}</div>
      </header>
      <div class="about-body">${lvx({ small, kid, adult }, 'div', 'about-text')}</div>
    </div>`;
  sitemap.push({ loc: page({ file: 'about/index.html', title: 'このサイトについて', view: 'about', nav: 'about', body,
    description: 'みのまわり図鑑について：どんな図鑑か、3つの読み方、出典の扱い、まちがいの知らせ方、つくった人。' }) });
}

// ---------- 404, sitemap, robots ----------
function buildMeta() {
  page({ file: '404.html', title: 'ページが見つかりません', view: 'notfound', noindex: true, canonical: abs(B), body: `<div class="wrap">
      <header class="page-head"><h1 class="page-title">${say('この ページは ないみたい。', 'この ページは みつからなかったよ。', 'このページは見つかりませんでした。')}</h1>
        <p class="page-lead">${say('', 'アドレスが かわったのかも しれません。', 'アドレスが変わったか、なくなったページです。')}</p></header>
      <div class="btns"><a class="btn btn-primary" href="${U.home()}">${say('さいしょに もどる', 'ホームへ', 'ホームへ')}</a><a class="btn" href="${U.cats()}">カテゴリ</a><a class="btn" href="${U.search()}">さがす</a></div>
    </div>` });
  write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(u => `  <url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`);
  write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${abs('sitemap.xml')}\n`);
}

// ---------- share-image templates (tools/og.mjs screenshots them into OUT/og/ and then adds the tags) ----------
// Written outside OUT, so a failed or skipped image step changes nothing on the site: without images
// the pages simply carry no og:image / twitter:image tags.
function buildOgTemplates() {
  const dir = path.resolve(ROOT, process.env.OG_SRC || '_og-src');
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(path.join(dir, 'i'), { recursive: true });
  const css = read('assets/style.css');
  const fonts = process.env.OG_OFFLINE ? '' : '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=block" rel="stylesheet">';
  const shell = (cls, inner) => `<!doctype html><html lang="ja" data-level="adult"><head><meta charset="utf-8">${fonts}
<style>${css}
:root { color-scheme: light; --font: Quicksand, "Zen Kaku Gothic New", "Noto Sans CJK JP", "Noto Sans JP", "Hiragino Sans", sans-serif; }
html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #f4f0e7; color: #1e1d19; }
.og { box-sizing: border-box; width: 1200px; height: 630px; padding: 56px 64px; display: grid; gap: 48px; align-items: center; }
.og-site { grid-template-columns: 1fr 520px; }
.og-item { grid-template-columns: 1fr 540px; }
.og-brand { display: flex; align-items: center; gap: 18px; font-size: 34px; font-weight: 500; letter-spacing: 0.06em; }
.og-brand .logo-mark { width: 64px; height: 64px; }
.og-brand .logo-zukan { font-size: 0.82em; }
.og-title { margin: 28px 0 0; font-size: 58px; line-height: 1.38; font-weight: 400; letter-spacing: 0.04em; }
.og-title span { display: inline-block; }
.og-sub { margin: 22px 0 0; font-size: 24px; color: #5f5d55; letter-spacing: 0.04em; }
.og-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.og-grid > span { aspect-ratio: 1; border-radius: 10px; background: var(--pic); overflow: hidden; box-shadow: 0 6px 20px rgba(61,49,31,.08); }
.og-grid .og-mark { display: grid; place-items: center; background: #4f6f5f; }
.og-grid .og-mark .logo-mark { width: 70%; height: auto; }
.og-mark .lm-lens { fill: #fffaf0; stroke: #fffaf0; } .og-mark .lm-key { fill: #1e1d19; } .og-mark .lm-handle { stroke: #fffaf0; }
.og-cat { display: inline-block; padding: 4px 16px; border-radius: 8px; background: var(--cat); color: #fff; font-size: 24px; font-weight: 700; letter-spacing: 0.08em; }
.og-name { margin: 26px 0 0; font-size: 92px; line-height: 1.2; font-weight: 500; letter-spacing: 0.04em; word-break: keep-all; overflow-wrap: anywhere; }
.og-name.long { font-size: 68px; }
.og-count { margin: 18px 0 0; font-size: 26px; color: #5f5d55; }
.og-item .og-brand { margin-top: 56px; font-size: 28px; }
.og-item .og-brand .logo-mark { width: 52px; height: 52px; }
.og-cover { width: 540px; height: 518px; border-radius: 14px; background: var(--pic); overflow: hidden; box-shadow: 0 10px 30px rgba(61,49,31,.10); }
.og-cover .cover { padding: 9%; }
</style></head><body><div class="og ${cls}">${inner}</div>
<svg width="0" height="0" style="position:absolute"><defs><marker id="ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 9 5 1 9Z" class="ah-head"/></marker></defs></svg></body></html>`;
  const brand = `<p class="og-brand logo">${LOGO_MARK()}<span class="logo-text">みのまわり<span class="logo-zukan">図鑑</span></span></p>`;
  const manifest = { site: SITE, base: B, images: [] };
  const picks = heroPicks(8);
  const cells = picks.map(it => `<span class="cat-${it.cat.id}">${coverHtml(itemCover(it), it.cat.id)}</span>`);
  cells.splice(4, 0, `<span class="og-mark">${LOGO_MARK()}</span>`);
  fs.writeFileSync(path.join(dir, 'site.html'), shell('og-site', `<div>${brand}
      <h1 class="og-title"><span>見てるけど、</span><span>知らない。</span><br><span>さわってるけど、</span><span>知らない。</span></h1>
      <p class="og-sub">身の回りのものの仕組みを、読む人の年齢に合わせて。</p></div>
      <div class="og-grid">${cells.join('')}</div>`));
  manifest.images.push({ key: 'site', src: 'site.html', alt: 'みのまわり図鑑：見てるけど、知らない。さわってるけど、知らない。' });
  for (const it of allItems) {
    const c = itemCover(it);
    if (!c) continue;
    const plainName = it.name.replace(/\s+/g, '');
    fs.writeFileSync(path.join(dir, 'i', `${it.id}.html`), shell(`og-item cat-${it.cat.id}`, `<div>
      <span class="og-cat">${it.cat.name}</span>
      <h1 class="og-name${plainName.length > 5 ? ' long' : ''}">${it.name}</h1>
      <p class="og-count">${it.entries.length}話</p>
      ${brand}</div>
      <div class="og-cover">${coverHtml(c, it.cat.id)}</div>`));
    manifest.images.push({ key: `i/${it.id}`, src: `i/${it.id}.html`, alt: `${it.name}｜みのまわり図鑑` });
  }
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 1));
}

// ---------- run ----------
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const a of ASSETS) write(a, read(a));
if (fs.existsSync(path.join(ROOT, 'images'))) fs.cpSync(path.join(ROOT, 'images'), path.join(OUT, 'images'), { recursive: true });
write('.nojekyll', '');
buildHome();
buildCategories();
buildAngles();
buildSearch();
buildItems();
buildTriviaRedirects();
buildAbout();
buildMeta();
buildOgTemplates();
console.log(`built ${pageCount} pages (${sitemap.length} in sitemap, ${allEntries.length} trivia, ${Object.keys(F).length} figures) into ${path.relative(ROOT, OUT) || OUT} for ${SITE} (base ${B}); dates from ${fileDates ? 'git history' : 'tools/working.txt'}; ${Math.round(performance.now() - t0)} ms`);
