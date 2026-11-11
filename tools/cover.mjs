// みのまわり図鑑: cover art for cards, tiles, shelves, the home hero and share images.
// Node standard library only. Works on the SVG strings of assets/figures-*.js without a DOM.
//
// A cover is the item's own picture with the words taken out and the drawing cropped to what is drawn,
// so it reads at thumbnail size. An explicit figure named `cover-<item id>` (assets/figures-covers.js)
// is used as it is instead.

const NUM = /-?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi;
const nums = s => (String(s || '').match(NUM) || []).map(Number);

// 2x3 affine matrices [a b c d e f]
const I = [1, 0, 0, 1, 0, 0];
const mul = (m, n) => [
  m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5],
];
function parseTransform(t) {
  let m = I;
  if (!t) return m;
  for (const [, fn, args] of t.matchAll(/(\w+)\s*\(([^)]*)\)/g)) {
    const a = nums(args);
    let n = I;
    if (fn === 'translate') n = [1, 0, 0, 1, a[0] || 0, a[1] || 0];
    else if (fn === 'scale') n = [a[0] ?? 1, 0, 0, a[1] ?? a[0] ?? 1, 0, 0];
    else if (fn === 'rotate') {
      const r = (a[0] || 0) * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
      n = [c, s, -s, c, 0, 0];
      if (a.length >= 3) n = mul(mul([1, 0, 0, 1, a[1], a[2]], n), [1, 0, 0, 1, -a[1], -a[2]]);
    } else if (fn === 'matrix' && a.length === 6) n = a;
    else if (fn === 'skewX') n = [1, 0, Math.tan((a[0] || 0) * Math.PI / 180), 1, 0, 0];
    else if (fn === 'skewY') n = [1, Math.tan((a[0] || 0) * Math.PI / 180), 0, 1, 0, 0];
    m = mul(m, n);
  }
  return m;
}
const ap = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];

// points on a path (end points, control points, and samples along arcs)
function pathPoints(d) {
  const toks = String(d || '').match(/[MmLlHhVvCcSsQqTtAaZz]|-?(?:\d*\.\d+|\d+\.?)(?:e[-+]?\d+)?/gi) || [];
  const pts = [];
  let i = 0, cmd = '', x = 0, y = 0, sx = 0, sy = 0;
  const num = () => Number(toks[i++]);
  const isNum = () => i < toks.length && !/^[a-z]$/i.test(toks[i]);
  while (i < toks.length) {
    if (/^[a-z]$/i.test(toks[i])) cmd = toks[i++];
    else if (!cmd) { i++; continue; }
    const rel = cmd === cmd.toLowerCase();
    const C = cmd.toUpperCase();
    if (C === 'Z') { x = sx; y = sy; continue; }
    if (!isNum()) continue;
    const ox = rel ? x : 0, oy = rel ? y : 0;
    if (C === 'M' || C === 'L' || C === 'T') {
      x = ox + num(); y = oy + num(); pts.push([x, y]);
      if (C === 'M') { sx = x; sy = y; cmd = rel ? 'l' : 'L'; }
    } else if (C === 'H') { x = ox + num(); pts.push([x, y]); }
    else if (C === 'V') { y = oy + num(); pts.push([x, y]); }
    else if (C === 'C') {
      for (let k = 0; k < 3; k++) { const px = ox + num(), py = oy + num(); pts.push([px, py]); if (k === 2) { x = px; y = py; } }
    } else if (C === 'S' || C === 'Q') {
      for (let k = 0; k < 2; k++) { const px = ox + num(), py = oy + num(); pts.push([px, py]); if (k === 1) { x = px; y = py; } }
    } else if (C === 'A') {
      let rx = Math.abs(num()), ry = Math.abs(num());
      const rot = num() * Math.PI / 180, fa = num(), fs = num();
      const x2 = ox + num(), y2 = oy + num();
      // endpoint -> centre parameterisation, then sample the arc
      if (rx && ry && (x2 !== x || y2 !== y)) {
        const c = Math.cos(rot), s = Math.sin(rot);
        const dx = (x - x2) / 2, dy = (y - y2) / 2;
        const x1p = c * dx + s * dy, y1p = -s * dx + c * dy;
        const lam = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry);
        if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
        const num2 = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p;
        const den = rx * rx * y1p * y1p + ry * ry * x1p * x1p;
        let k = Math.sqrt(Math.max(0, num2 / den));
        if (fa === fs) k = -k;
        const cxp = k * rx * y1p / ry, cyp = -k * ry * x1p / rx;
        const cx = c * cxp - s * cyp + (x + x2) / 2, cy = s * cxp + c * cyp + (y + y2) / 2;
        const ang = (ux, uy, vx, vy) => Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
        const t1 = ang(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry);
        let dt = ang((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry);
        if (!fs && dt > 0) dt -= 2 * Math.PI;
        if (fs && dt < 0) dt += 2 * Math.PI;
        for (let n = 1; n <= 16; n++) {
          const t = t1 + dt * n / 16;
          pts.push([cx + rx * Math.cos(t) * c - ry * Math.sin(t) * s, cy + rx * Math.cos(t) * s + ry * Math.sin(t) * c]);
        }
      }
      x = x2; y = y2; pts.push([x, y]);
    } else { i++; }
  }
  return pts;
}

