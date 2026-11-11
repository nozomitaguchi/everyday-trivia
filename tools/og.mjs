#!/usr/bin/env node
// みのまわり図鑑: share images (og:image) without any packages.
//
//   node tools/build.mjs && node tools/og.mjs
//
// tools/build.mjs writes one HTML template per image into _og-src/ (site-wide + one per item). This script
// screenshots them at 1200x630 with a headless Chrome / Chromium already on the machine (GitHub's ubuntu
// runners have google-chrome), writes _site/og/*.png, and only then adds og:image / twitter:image tags to
// the pages whose image really exists. If anything fails, pages keep no image tags (the deploy is unaffected).
//
//   CHROME=/path/to/chrome   which browser to use (default: the first of google-chrome, chromium, ... on PATH)
//   OUT=_site  OG_SRC=_og-src  OG_JOBS=4
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn, execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const t0 = performance.now();
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.resolve(ROOT, process.env.OUT || '_site');
const SRC = path.resolve(ROOT, process.env.OG_SRC || '_og-src');
const JOBS = Math.max(1, parseInt(process.env.OG_JOBS, 10) || 4);
const W = 1200, H = 630;

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  for (const c of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'chrome']) {
    try { return execFileSync('which', [c], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch (e) { /* next */ }
  }
  return null;
}

// a PNG of the expected size?
function pngOk(f) {
  try {
    const b = fs.readFileSync(f);
    if (b.length < 2000 || b.readUInt32BE(0) !== 0x89504e47) return false;
    return b.readUInt32BE(16) === W && b.readUInt32BE(20) === H;
  } catch (e) { return false; }
}

function shoot(chrome, html, png, profile) {
  return new Promise(resolve => {
    fs.mkdirSync(path.dirname(png), { recursive: true });
    fs.rmSync(png, { force: true });
    const args = ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--mute-audio', '--no-first-run',
      '--disable-extensions', '--force-device-scale-factor=1', '--force-color-profile=srgb', `--user-data-dir=${profile}`,
      `--window-size=${W},${H}`, '--virtual-time-budget=5000', '--run-all-compositor-stages-before-draw', `--screenshot=${png}`, pathToFileURL(html).href];
    const p = spawn(chrome, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', d => { err += d; });
    const timer = setTimeout(() => p.kill('SIGKILL'), 45000);
    p.on('close', () => { clearTimeout(timer); resolve(pngOk(png) ? null : (err.split('\n').filter(Boolean).slice(-2).join(' ') || 'no image')); });
    p.on('error', e => { clearTimeout(timer); resolve(e.message); });
  });
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function main() {
  const manifestFile = path.join(SRC, 'manifest.json');
  if (!fs.existsSync(manifestFile)) throw new Error(`${path.relative(ROOT, manifestFile)} not found: run node tools/build.mjs first`);
  const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
  const chrome = findChrome();
  if (!chrome) throw new Error('no Chrome / Chromium found (set CHROME=/path/to/chrome)');

  // 1. images
  const queue = [...manifest.images];
  const done = new Map();
  const failed = [];
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'og-'));
  await Promise.all(Array.from({ length: JOBS }, async (_, w) => {
    const profile = path.join(tmp, `p${w}`);
    for (let job = queue.shift(); job; job = queue.shift()) {
      const png = path.join(OUT, 'og', `${job.key}.png`);
      let err = await shoot(chrome, path.join(SRC, job.src), png, profile);
      if (err) err = await shoot(chrome, path.join(SRC, job.src), png, profile); // one retry
      if (err) { failed.push(`${job.key}: ${err}`); fs.rmSync(png, { force: true }); } else done.set(job.key, job);
    }
  }));
  fs.rmSync(tmp, { recursive: true, force: true });

  // 2. tags, only for images that exist (an item without its own image uses the site image)
  const url = key => new URL(`og/${key}.png`, manifest.site).href;
  let pages = 0;
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []));
  for (const f of walk(OUT)) {
    const src = fs.readFileSync(f, 'utf8');
    if (!src.includes('<!--og-image:')) continue;
    const out = src.replace(/<!--og-image:([^>]*?)-->/g, (_, key) => {
      const job = done.get(key) || done.get('site');
      if (!job) return '';
      return [`<meta property="og:image" content="${esc(url(job.key))}">`, `<meta property="og:image:width" content="${W}">`, `<meta property="og:image:height" content="${H}">`,
        `<meta property="og:image:alt" content="${esc(job.alt)}">`, `<meta name="twitter:image" content="${esc(url(job.key))}">`].join('\n');
    });
    const final = out.includes('property="og:image"') ? out.replace('<meta name="twitter:card" content="summary">', '<meta name="twitter:card" content="summary_large_image">') : out;
    if (final !== src) { fs.writeFileSync(f, final); pages++; }
  }
  console.log(`og: ${done.size}/${manifest.images.length} images with ${path.basename(chrome)}, tags on ${pages} pages; ${Math.round(performance.now() - t0)} ms`);
  if (failed.length) console.warn(`og: failed:\n  ${failed.join('\n  ')}`);
  if (!done.size) process.exitCode = 1;
}

main().catch(e => { console.error(`og: ${e.message}`); process.exitCode = 1; });
