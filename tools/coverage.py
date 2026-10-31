"""How deep is each item? Lists entries, angles and illustrations per item, shallowest first.

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
    history = False
    for _, slug in it['entries']:
        t = open(f'{ROOT}/trivia/{slug}.md', encoding='utf-8').read()
        nfig += (slug in figs) + len(set(re.findall(r'\{\{fig:([a-z0-9-]+)\}\}', t)))
        history = history or bool(re.search(r'\d{4}年', t))
    angles = sorted({a for a, _ in it['entries']})
    has_basic = any(a == 'きほん' for a, _ in it['entries'])
    score = len(it['entries']) * 2 + nfig + has_basic * 2 + history * 2
    rows.append((score, it, angles, nfig, has_basic, history))

rows.sort(key=lambda r: r[0])
n = int(sys.argv[sys.argv.index('-n') + 1]) if '-n' in sys.argv else len(rows)
print('score  item  entries  figs  basic  history  angles')
for score, it, angles, nfig, basic, hist in rows[:n]:
    print(f"{score:>4}  {it['name']} ({it['slug']})  {len(it['entries'])}  {nfig}  {'o' if basic else '-'}  {'o' if hist else '-'}  {' '.join(angles)}")
