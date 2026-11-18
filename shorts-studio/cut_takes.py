"""Cut a raw take with retakes down to one clean pass of the script (Peter's rule, Nov 17 2026:
"say a line went wrong 3 times: the right one is the LAST one; only once a line is complete do I jump to the next").
    py cut_takes.py raw.mp4 words_raw.json script.txt out.mp4 lines.json
How: each script line's attempts are found in the transcript by fuzzy-matching the line's first words (small word changes
are fine). For line i, the chosen take = the LAST attempt that starts before line i+1's first attempt; it runs to the last
spoken word before that. Pauses over 0.25 s inside the chosen takes are cut (0.12 s pads); then 1.1x speed, 1080x1920.
Prints which attempt was used per line, so a wrong pick is visible. Writes lines.json = start time of each line in the cut.
"""
import json, subprocess, sys, re, difflib, psutil
from ffpath import FF
raw, wj, sj, out, lj = sys.argv[1:6]
SPEED, PAD, HEAD = 1.1, 0.12, 3   # HEAD = how many first words identify a line
_n = lambda x: re.sub(r"[^a-z0-9']", "", x.lower())
# Whisper's usual mishearings of our brand words, treated as the right word when MATCHING takes (captions use the Short's FIX map)
ALIAS = {"cloud": "claude", "clod": "claude", "claud": "claude", "clawed": "claude", "emotion": "remotion", "promotion": "remotion",
         # Nov 18 2026 (five-plugins): Whisper writes spoken numbers as digits ("5 Claude plugins") and hears "n8n" as "N810"
         "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "n810": "n8n", "n8": "n8n", "nan": "n8n"}
norm = lambda x: ALIAS.get(_n(x), _n(x))
W = [w for w in json.load(open(wj)) if norm(w["w"])]
raw_lines = [l for l in open(sj, encoding="utf-8").read().splitlines() if l.strip()]
lines = [[norm(x) for x in l.split() if norm(x)] for l in raw_lines]
# each line's sentences (for retakes of a sentence INSIDE a line, Nov 18 2026: "It teaches Claude..." said twice in line 3)
sentences = [[[norm(x) for x in s.split() if norm(x)] for s in re.split(r"(?<=[.!?])\s+", l) if s.strip()] for l in raw_lines]

def sim(a, b): return difflib.SequenceMatcher(None, a, b).ratio()
def score(i, line):
    # matches the line's first words; a dropped first word ("Then") is allowed at a small penalty
    got = " ".join(norm(W[i + k]["w"]) for k in range(HEAD) if i + k < len(W))
    return max(sim(got, " ".join(line[:HEAD])), sim(got, " ".join(line[1:1 + HEAD])) - 0.05)

def find_attempts(line):
    hits = [(i, score(i, line)) for i in range(len(W))]
    hits = [(i, sc) for i, sc in hits if sc >= 0.75]
    if not hits:
        # Fallback (Nov 18 2026: "Even these captions" was heard as "Even discussions"): match the line's NEXT words
        # (words 3-5, then 4-6) and step back to where the line must have started.
        for k in (2, 3):
            if len(line) < k + HEAD: break
            win = " ".join(line[k:k + HEAD])
            for i in range(len(W)):
                got = " ".join(norm(W[i + j]["w"]) for j in range(HEAD) if i + j < len(W))
                if sim(got, win) >= 0.8:
                    # the misheard part may have a different word count: look back for the line's real first word
                    start = next((j for j in range(i - 1, max(-1, i - k - 2), -1)
                                  if difflib.get_close_matches(norm(W[j]["w"]), [line[0]], cutoff=0.8)), max(0, i - k))
                    hits.append((start, sim(got, win) - 0.1))
            if hits:
                print(f"  NOTE: \"{' '.join(line[:HEAD])}\" not heard as written; matched on \"{win}\" instead")
                break
        hits.sort()
    out = []  # neighbouring hits (within HEAD words) are ONE attempt: keep the best-scoring index of each cluster
    for i, sc in hits:
        if out and i - out[-1][0] < HEAD:
            if sc > out[-1][1]: out[-1] = (i, sc)
        else: out.append((i, sc))
    return [i for i, _ in out]

def drop_restarts(a, b, li):
    """Mid-sentence restarts (Nov 18 2026, line 4: "clicks, fields in forms and pulls data from real browsers... /
    Fills in forms and pulls data from sites with no API"): when 3 words repeat inside a take, the earlier try is cut from
    the pause before it to the LAST repeat. A word right before the repeat that Whisper merged ("FieldSync" = "Fills in")
    stays with the kept try."""
    out = []
    while True:
        tri = lambda j: tuple(norm(W[j + k]["w"]) for k in range(3))
        hit = None
        for j in range(a, b - 4):
            ks = [k for k in range(j + 3, b - 1) if tri(k) == tri(j)]
            if ks: hit = (j, ks[-1]); break
        if not hit: return out + [(a, b)]
        j, k = hit
        cut = j
        while cut > a and W[cut]["s"] - W[cut - 1]["e"] <= 0.25: cut -= 1
        if k - 1 > j + 2 and cut < j and norm(W[k - 1]["w"])[:4] == norm(W[cut]["w"])[:4] and W[k]["s"] - W[k - 1]["e"] <= 0.25: k -= 1
        print(f"  line {li+1}: restart \"{' '.join(tri(j))}\" said again, cut \"{' '.join(w['w'] for w in W[cut:k])}\"")
        if cut > a: out.append((a, cut - 1))
        a = k

attempts = [find_attempts(l) for l in lines]
chosen, lo = [], 0
for li, line in enumerate(lines):
    cand = [i for i in attempts[li] if i >= lo]
    if not cand: sys.exit(f"line {li+1} not found in the recording: {' '.join(line[:6])}")
    nxt = [i for i in (attempts[li + 1] if li + 1 < len(lines) else []) if i > cand[0]]
    stop = nxt[0] if nxt else len(W)
    pick = max(i for i in cand if i < stop)
    # Nov 18 2026: "Third, Context 7" matched on "Context 7 Claude" (the dropped-first-word allowance) and "Third" was cut.
    # If the word just before the match IS the line's first word, spoken right before it, the take starts there.
    # Also when Whisper split a word the match keyed on ("Second, play write from Microsoft": the match landed on "write").
    prev_end = chosen[-1][-1][1] if chosen else -1
    for back in (1, 2):
        p = pick - back
        if p > prev_end and difflib.get_close_matches(norm(W[p]["w"]), [line[0]], cutoff=0.8) and W[p + 1]["s"] - W[p]["e"] < 6:  # "Third, [4 s pause] Context 7"; the pause itself is cut below
            pick = p; break
    # take ends at the last word of this attempt that is in this line, before the next line starts
    end = pick
    for j in range(pick, stop):
        if difflib.get_close_matches(norm(W[j]["w"]), line, n=1, cutoff=0.7): end = j
    # Nov 18 2026: "timestamps" was heard as "time sense." and dropped. Words spoken right after the last match, with no pause,
    # are still this line (a misheard ending), so the take runs through them.
    # Not past a full stop: Nov 18 2026 the last line ran on into an unscripted "Thanks for watching."
    while end + 1 < stop and W[end + 1]["s"] - W[end]["e"] < 0.35 and not re.search(r"[.!?]$", W[end]["w"]): end += 1
    # Retakes of a sentence INSIDE the line: keep the line's start, jump to the LAST attempt of each later sentence.
    ranges, cur = [], pick
    for sn in sentences[li][1:]:
        if len(sn) < HEAD: continue
        tries = []
        for j in range(cur + 1, end + 1):
            got = " ".join(norm(W[j + k]["w"]) for k in range(HEAD) if j + k <= end)
            sc = sim(got, " ".join(sn[:HEAD]))
            if sc < 0.8: continue
            if tries and j - tries[-1][0] < HEAD:   # same attempt: keep the best-scoring start ("it... you describe" -> "you")
                if sc > tries[-1][1]: tries[-1] = (j, sc)
            else: tries.append((j, sc))
        tries = [j for j, _ in tries]
        if len(tries) > 1:
            ranges.append((cur, tries[0] - 1)); cur = tries[-1]
            print(f"  line {li+1}: sentence \"{' '.join(sn[:HEAD])}\" said {len(tries)} times, using the last")
    ranges.append((cur, end))
    ranges = [r for a, b in ranges for r in drop_restarts(a, b, li)]
    chosen.append(ranges); lo = stop
    print(f"line {li+1}: {len([i for i in cand if i < stop])} attempt(s), using the last: \"{' / '.join(' '.join(w['w'] for w in W[a:b+1]) for a, b in ranges)}\"")
    # Nov 17 2026: the EGM take started recording late and "Google" (the hook's first word) was never captured. Say so loudly.
    if norm(W[pick]["w"]) != line[0] and not difflib.get_close_matches(norm(W[pick]["w"]), [line[0]], cutoff=0.8):
        print(f"  WARNING line {li+1}: the take starts on \"{W[pick]['w']}\", the script starts on \"{line[0]}\". "
              f"{'Recording started late? ' if li == 0 and W[pick]['s'] < 0.3 else ''}Check this line before trusting the cut.")

# segments: chosen takes, split on pauses > 0.25 s
segs, line_starts, t_cut = [], [], 0.0
# Line edges get a TIGHT pad: between lines Peter looks away to read the script (Nov 18 2026: "I'd like those moments to be cut").
# Inside a line the normal pad keeps breaths natural. EDGE_IN before the first word, EDGE_OUT after the last.
EDGE_IN, EDGE_OUT = 0.04, 0.07
for ranges in chosen:
    line_starts.append(round(t_cut / SPEED, 3))
    for a, b in ranges:  # a dropped sentence retake between ranges is cut like a line edge (tight pads)
        s = max(0, W[a]["s"] - EDGE_IN)
        for k in range(a, b):
            if W[k + 1]["s"] - W[k]["e"] > 0.25:
                segs.append((s, W[k]["e"] + PAD)); t_cut += segs[-1][1] - segs[-1][0]; s = W[k + 1]["s"] - PAD
        segs.append((s, W[b]["e"] + EDGE_OUT)); t_cut += segs[-1][1] - segs[-1][0]
json.dump(line_starts, open(lj, "w"))
f = [f"[0:v]trim={a:.2f}:{b:.2f},setpts=PTS-STARTPTS[v{i}];[0:a]atrim={a:.2f}:{b:.2f},asetpts=PTS-STARTPTS[a{i}]" for i, (a, b) in enumerate(segs)]
f.append("".join(f"[v{i}][a{i}]" for i in range(len(segs))) + f"concat=n={len(segs)}:v=1:a=1[vc][ac]")
# Audio speed-up: env SPEEDUP overrides the filter (default atempo). AUDIO_ONLY=1 writes only the cut audio as WAV (voice A/B tests).
import os
af = os.environ.get("SPEEDUP", f"atempo={SPEED}")
f.append(f"[vc]setpts=PTS/{SPEED},scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30[v];[ac]{af}[a]")
if os.environ.get("AUDIO_ONLY"):
    f.append("[v]nullsink")
    cmd = [FF, "-v", "error", "-y", "-threads", "2", "-i", raw, "-filter_complex", ";".join(f), "-map", "[a]", "-c:a", "pcm_s16le", "-ar", "48000", out]
else:
    cmd = [FF, "-v", "error", "-y", "-threads", "2", "-i", raw, "-filter_complex", ";".join(f), "-map", "[v]", "-map", "[a]",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-c:a", "aac", "-ar", "48000", "-b:a", "192k", out]
p = subprocess.Popen(cmd)
psutil.Process(p.pid).nice(psutil.BELOW_NORMAL_PRIORITY_CLASS); sys.exit(p.wait())
