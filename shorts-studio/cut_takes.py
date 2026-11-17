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
norm = lambda x: re.sub(r"[^a-z0-9']", "", x.lower())
W = [w for w in json.load(open(wj)) if norm(w["w"])]
lines = [[norm(x) for x in l.split() if norm(x)] for l in open(sj, encoding="utf-8").read().splitlines() if l.strip()]

def sim(a, b): return difflib.SequenceMatcher(None, a, b).ratio()
def score(i, line):
    # matches the line's first words; a dropped first word ("Then") is allowed at a small penalty
    got = " ".join(norm(W[i + k]["w"]) for k in range(HEAD) if i + k < len(W))
    return max(sim(got, " ".join(line[:HEAD])), sim(got, " ".join(line[1:1 + HEAD])) - 0.05)

def find_attempts(line):
    hits = [(i, score(i, line)) for i in range(len(W))]
    hits = [(i, sc) for i, sc in hits if sc >= 0.75]
    out = []  # neighbouring hits (within HEAD words) are ONE attempt: keep the best-scoring index of each cluster
    for i, sc in hits:
        if out and i - out[-1][0] < HEAD:
            if sc > out[-1][1]: out[-1] = (i, sc)
        else: out.append((i, sc))
    return [i for i, _ in out]

attempts = [find_attempts(l) for l in lines]
chosen, lo = [], 0
for li, line in enumerate(lines):
    cand = [i for i in attempts[li] if i >= lo]
    if not cand: sys.exit(f"line {li+1} not found in the recording: {' '.join(line[:6])}")
    nxt = [i for i in (attempts[li + 1] if li + 1 < len(lines) else []) if i > cand[0]]
    stop = nxt[0] if nxt else len(W)
    pick = max(i for i in cand if i < stop)
    # take ends at the last word of this attempt that is in this line, before the next line starts
    end = pick
    for j in range(pick, stop):
        if difflib.get_close_matches(norm(W[j]["w"]), line, n=1, cutoff=0.7): end = j
    chosen.append((pick, end)); lo = stop
    print(f"line {li+1}: {len([i for i in cand if i < stop])} attempt(s), using the last: \"{' '.join(w['w'] for w in W[pick:end+1])}\"")

# segments: chosen takes, split on pauses > 0.25 s
segs, line_starts, t_cut = [], [], 0.0
for a, b in chosen:
    line_starts.append(round(t_cut / SPEED, 3))
    s = max(0, W[a]["s"] - PAD)
    for k in range(a, b):
        if W[k + 1]["s"] - W[k]["e"] > 0.25:
            segs.append((s, W[k]["e"] + PAD)); t_cut += segs[-1][1] - segs[-1][0]; s = W[k + 1]["s"] - PAD
    segs.append((s, W[b]["e"] + PAD)); t_cut += segs[-1][1] - segs[-1][0]
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
