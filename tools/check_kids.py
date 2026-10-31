"""Mechanical checks for the kid sections, per WRITING.md."""
import re, glob, sys
ROOT = __import__('os').path.dirname(__import__('os').path.dirname(__import__('os').path.abspath(__file__)))
KANA = re.compile(r'[^぀-ヿ　-〿！-／？～\s「」、。！？…ー（）\-]')
fail = 0
missing = []
for f in sorted(glob.glob(ROOT + '/trivia/*.md')):
    t = open(f, encoding='utf-8').read()
    name = f.split('/')[-1]
    secs = dict(re.findall(r'^## (.+?)\n(.*?)(?=^## |\Z)', t, re.M | re.S))
    s, k = secs.get('3〜5歳むけ'), secs.get('6〜9歳むけ')
    FIG = re.compile(r'^\{\{fig:[a-z0-9-]+\}\}$', re.M)
    s = s and FIG.sub('', s); k = k and FIG.sub('', k)
    kt = re.search(r'^kidtitle:\s*(.+)$', t, re.M)
    if not s or not k:
        missing.append(name); continue
    if not kt:
        print(name, 'no kidtitle'); fail += 1
    elif KANA.findall(kt.group(1)):
        print(name, 'kidtitle non-kana', set(KANA.findall(kt.group(1)))); fail += 1
    bad = KANA.findall(s)
    if bad: print(name, '3歳 non-kana', set(bad)); fail += 1
    if re.search(r'[A-Za-z%％]', k): print(name, '6歳 latin/%', re.findall(r'[A-Za-z%％]+', k)); fail += 1
    if re.search(r'[0-9０-９]', s): print(name, '3歳 digits'); fail += 1
    for lab, txt, lim in (('3歳', s, 30), ('6歳', k, 40)):
        for x in re.split(r'[。！？\n]', txt):
            n = len(x.replace(' ', '').replace('-', '').strip())
            if n > lim: print(name, lab, n, x.strip()[:34]); fail += 1
print('without kid sections:', len(missing), missing if '-v' in sys.argv else '')
print('fail', fail)
