"""How deep is each item? Lists entries, angles, illustrations and "みてみよう" (look) per item, shallowest first.

bare = adult-side points (a bullet line, a numbered step, or a whole table) with no {{fig:...}} before the next point.
An item is "done" (済) when it has 5+ entries, a きほん and a れきし entry, みてみよう in every entry, and bare == 0
(the granularity of エレベーター). Unfinished items are listed first.

Usage: python3 tools/coverage.py [-n 15]
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
readme = open(f'{ROOT}/README.md', encoding='utf-8').read().split('## 一覧')[1]
figs = set()
for f in os.listdir(f'{ROOT}/assets'):
    if f.startswith('figures-') and f.endswith('.js'):
        figs |= set(re.findall(r"F\['([a-z0-9-]+)'\]", open(f'{ROOT}/assets/{f}', encoding='utf-8').read()))

items, cur = [], None
for line in readme.splitlines():
    m = re.match(r'^#### (.+?) \{([a-z0-9-]+)\}', line)
    if m:
        cur = {'name': m.group(1), 'slug': m.group(2), 'entries': []}
        items.append(cur)
        continue
    m = re.match(r'^- (.+?): \[.+?\]\(trivia/([a-z0-9-]+)\.md\)', line)
    if m and cur:
        cur['entries'].append((m.group(1), m.group(2)))

rows = []
for it in items:
    nfig = 0
    npoints = 0
    history = False
    nlook = 0
    bare = 0
    bare_where = []
    for _, slug in it['entries']:
        t = open(f'{ROOT}/trivia/{slug}.md', encoding='utf-8').read()
        nfig += (slug in figs) + len(set(re.findall(r'\{\{fig:([a-z0-9-]+)\}\}', t)))
        adult = t.split('## 3〜5歳むけ')[0]
        npoints += len(re.findall(r'^\s*(?:[-*]|\d+\.)\s', adult, re.M)) + len(re.findall(r'^\|[^-|]', adult, re.M))
        history = history or bool(re.search(r'\d{4}年', t))
        nlook += '### みてみよう' in adult
        lines = adult.split('\n')
        pts = []
        i = 0
        while i < len(lines):
            if lines[i].startswith('|'):
                j = i
                while j < len(lines) and lines[j].startswith('|'):
                    j += 1
                pts.append((i, j)); i = j; continue
            if re.match(r'^\s*(?:[-*]|\d+\.)\s', lines[i]):
                pts.append((i, i + 1))
            i += 1
        for k, (a, b) in enumerate(pts):
            end = pts[k + 1][0] if k + 1 < len(pts) else len(lines)
            if not re.search(r'\{\{fig:', '\n'.join(lines[b:end])):
                bare += 1
                bare_where.append(f"{slug}:{a + 1}")
    has_hist_entry = any(a == 'れきし' for a, _ in it['entries'])
    angles = sorted({a for a, _ in it['entries']})
    has_basic = any(a == 'きほん' for a, _ in it['entries'])
    score = len(it['entries']) * 2 + nfig - max(0, npoints - nfig) // 2 + has_basic * 2 + history * 2 + has_hist_entry * 3 + nlook - (len(it['entries']) - nlook) // 2
    done = len(it['entries']) >= 5 and has_basic and has_hist_entry and nlook == len(it['entries']) and bare == 0
    rows.append((score, it, angles, nfig, has_basic, has_hist_entry, npoints, nlook, bare, done, bare_where))

rows.sort(key=lambda r: (r[9], r[0]))
n = int(sys.argv[sys.argv.index('-n') + 1]) if '-n' in sys.argv else len(rows)
print('score  item  entries  figs/points  bare  basic  history  look  angles')
for score, it, angles, nfig, basic, hist, pts, look, bare, done, where in rows[:n]:
    print(f"{score:>4}  {'済 ' if done else ''}{it['name']} ({it['slug']})  {len(it['entries'])}  {nfig}/{pts}  {bare}  {'o' if basic else '-'}  {'o' if hist else '-'}  {look}/{len(it['entries'])}  {' '.join(angles)}")
    if '-v' in sys.argv and where:
        print('        絵のない項目: ' + ', '.join(where))
