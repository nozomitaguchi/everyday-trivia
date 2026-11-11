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

const t0 = performance.now();
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const require = createRequire(import.meta.url);
const CORE = require(path.join(ROOT, 'assets/core.js'));
const { LEVELS, ANGLES, esc, inline, toHtml, parseIndex, parseEntry, entryView, angleLabels, angleId, firstParagraph, plain } = CORE;

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
const picto = id => `<svg class="picto" viewBox="0 0 24 24" aria-hidden="true">${PICTO[id] || '<circle cx="12" cy="12" r="8"/>'}</svg>`;

const figureHtml = n => (F[n] ? `<figure class="fig"><svg viewBox="${F[n].box || '0 0 320 200'}" role="img" aria-label="${esc(F[n].alt || '')}">${F[n].svg}</svg></figure>` : '');
const thumbHtml = (n, catId) => (F[n]
  ? `<span class="fig thumb" aria-hidden="true"><svg viewBox="${F[n].box || '0 0 320 200'}" preserveAspectRatio="xMidYMid meet" focusable="false">${F[n].svg}</svg></span>`
  : `<span class="no-pic">${picto(catId)}</span>`);
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
      <span class="card-pic">${thumbHtml(itemFig(it), it.cat.id)}</span>
      <span class="card-body">
        <span class="card-cat">${it.cat.name}</span>
        <span class="card-title">${it.name}</span>
        <span class="card-sub">${countSay(it)}</span>
        ${tags ? `<span class="card-tags" data-lv="adult">${angles.map(a => `<span class="tag">${esc(angleLabels(a).adult)}</span>`).join('')}</span>` : ''}
      </span></a></li>`;
}
const kidTitle = e => { const m = parseEntry(md.get(e.slug)).meta; return m.kidtitle || m.title || e.title; };
function entryCard(e) {
  const kt = esc(kidTitle(e));
  return `<li><a class="card cat-${e.item.cat.id}" href="${U.trivia(e.slug)}">
      <span class="card-pic">${thumbHtml(hasFig(e.slug) ? e.slug : itemFig(e.item), e.item.cat.id)}</span>
      <span class="card-body">
        <span class="card-cat">${e.item.cat.name}・${e.item.name}</span>
        ${lvx({ small: kt, kid: kt, adult: esc(e.title) }, 'span', 'card-title')}
        <span class="card-sub">${angleSay(e.angle)}</span>
      </span></a></li>`;
}
function catCard(c) {
  const n = c.items.reduce((s, i) => s + i.entries.length, 0);
  const count = n ? say(`${c.items.length}こ`, `${c.items.length}こ`, `${c.items.length}種・${n}話`) : say('じゅんびちゅう', 'じゅんびちゅう', '準備中');
  return `<li><a class="cat-card cat-${c.id}" href="${U.cat(c.id)}">
      <span class="cat-pic">${picto(c.id)}</span>
      <span class="cat-card-body"><span class="cat-card-name">${c.name}</span><span class="cat-card-count">${count}</span></span></a></li>`;
}
const angleCounts = new Map();
allEntries.forEach(e => angleCounts.set(e.angle, (angleCounts.get(e.angle) || 0) + 1));
const angleKeys = [...Object.keys(ANGLES).filter(a => angleCounts.has(a)), ...[...angleCounts.keys()].filter(a => !ANGLES[a])];
const angleChips = current => `<ul class="chips">${angleKeys.map(a => `<li><a class="chip" href="${U.angle(a)}"${a === current ? ' aria-current="page"' : ''}>${angleSay(a)}<span class="chip-n">${angleCounts.get(a)}</span></a></li>`).join('')}</ul>`;
const tilesHtml = items => `<ul class="tiles">${items.map(it => `<li><a class="tile cat-${it.cat.id}" href="${U.item(it.id)}">
      <span class="tile-pic">${thumbHtml(itemFig(it), it.cat.id)}</span>
      <span class="tile-name">${it.name}</span></a></li>`).join('')}</ul>`;

// ---------- page shell ----------
const ANGLE_IDS = Object.fromEntries(Object.entries(ANGLES).map(([k, v]) => [k, v.id]));
function page({ file, title, description, view, body, nav = '', noindex = false, canonical = null, widgets = false, head = '', ogType = 'website' }) {
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
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%234f6f5f'/%3E%3Ccircle cx='28' cy='28' r='13' fill='none' stroke='%23fffaf0' stroke-width='6'/%3E%3Cpath d='M38 38l12 12' stroke='%23fffaf0' stroke-width='7' stroke-linecap='round'/%3E%3C/svg%3E">
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
    <a class="logo" href="${U.home()}">みのまわり<span>図鑑</span></a>
    <nav class="site-nav" aria-label="メインメニュー">
      ${navLink('c', U.cats(), 'カテゴリ')}
      ${navLink('a', U.angles(), 'きりくち')}
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
    </div>
  </div>
</header>
<main id="main" tabindex="-1">
${body}
</main>
<footer class="site-foot">
  <div class="foot-inner">
    <div>
      <p class="foot-name">みのまわり図鑑</p>
      <p class="foot-note">説明はそれぞれの出典をもとに書いています。</p>
    </div>
    <a href="https://github.com/nozomitaguchi/everyday-trivia">まちがいを見つけたら GitHub で教えてください</a>
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
  const adult = part(adultSec, meta.title || e.title);
  const kid = kidSec ? part(kidSec, meta.kidtitle || meta.title || e.title) : adult;
  return `<article class="today cat-${e.item.cat.id}" data-day="${key}"${shown ? '' : ' hidden'} aria-label="きょうの ひとつ">
          <p class="labels"><span class="label">きょうの ひとつ</span><span class="label label-cat">${e.item.cat.name}</span><span class="label-plain">${e.item.name}・${angleSay(e.angle)}</span></p>
          ${lvx({ small: kid, kid, adult }, 'div', 'today-body')}
          <a class="more" href="${U.trivia(e.slug)}">つづきを 読む →</a>
        </article>`;
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
  const body = `<div data-lv="kid adult"><div class="wrap">
      <section class="hero">
        <div class="hero-text">
          <h1 class="hero-title"><span>見てるけど、</span><span>知らない。</span><br><span>さわってるけど、</span><span>知らない。</span></h1>
          ${lvx({ small: '', kid: 'まいにち 見る ものの「なにで できてる？」「どうやって つくる？」「どんな しくみ？」「なぜ この かたち？」を あつめた ずかんです。読む人に あわせて、せつめいが かわります。', adult: '身の回りのものの「なにでできてる？」「どうやってつくる？」「どんなしくみ？」「なぜこのかたち？」を集めた図鑑。読む人の年齢に合わせて、説明が切り替わります。' }, 'p', 'hero-lead')}
          <div class="btns">
            <a class="btn btn-primary" href="${U.cats()}">カテゴリから さがす</a>
            <a class="btn" href="${U.angles()}">きりくちから さがす</a>
          </div>
        </div>
        <div class="today-set">${keys.map(k => todayCard(CORE.dayPick(allEntries, k), k, k === todayKey)).join('')}</div>
      </section>

      <section class="section" aria-labelledby="h-cats">
        <div class="section-head"><h2 class="section-title" id="h-cats">カテゴリ</h2></div>
        <ul class="cat-grid">${idx.cats.map(catCard).join('')}</ul>
      </section>

      ${recent.length ? `<section class="section" aria-labelledby="h-recent">
        <div class="section-head"><h2 class="section-title" id="h-recent">さいきん くわしく なった もの</h2></div>
        <ul class="grid grid-4">${recent.map(it => itemCard(it, { tags: false })).join('')}</ul>
      </section>` : ''}

      <section class="section angles-box" aria-labelledby="h-angles">
        <h2 class="section-title" id="h-angles">きりくちで さがす</h2>
        ${lvx({ small: '', kid: 'おなじ きりくちで、いろいろな ものを くらべて 読めます。', adult: '同じ切り口（素材・歴史・しるし…）で、いろいろなものを横にくらべて読めます。' }, 'p', 'section-lead')}
        ${angleChips()}
      </section>
    </div></div>
    <div data-lv="small"><div class="wrap">
      <h1 class="small-title">どれを みる？</h1>
      ${idx.cats.filter(c => c.items.length).map(c => `<section class="tile-group cat-${c.id}" aria-labelledby="g-${c.id}">
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
      <ul class="cat-grid">${idx.cats.map(catCard).join('')}</ul>
      <div class="cat-index">${idx.cats.filter(c => c.items.length).map(c => `<section class="cat-index-group cat-${c.id}">
        <h2><a href="${U.cat(c.id)}">${picto(c.id)}${c.name}</a></h2>
        <ul class="chips">${c.items.map(i => `<li><a class="chip" href="${U.item(i.id)}">${i.name}<span class="chip-n">${i.entries.length}</span></a></li>`).join('')}</ul>
      </section>`).join('')}</div>
    </div>`;
  sitemap.push({ loc: page({ file: 'c/index.html', title: 'カテゴリ', view: 'categories', nav: 'c', body,
    description: `みのまわり図鑑のカテゴリ：${idx.cats.map(c => c.name).join('、')}。` }) });
  for (const c of idx.cats) {
    const body = `<div class="page cat-${c.id}">
      ${band(c.id, [homeCrumb(), { href: U.cats(), text: 'カテゴリ' }, { text: c.name }])}
      <div class="wrap">
        <header class="page-head"><h1 class="page-title">${picto(c.id)}${c.name}</h1></header>
        ${!c.items.length ? `<p class="empty">${say('いま つくって いるよ。まってね。', 'いま つくって いるよ。もうすこし まってね。', 'この分類はまだ準備中です。')}</p>`
          : `<ul class="grid" data-lv="kid adult">${c.items.map(i => itemCard(i)).join('')}</ul><div data-lv="small">${tilesHtml(c.items)}</div>`}
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
        <ul class="grid">${list.map(entryCard).join('')}</ul>
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
  const headings = Object.fromEntries(LV.map(l => [l, views[l].heading ? esc(views[l].heading) : '']));
  const bodies = Object.fromEntries(LV.map(l => [l,
    `${views[l].note ? `<p class="level-note">${views[l].note}</p>` : ''}<div class="body level-${views[l].textLevel}">${html(views[l].bodyMd)}</div>`]));
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
      return [l, sec ? html(sec.text) : ''];
    }));
    const pages = CORE.bookPages(it, mds, ov, hasFig, itemFig(it));
    const first = it.entries[0];
    const heroFig = first && hasFig(first.slug) ? figureHtml(first.slug) : '';
    const hasToc = it.entries.length > 1;
    const toc = hasToc ? `<nav class="toc" aria-label="この ページの もくじ"><p class="toc-label">${say('この ページの おはなし', 'もくじ', 'もくじ')}</p><ol>${it.entries.map((e, i) => {
      const meta = parseEntry(mds[i]).meta;
      const adult = esc(meta.title || e.title);
      const kid = esc(meta.kidtitle || meta.title || e.title);
      return `<li><a href="#t-${e.slug}" data-toc="${e.slug}"><span class="toc-n" aria-hidden="true">${i + 1}</span><span class="toc-angle">${angleSay(e.angle)}</span>${lvx({ small: kid, kid, adult }, 'span', 'toc-name')}</a></li>`;
    }).join('')}</ol></nav>` : '';
    const pn = prev || next ? `<nav class="pn" aria-label="まえと つぎの もの">
              ${prev ? `<a class="pn-prev" href="${U.item(prev.id)}"><span>← まえ</span>${prev.name}</a>` : ''}
              ${next ? `<a class="pn-next" href="${U.item(next.id)}"><span>つぎ →</span>${next.name}</a>` : ''}
            </nav>` : '';
    const body = `<div class="page item-page cat-${it.cat.id}">
      ${band(it.cat.id, [homeCrumb(), { href: U.cat(it.cat.id), text: it.cat.name }, { text: it.name }]).replace('<nav class="band', pages.length ? '<nav data-lv="kid adult" class="band' : '<nav class="band')}
      <div class="wrap"${pages.length ? ' data-lv="kid adult"' : ''}>
        <header class="item-hero${heroFig ? ' has-fig' : ''}">
          <div>
            <h1 class="item-title">${it.name}</h1>
            ${lvx(Object.fromEntries(LV.map(l => [l, lead[l] ? `<div class="item-lead level-${l}">${lead[l]}</div>` : ''])), 'div')}
            ${say('<span class="read-aloud">おとなの ひとが よんで あげてね。</span>', '<span class="hint">うえの「読む人」を かえると、せつめいが かわるよ。</span>', '<span class="hint">上の「読む人」を切りかえると、説明が子ども向けに変わります。</span>')}
          </div>
          ${heroFig ? `<div class="hero-fig">${heroFig}</div>` : ''}
        </header>
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
    const loc = page({ file: `i/${it.id}/index.html`, title: it.name, view: 'item', body, ogType: 'article',
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
buildMeta();
console.log(`built ${pageCount} pages (${sitemap.length} in sitemap, ${allEntries.length} trivia, ${Object.keys(F).length} figures) into ${path.relative(ROOT, OUT) || OUT} for ${SITE} (base ${B}); dates from ${fileDates ? 'git history' : 'tools/working.txt'}; ${Math.round(performance.now() - t0)} ms`);
