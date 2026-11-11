/* みのまわり図鑑: interactive diagrams (key switches, moon phases), shared by assets/app.js and assets/site.js.
   AHA_WIDGETS.render(slug, mount, levelId) appends the diagram for that trivia, if it has one. */
(function (root) {
  'use strict';

  // ---------- key switch drawing ----------
  // ticksOnly: draw tick marks on the plate instead of text labels (header dial)
  function keySwitchSvg({ size, labels, angle, litIndex, fontSize = 15, title, ticksOnly = false }) {
    const labelSvg = ticksOnly ? '' : labels.map((l, i) => {
      const rad = (l.angle - 90) * Math.PI / 180;
      const r = 63;
      return `<text class="label${i === litIndex ? ' on' : ''}" x="${(Math.cos(rad) * r).toFixed(1)}" y="${(Math.sin(rad) * r).toFixed(1)}" font-size="${fontSize}" text-anchor="middle" dominant-baseline="central">${l.text}</text>`;
    }).join('');
    const ticks = ticksOnly ? labels.map((l, i) => `<line class="tick${i === litIndex ? ' on' : ''}" x1="0" y1="-62" x2="0" y2="-80" style="transform: rotate(${l.angle}deg)"/>`).join('') : '';
    return `<svg width="${size}" height="${size}" viewBox="-100 -100 200 200" role="img" aria-label="${title}">
      <circle class="ring" r="92"/>
      ${ticks}
      ${labelSvg}
      <circle class="cyl" r="44"/>
      <circle class="cyl-hi" r="36"/>
      <g class="rotor" style="transform: rotate(${angle}deg)">
        <rect class="slot" x="-5" y="-30" width="10" height="38" rx="5"/>
        <circle class="slot" cx="0" cy="12" r="10"/>
      </g>
    </svg>`;
  }

  function render(slug, mount, lvId) {
    const level = () => ({ id: lvId });
  // ---------- interactive diagrams ----------
  const T = (o) => o[level().id];

  const WIDGETS = {
    'elevator-fire-service-keyswitch': {
      title: { small: 'かぎを まわして みよう', kid: 'かぎを まわして みよう', adult: '鍵を回してみる' },
      switches: [
        {
          name: { small: 'いちじしょうぼう', kid: 'いちじしょうぼう', adult: '一次消防' },
          positions: [{ text: '切', angle: -45 }, { text: '入', angle: 45 }],
          removable: [0, 1],
          status: {
            small: ['いつもの エレベーター', 'しょうぼうしさんの エレベーター'],
            kid: ['ふだんの エレベーター', 'しょうぼうしさん せんよう。かごの なかでしか うごかせない'],
            adult: ['通常運転', '一次消防運転。かご内の操作でだけ動く'],
          },
        },
        {
          name: { small: 'にじしょうぼう', kid: 'にじしょうぼう', adult: '二次消防' },
          positions: [{ text: '切', angle: 0 }, { text: '入', angle: 60, spring: true }],
          removable: [0],
          status: {
            small: ['いつもの ところ', 'ドアを あけた まま うごくよ！'],
            kid: ['ふだんは ここ', 'おさえて いる あいだだけ、ドアを あけた まま うごく'],
            adult: ['定位置', '二次消防運転。戸を開いたまま走行（保持している間だけ）'],
          },
        },
      ],
    },
    'car-ignition-key': {
      title: { small: 'かぎを まわして みよう', kid: 'かぎを まわして みよう', adult: '鍵を回してみる' },
      switches: [
        {
          name: { small: 'くるまの かぎ', kid: 'くるまの かぎ', adult: 'イグニッションキー' },
          positions: [
            { text: 'LOCK', angle: -66 },
            { text: 'ACC', angle: -22 },
            { text: 'ON', angle: 22 },
            { text: 'START', angle: 66, spring: true },
          ],
          fontSize: 14,
          removable: [0],
          status: {
            small: ['かぎを ぬけるよ', 'すこし でんきが つくよ', 'でんきが つくよ', 'ブルルン！ エンジンが かかるよ'],
            kid: ['ロック。かぎが ぬける', 'アクセサリー。でんきの いちぶが つかえる', 'オン。くるまの でんきが ぜんぶ つく', 'スタート。エンジンを かける。てを はなすと オンに もどる'],
            adult: ['LOCK。キーを抜ける唯一の位置', 'ACC。エンジンを止めたまま一部の電装品が使える', 'ON。走行に必要な電装に通電', 'START。セルモーターを回す。離すと ON へ戻る'],
          },
        },
      ],
    },
  };

  // ---- moon phase widget ----
  const MOON_STEPS = [
    { day: 0, small: 'しんげつ。みえないよ', kid: 'しんげつ。おひさまと おなじ ほうこうで、みえない', adult: '新月（見えない）' },
    { day: 3, small: 'みかづき', kid: 'みかづき', adult: '三日月（約3日）' },
    { day: 7, small: 'はんぶんの つき', kid: 'はんげつ（じょうげんの つき）', adult: '上弦の月（約7日）' },
    { day: 11, small: 'ふくらんだ つき', kid: 'まんまるに ちかい つき', adult: '十日余りの月（約11日）' },
    { day: 15, small: 'まんまる！', kid: 'まんげつ。おひさまの はんたいがわ', adult: '満月（約15日）' },
    { day: 18, small: 'すこし かけた つき', kid: 'かけはじめた つき', adult: '欠け始めの月（約18日）' },
    { day: 22, small: 'はんぶんの つき', kid: 'はんげつ（かげんの つき）', adult: '下弦の月（約22日）' },
    { day: 26, small: 'ほそい つき', kid: 'ほそい つき', adult: '細い月（約26日）' },
  ];
  const CYCLE = 29.53;

  function moonDiskPath(p, r) {
    // lit part of the moon as seen from Earth (northern hemisphere), p = 0..1 of the cycle
    const k = Math.cos(2 * Math.PI * p);
    const rx = Math.abs(k * r).toFixed(2);
    if (p < 0.5) {
      // waxing: right edge lit; terminator bulges right while crescent, left once gibbous
      return `M0 ${-r} A${r} ${r} 0 0 1 0 ${r} A${rx} ${r} 0 0 ${k > 0 ? 0 : 1} 0 ${-r}Z`;
    }
    return `M0 ${-r} A${r} ${r} 0 0 0 0 ${r} A${rx} ${r} 0 0 ${k > 0 ? 1 : 0} 0 ${-r}Z`;
  }

  function renderMoon(mount) {
    const lv = level().id;
    const wrap = document.createElement('section');
    wrap.className = 'diagram';
    const title = { small: 'おつきさまを うごかして みよう', kid: 'おつきさまを うごかして みよう', adult: '月を動かしてみる' }[lv];
    wrap.setAttribute('aria-label', title);
    wrap.innerHTML = `<p class="diagram-title">${title}</p>
      <div class="moon-row">
        <figure class="moon-fig"><svg class="moon-orbit" viewBox="-100 -80 230 160" role="img"></svg>
          <figcaption>${{ small: 'うえから みた ところ', kid: 'うえから みた ところ', adult: '北の上空から見た位置' }[lv]}</figcaption></figure>
        <figure class="moon-fig"><svg class="moon-look" viewBox="-60 -60 120 120" role="img"></svg>
          <figcaption>${{ small: 'ちきゅうから みた ところ', kid: 'ちきゅうから みた ところ', adult: '地球から見た形' }[lv]}</figcaption></figure>
      </div>
      <div class="turn">
        <button type="button" data-d="-1">${{ small: 'もどる', kid: 'まえの ひ', adult: '前へ' }[lv]}</button>
        <button type="button" data-d="1">${{ small: 'すすむ', kid: 'つぎの ひ', adult: '次へ' }[lv]}</button>
      </div>
      <p class="status" aria-live="polite"></p>`;
    let i = 0;
    const orbit = wrap.querySelector('.moon-orbit');
    const look = wrap.querySelector('.moon-look');
    const status = wrap.querySelector('.status');
    function draw() {
      const s = MOON_STEPS[i];
      const p = s.day / CYCLE;
      const th = 2 * Math.PI * p;
      const R = 52;
      const mx = (Math.cos(th) * R).toFixed(1);
      const my = (-Math.sin(th) * R).toFixed(1);
      const sunLabel = { small: 'おひさま', kid: 'おひさま', adult: '太陽の光' }[lv];
      orbit.setAttribute('aria-label', `${s[lv]}`);
      orbit.innerHTML = `
        <g class="sunrays">${[-36, -12, 12, 36].map(y => `<line x1="128" y1="${y}" x2="84" y2="${y}"/>`).join('')}</g>
        <text class="sun-label" x="106" y="-50" text-anchor="middle">${sunLabel}</text>
        <circle class="orbit" r="${R}"/>
        <circle class="earth" r="13"/>
        <g transform="translate(${mx} ${my})">
          <circle class="moon-dark" r="9"/>
          <path class="moon-lit" d="M0 -9 A9 9 0 0 1 0 9Z"/>
        </g>`;
      look.setAttribute('aria-label', `${s[lv]}`);
      look.innerHTML = `<circle class="moon-dark" r="48"/>${s.day === 0 ? '' : `<path class="moon-lit" d="${moonDiskPath(p, 48)}"/>`}`;
      const dayLine = { small: '', kid: `しんげつから ${s.day}にちめ`, adult: `新月から${s.day}日目` }[lv];
      status.innerHTML = `<strong>${s[lv]}</strong>${dayLine ? `<br>${dayLine}` : ''}`;
    }
    wrap.querySelectorAll('.turn button').forEach(b => b.addEventListener('click', () => {
      i = (i + Number(b.dataset.d) + MOON_STEPS.length) % MOON_STEPS.length;
      draw();
    }));
    draw();
    mount.appendChild(wrap);
  }

  function renderWidget(slug, mount) {
    if (slug === 'moon-phases') return renderMoon(mount);
    const def = WIDGETS[slug];
    if (!def) return;
    const wrap = document.createElement('section');
    wrap.className = 'diagram';
    wrap.setAttribute('aria-label', T(def.title));
    wrap.innerHTML = `<p class="diagram-title">${T(def.title)}</p><div class="switch-row"></div>`;
    const row = wrap.querySelector('.switch-row');
    def.switches.forEach(sw => row.appendChild(buildSwitch(sw)));
    mount.appendChild(wrap);
  }

  function buildSwitch(sw) {
    const lv = level().id;
    const card = document.createElement('div');
    card.className = 'switch-card';
    let pos = 0;
    let held = null; // position to return to while a spring position is held

    const leftLabel = { small: 'ひだりへ', kid: 'ひだりへ', adult: '左へ' }[lv];
    const rightLabel = { small: 'みぎへ', kid: 'みぎへ', adult: '右へ' }[lv];

    card.innerHTML = `
      <div class="switch-name">${T(sw.name)}</div>
      <div class="ks"></div>
      <div class="turn">
        <button type="button" data-dir="-1">${leftLabel}</button>
        <button type="button" data-dir="1">${rightLabel}</button>
      </div>
      <p class="status" aria-live="polite"></p>`;
    const ks = card.querySelector('.ks');
    const status = card.querySelector('.status');
    const [btnL, btnR] = card.querySelectorAll('.turn button');

    function draw() {
      const p = sw.positions[pos];
      ks.innerHTML = keySwitchSvg({
        size: 168,
        labels: sw.positions,
        angle: p.angle,
        litIndex: pos,
        fontSize: sw.fontSize || 18,
        title: `${T(sw.name)}：${p.text}`,
      });
      const removable = sw.removable.includes(held === null ? pos : -1);
      const keyLine = {
        small: removable ? 'かぎ：ぬける' : 'かぎ：ぬけない',
        kid: removable ? 'かぎは ぬける' : 'かぎは ぬけない',
        adult: removable ? '鍵：抜ける' : '鍵：抜けない',
      }[lv];
      status.classList.toggle('live', !!p.spring);
      status.innerHTML = `<strong>${sw.status[lv][pos]}</strong><br>${keyLine}`;
      btnL.disabled = pos === 0 || held !== null;
      const next = sw.positions[pos + 1];
      // While a spring position is held, the right button must stay enabled:
      // disabling it would drop pointer capture and spring the key back at once.
      btnR.disabled = held !== null ? false : !next;
      btnR.classList.toggle('hold', !!(next && next.spring));
      if (next && next.spring) {
        btnR.textContent = { small: 'みぎへ（おさえる）', kid: 'みぎへ（おさえる）', adult: '右へ（押さえる）' }[lv];
      } else {
        btnR.textContent = rightLabel;
      }
    }

    function press(dir) {
      if (held !== null) return;
      const target = pos + dir;
      if (target < 0 || target >= sw.positions.length) return;
      if (sw.positions[target].spring) {
        held = pos;
        pos = target;
      } else {
        pos = target;
      }
      draw();
    }
    function release() {
      if (held === null) return;
      pos = held;
      held = null;
      draw();
    }

    // pointer: press on down, spring back on up
    [btnL, btnR].forEach(btn => {
      const dir = Number(btn.dataset.dir);
      btn.addEventListener('pointerdown', e => {
        if (btn.disabled) return;
        e.preventDefault();
        btn.setPointerCapture?.(e.pointerId);
        press(dir);
      });
      ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(t => btn.addEventListener(t, release));
      btn.addEventListener('keydown', e => {
        if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); press(dir); }
      });
      btn.addEventListener('keyup', e => {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); release(); }
      });
      btn.addEventListener('click', e => e.preventDefault());
      btn.addEventListener('contextmenu', e => e.preventDefault());
    });
    window.addEventListener('blur', release);

    draw();
    return card;
  }

    return renderWidget(slug, mount);
  }

  // trivia that have a diagram (the static build uses this to include this script only where needed)
  const slugs = ['elevator-fire-service-keyswitch', 'car-ignition-key', 'moon-phases'];

  root.AHA_WIDGETS = { render, keySwitchSvg, slugs };
})(window);
