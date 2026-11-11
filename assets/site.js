/* みのまわり図鑑: browser behaviour for the pre-rendered pages made by tools/build.mjs.
   Every page already holds the text for all three reader levels; this script only switches
   between them, and adds search, the picture-book pager, the table-of-contents highlight,
   the diagrams and today's pick. (The old single-page version at the repo root is assets/app.js.) */
(() => {
  'use strict';
  const CORE = window.AHA_CORE;
  const { LEVELS, esc } = CORE;
  const root = document.documentElement;
  const B = document.body.dataset.base || '/';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---------- reader level (same storage as before: localStorage "aha-age" holds 4 / 7 / 15) ----------
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } },
  };
  let age = Math.min(15, Math.max(3, parseInt(store.get('aha-age'), 10) || 15));
  const level = () => CORE.levelOfAge(age);
  const seg = document.getElementById('level-seg');
  const segButtons = seg ? [...seg.querySelectorAll('button')] : [];

  function applyLevel() {
    const lv = level();
    const i = LEVELS.indexOf(lv);
    root.dataset.level = lv.id;
    if (seg) seg.style.setProperty('--i', i);
    segButtons.forEach((b, k) => { b.setAttribute('aria-checked', String(k === i)); b.tabIndex = k === i ? 0 : -1; });
    // sources are open for adults and folded for children
    document.querySelectorAll('details.sources').forEach(d => { d.open = lv.id === 'adult'; });
    renderWidgets();
  }

  function setLevel(i, { instant = false } = {}) {
    if (LEVELS[i] === level()) return;
    // keep the trivia the reader was looking at in the same place
    const arts = [...document.querySelectorAll('.trivia')];
    const a = arts.find(el => el.getClientRects().length && el.getBoundingClientRect().bottom > 80);
    const anchor = a && a.getBoundingClientRect().top < window.innerHeight ? { el: a, top: a.getBoundingClientRect().top } : null;
    age = LEVELS[i].sample;
    store.set('aha-age', String(age));
    if (seg) seg.classList.toggle('instant', instant);
    applyLevel();
    closeSearch();
    if (anchor && anchor.el.getClientRects().length) window.scrollTo(0, window.scrollY + anchor.el.getBoundingClientRect().top - Math.max(anchor.top, 0));
    const m = document.getElementById('main');
    if (m && m.animate) m.animate(reduceMotion.matches ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }], { duration: 180, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
    initBook();
  }

  segButtons.forEach((b, i) => {
    b.addEventListener('click', e => setLevel(i, { instant: e.detail === 0 }));
    b.addEventListener('keydown', e => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      const n = (LEVELS.indexOf(level()) + d + LEVELS.length) % LEVELS.length;
      setLevel(n, { instant: true });
      segButtons[n].focus();
    });
  });

  // ---------- diagrams ----------
  function renderWidgets() {
    if (!window.AHA_WIDGETS) return;
    document.querySelectorAll('.widget-mount').forEach(m => { m.innerHTML = ''; window.AHA_WIDGETS.render(m.dataset.slug, m, level().id); });
  }

  // ---------- search over data/search.json (item names and trivia titles) ----------
  let dataPromise = null;
  const loadData = () => dataPromise || (dataPromise = fetch(`${B}data/search.json`).then(r => {
    if (!r.ok) throw new Error(`search.json ${r.status}`);
    return r.json();
  }).catch(e => { dataPromise = null; throw e; }));
  function searchData(d, query) {
    const nq = CORE.norm(query);
    if (!nq) return { items: [], entries: [] };
    const items = d.items.filter(i => CORE.norm(i.name).includes(nq));
    const entries = d.entries.filter(e => CORE.norm(e.title).includes(nq) || CORE.norm(e.kid).includes(nq));
    return { items, entries };
  }
  const itemName = (d, id) => (d.items.find(i => i.id === id) || { name: id }).name;
  const entryTitle = e => (level().id === 'adult' ? e.title : e.kid);
  const itemUrl = id => `${B}i/${id}/`;
  const entryUrl = e => `${B}i/${e.item}/#t-${e.slug}`;

  const searchForm = document.getElementById('search');
  const searchInput = document.getElementById('q');
  const searchBox = document.getElementById('search-results');
  const searchStatus = document.getElementById('search-status');
  const searchToggle = document.querySelector('.search-toggle');
  function closeSearch() { if (searchBox) { searchBox.hidden = true; searchBox.innerHTML = ''; } }

  async function updateSearch() {
    const query = searchInput.value.trim();
    if (!query) { closeSearch(); searchStatus.textContent = ''; return; }
    let d;
    try { d = await loadData(); } catch (e) { return; }
    if (searchInput.value.trim() !== query) return;
    const { items, entries } = searchData(d, query);
    const total = items.length + entries.length;
    searchStatus.textContent = total ? `${total}件 見つかりました` : '見つかりませんでした';
    const li = (href, kind, title) => `<li><a href="${href}"><span class="sr-kind">${esc(kind)}</span><span class="sr-title">${esc(title)}</span></a></li>`;
    searchBox.innerHTML = total
      ? `<ul>${items.slice(0, 5).map(i => li(itemUrl(i.id), `もの・${d.cats[i.cat]}`, i.name)).join('')}${entries.slice(0, 6).map(e => li(entryUrl(e), `${itemName(d, e.item)}・${CORE.angleLabel(e.angle, level().id)}`, entryTitle(e))).join('')}${
        total > 11 ? `<li><a class="sr-all" href="${B}s/?q=${encodeURIComponent(query)}">すべての けっかを 見る（${total}件）</a></li>` : ''}</ul>`
      : `<p class="sr-empty">「${esc(query)}」は 見つかりませんでした。</p>`;
    searchBox.hidden = false;
  }
  if (searchForm) {
    searchInput.addEventListener('input', updateSearch);
    searchInput.addEventListener('focus', () => { if (searchInput.value.trim()) updateSearch(); });
    searchForm.addEventListener('submit', e => { if (!searchInput.value.trim()) e.preventDefault(); });
    // arrow keys move between results; Escape closes and returns to the field
    searchForm.addEventListener('keydown', e => {
      const links = [...searchBox.querySelectorAll('a')];
      const at = links.indexOf(document.activeElement);
      if (e.key === 'Escape') { if (!searchBox.hidden) { e.preventDefault(); closeSearch(); searchInput.focus(); } return; }
      if (e.key === 'ArrowDown' && links.length) { e.preventDefault(); links[Math.min(at + 1, links.length - 1)].focus(); }
      if (e.key === 'ArrowUp' && at >= 0) { e.preventDefault(); (at === 0 ? searchInput : links[at - 1]).focus(); }
    });
    searchForm.addEventListener('focusout', e => {
      if (!searchForm.contains(e.relatedTarget)) setTimeout(() => { if (!searchForm.contains(document.activeElement)) closeSearch(); }, 0);
    });
    searchToggle.addEventListener('click', () => {
      const open = !root.classList.contains('search-open');
      root.classList.toggle('search-open', open);
      searchToggle.setAttribute('aria-expanded', String(open));
      if (open) searchInput.focus();
    });
  }

  // the search page: s/?q=...
  async function renderSearchPage() {
    const out = document.getElementById('search-page-results');
    if (!out) return;
    const query = (new URLSearchParams(location.search).get('q') || '').trim();
    const q2 = document.getElementById('q2');
    if (q2) q2.value = query;
    if (!query) return;
    document.title = `「${query}」の けっか｜みのまわり図鑑`;
    document.getElementById('search-title').textContent = `「${query}」`;
    let d;
    try { d = await loadData(); } catch (e) { out.innerHTML = '<p class="empty">さくいんを 読みこめませんでした。通信の状態を確かめて、読みこみ直してください。</p>'; return; }
    const draw = () => {
      const { items, entries } = searchData(d, query);
      document.getElementById('search-lead').textContent = items.length + entries.length
        ? `もの ${items.length}件・おはなし ${entries.length}件` : '見つかりませんでした。ことばを かえて さがして みてください。';
      const card = (href, cat, catName, title, sub) => `<li><a class="card cat-${cat}" href="${href}"><span class="card-body"><span class="card-cat">${esc(catName)}</span><span class="card-title">${esc(title)}</span><span class="card-sub">${esc(sub)}</span></span></a></li>`;
      out.innerHTML = `${items.length ? `<section class="section" aria-labelledby="h-si"><h2 class="section-title" id="h-si">もの</h2><div class="section-head"></div><ul class="grid">${items.map(i => card(itemUrl(i.id), i.cat, d.cats[i.cat], i.name, level().id === 'adult' ? `${i.n}話` : `おはなし ${i.n}こ`)).join('')}</ul></section>` : ''}
        ${entries.length ? `<section class="section" aria-labelledby="h-se"><h2 class="section-title" id="h-se">おはなし</h2><div class="section-head"></div><ul class="grid">${entries.map(e => {
          const it = d.items.find(i => i.id === e.item) || { cat: '', name: e.item };
          return card(entryUrl(e), it.cat, `${d.cats[it.cat] || ''}・${it.name}`, entryTitle(e), CORE.angleLabel(e.angle, level().id));
        }).join('')}</ul></section>` : ''}`;
    };
    draw();
    segButtons.forEach(b => b.addEventListener('click', () => setTimeout(draw, 0)));
  }

  // ---------- table of contents: mark the trivia on screen ----------
  function watchToc() {
    const links = new Map([...document.querySelectorAll('[data-toc]')].map(a => [a.dataset.toc, a]));
    if (!links.size || !('IntersectionObserver' in window)) return;
    const visible = new Set();
    const order = [...links.keys()];
    const io = new IntersectionObserver(items => {
      items.forEach(x => (x.isIntersecting ? visible.add(x.target.id.slice(2)) : visible.delete(x.target.id.slice(2))));
      const slug = order.find(s => visible.has(s));
      if (!slug) return;
      links.forEach((a, s) => a.setAttribute('aria-current', String(s === slug)));
      const cur = links.get(slug);
      const row = cur.closest('ol');
      if (row && row.scrollWidth > row.clientWidth) row.scrollTo({ left: cur.parentElement.offsetLeft - 16, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }, { rootMargin: '0px 0px -60% 0px' });
    document.querySelectorAll('.trivia').forEach(el => io.observe(el));
  }

  // ---------- ちいさい子: picture-book pager over the pre-rendered pages ----------
  let book = null;
  function initBook() {
    const wrap = document.querySelector('.book');
    if (!wrap || book) return;
    const pages = [...wrap.querySelectorAll('.book-page')];
    if (!pages.length) return;
    const el = s => wrap.querySelector(s);
    const dots = [...wrap.querySelectorAll('.dots span')];
    let i = 0;
    // a link to one trivia (#t-<slug>) opens the book at that trivia
    const m = location.hash.match(/^#t-([a-z0-9-]+)$/);
    if (m) { const at = pages.findIndex(p => p.dataset.slug === m[1]); if (at >= 0) i = at; }
    function draw() {
      pages.forEach((p, k) => { p.hidden = k !== i; });
      const last = i === pages.length - 1;
      el('.book-end').hidden = !last;
      el('.prev').setAttribute('aria-disabled', String(i === 0));
      el('.next').setAttribute('aria-disabled', String(last));
      const ci = Number(pages[i].dataset.chapter);
      dots.forEach((d, k) => d.classList.toggle('on', k === ci));
      el('.book-progress span').style.width = `${((i + 1) / pages.length) * 100}%`;
      el('.book-count').textContent = `${pages.length}ページの うち ${i + 1}ページめ。${pages[i].querySelector('.book-text').textContent}`;
    }
    function go(d) {
      const n = i + d;
      if (n < 0 || n >= pages.length) return;
      i = n;
      draw();
      if (pages[i].animate) {
        const frames = reduceMotion.matches ? [{ opacity: 0.4 }, { opacity: 1 }] : [{ opacity: 0, transform: `translateX(${d * 16}px)` }, { opacity: 1, transform: 'none' }];
        pages[i].animate(frames, { duration: 220, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
      }
    }
    el('.prev').addEventListener('click', () => go(-1));
    el('.next').addEventListener('click', () => go(1));
    let sx = null;
    const area = el('.book-pages');
    area.addEventListener('pointerdown', e => { sx = e.clientX; });
    area.addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1); });
    area.addEventListener('pointercancel', () => { sx = null; });
    book = { go, wrap };
    draw();
  }
  // left / right arrow keys turn pages while the book is showing (not while typing or using another control)
  document.addEventListener('keydown', e => {
    if (!book || !book.wrap.getClientRects().length) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest && e.target.closest('input, textarea, [role="radiogroup"], .turn')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); book.go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); book.go(-1); }
  });

  // ---------- home: today's pick for the reader's own date ----------
  function pickToday() {
    const cards = [...document.querySelectorAll('.today[data-day]')];
    const mine = cards.find(c => c.dataset.day === CORE.dayKey(new Date()));
    if (mine) cards.forEach(c => { c.hidden = c !== mine; });
  }

  pickToday();
  applyLevel();
  requestAnimationFrame(() => seg && seg.classList.remove('instant'));
  initBook();
  watchToc();
  renderSearchPage();
})();
