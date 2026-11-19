"""Cut transcript vs script, line by line (shorts-guide 3g/3h, Nov 18 2026).
    py cut_report.py <words_cut.json> <lines.json> <scripts/slug.txt>
lines.json = each script line's start time in the CUT video (written by cut_takes.py).
Words are assigned to a line from 0.4 s before its start: the re-transcribed cut stamps a line's first word up to ~0.3 s early. For every line it prints the script line,
what the cut actually says in that span, a match % and a marker:
  OK    the cut says the line (>= 80% word match, last scripted word present)
  CHECK the match is low or the line's last word is missing (05 line 9 ended on a false start, egm line 8 lost half the line)
Why: in Short 05 the take printout said "1 attempt" and looked normal; only the cut transcript showed the line had lost
"hand it to a human". In egm (Nov 18) the restart check cut "So the bugs ... not in your code" because the script itself says
"where they cost" twice. Reading this table takes 10 s and catches both.
"""
import json, re, sys, difflib
wj, lj, sj = sys.argv[1:4]
n = lambda x: re.sub(r"[^a-z0-9']", "", x.lower())
W = json.load(open(wj))
starts = json.load(open(lj))
lines = [l for l in open(sj, encoding="utf-8").read().splitlines() if l.strip()]
bad = 0
for i, line in enumerate(lines):
    a = starts[i] if i < len(starts) else 1e9
    b = starts[i + 1] if i + 1 < len(starts) else 1e9
    got = [w["w"] for w in W if a - 0.4 <= w["s"] < b - 0.4]
    sw, gw = [n(x) for x in line.split() if n(x)], [n(x) for x in got if n(x)]
    r = difflib.SequenceMatcher(None, sw, gw).ratio()
    last_ok = bool(sw) and any(difflib.get_close_matches(sw[-1], gw[-4:], cutoff=0.7))
    flag = "OK   " if r >= 0.8 and last_ok else "CHECK"
    bad += flag == "CHECK"
    print(f"{flag} {i+1:>2} {r:4.0%}  script: {line}\n{'':13}cut:    {' '.join(got)}")
print(f"\n{len(lines) - bad}/{len(lines)} lines OK" + ("" if not bad else f"; {bad} to CHECK: read those lines (the first line may just be a late start)"))