const attr = (a, n) => { const m = a.match(new RegExp(`(?:^|\\s)${n}\\s*=\\s*"([^"]*)"`)) || a.match(new RegExp(`(?:^|\\s)${n}\\s*=\\s*'([^']*)'`)); return m ? m[1] : null; };
const numAttr = (a, n, d = 0) => { const v = attr(a, n); const x = v == null ? NaN : parseFloat(v); return Number.isFinite(x) ? x : d; };
const SKIP = new Set(['defs', 'marker', 'clipPath', 'mask', 'pattern', 'symbol', 'linearGradient', 'radialGradient', 'filter', 'title', 'desc', 'style']);

// words and label arrows out; the drawing stays
export function stripLabels(svg) {
  return String(svg)
    .replace(/<text\b[\s\S]*?<\/text>/g, '')
    .replace(/<text\b[^>]*\/>/g, '')
    .replace(/<path\b[^>]*\bclass="[^"]*\barw\b[^"]*"[^>]*\/?>(?:<\/path>)?/g, '');
}

// bounding box of everything drawn, in viewBox units; null if nothing measurable
export function contentBox(svg) {
  const stack = [I];
  const skip = [];
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity, count = 0;
  const add = (m, pts, pad) => {
    for (const [px, py] of pts) {
      if (!Number.isFinite(px) || !Number.isFinite(py)) continue;
      const [X, Y] = ap(m, px, py);
      x0 = Math.min(x0, X - pad); y0 = Math.min(y0, Y - pad); x1 = Math.max(x1, X + pad); y1 = Math.max(y1, Y + pad);
    }
  };
  for (const m of String(svg).matchAll(/<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g)) {
    const [, close, tag, a, self] = m;
    if (close) {
      if (skip.length && skip[skip.length - 1] === tag) { skip.pop(); continue; }
      if (tag === 'g' || tag === 'svg' || tag === 'a') stack.length > 1 && stack.pop();
      continue;
    }
    if (SKIP.has(tag)) { if (!self) skip.push(tag); continue; }
    if (skip.length) continue;
    const top = stack[stack.length - 1];
    const t = attr(a, 'transform');
    const M = t ? mul(top, parseTransform(t)) : top;
    if (tag === 'g' || tag === 'svg' || tag === 'a') { if (!self) stack.push(M); continue; }
    const style = attr(a, 'style') || '';
    if (/display\s*:\s*none|visibility\s*:\s*hidden/.test(style) || /opacity\s*:\s*0(?:\.0*)?(?:;|$)/.test(style)) continue;
    const pad = 1.5;
    let pts = null;
    if (tag === 'rect' || tag === 'image' || tag === 'foreignObject') {
      const x = numAttr(a, 'x'), y = numAttr(a, 'y'), w = numAttr(a, 'width'), h = numAttr(a, 'height');
      if (w > 0 && h > 0) pts = [[x, y], [x + w, y], [x, y + h], [x + w, y + h]];
    } else if (tag === 'circle') {
      const cx = numAttr(a, 'cx'), cy = numAttr(a, 'cy'), r = numAttr(a, 'r');
      if (r > 0) pts = [[cx - r, cy - r], [cx + r, cy - r], [cx - r, cy + r], [cx + r, cy + r]];
    } else if (tag === 'ellipse') {
      const cx = numAttr(a, 'cx'), cy = numAttr(a, 'cy'), rx = numAttr(a, 'rx'), ry = numAttr(a, 'ry');
      if (rx > 0 && ry > 0) pts = [[cx - rx, cy - ry], [cx + rx, cy - ry], [cx - rx, cy + ry], [cx + rx, cy + ry]];
    } else if (tag === 'line') {
      pts = [[numAttr(a, 'x1'), numAttr(a, 'y1')], [numAttr(a, 'x2'), numAttr(a, 'y2')]];
    } else if (tag === 'polyline' || tag === 'polygon') {
      const n = nums(attr(a, 'points'));
      pts = [];
      for (let k = 0; k + 1 < n.length; k += 2) pts.push([n[k], n[k + 1]]);
    } else if (tag === 'path') {
      pts = pathPoints(attr(a, 'd'));
    }
    if (pts && pts.length) { add(M, pts, pad); count++; }
  }
  return count && x1 > x0 && y1 > y0 ? { x: x0, y: y0, w: x1 - x0, h: y1 - y0, count } : null;
}

const parseBox = b => { const n = nums(b || '0 0 320 200'); return n.length === 4 ? { x: n[0], y: n[1], w: n[2], h: n[3] } : { x: 0, y: 0, w: 320, h: 200 }; };
const r1 = v => Math.round(v * 10) / 10;

// -> { box, svg, auto, quality } or null. quality: share of the original picture the drawing covers (0..1);
// a low value means the figure was mostly words.
export function makeCover(F, itemId, figName) {
  const own = F[`cover-${itemId}`];
  if (own) return { box: own.box || '0 0 320 200', svg: own.svg, auto: false, quality: 1, name: `cover-${itemId}` };
  const f = figName && F[figName];
  if (!f) return null;
  const B = parseBox(f.box);
  const svg = stripLabels(f.svg);
  const c = contentBox(svg);
  if (!c) return { box: f.box || '0 0 320 200', svg, auto: true, quality: 0, name: figName };
  // stay within the picture (a little slack for strokes), then pad so nothing touches the edge
  const lim = { x0: B.x - B.w * 0.04, y0: B.y - B.h * 0.04, x1: B.x + B.w * 1.04, y1: B.y + B.h * 1.04 };
  let x0 = Math.max(c.x, lim.x0), y0 = Math.max(c.y, lim.y0), x1 = Math.min(c.x + c.w, lim.x1), y1 = Math.min(c.y + c.h, lim.y1);
  if (x1 <= x0 || y1 <= y0) return { box: f.box || '0 0 320 200', svg, auto: true, quality: 0, name: figName };
  // never zoom in more than 2.6x, so small details do not turn into blobs
  const minW = B.w / 2.6, minH = B.h / 2.6;
  if (x1 - x0 < minW) { const cx = (x0 + x1) / 2; x0 = cx - minW / 2; x1 = cx + minW / 2; }
  if (y1 - y0 < minH) { const cy = (y0 + y1) / 2; y0 = cy - minH / 2; y1 = cy + minH / 2; }
  const pad = Math.max(x1 - x0, y1 - y0) * 0.07;
  x0 -= pad; y0 -= pad; x1 += pad; y1 += pad;
  const quality = Math.min(1, ((c.w * c.h) / (B.w * B.h)));
  return { box: `${r1(x0)} ${r1(y0)} ${r1(x1 - x0)} ${r1(y1 - y0)}`, svg, auto: true, quality, name: figName };
}
