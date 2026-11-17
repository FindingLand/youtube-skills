"""Cut pauses over 0.25 s (0.12 s pads), speed 1.1x, 1080x1920 30 fps.  py cut_any.py raw.mp4 out.mp4 words.json"""
import json, subprocess, sys, psutil
from ffpath import FF
raw, out, wj = sys.argv[1:4]
w = json.load(open(wj)); PAD = 0.12; SPEED = 1.1
segs, start = [], max(0, w[0]["s"] - PAD)
for i in range(len(w) - 1):
    if w[i+1]["s"] - w[i]["e"] > 0.25:
        segs.append((start, w[i]["e"] + PAD)); start = w[i+1]["s"] - PAD
segs.append((start, w[-1]["e"] + 0.4))
f = [f"[0:v]trim={a:.2f}:{b:.2f},setpts=PTS-STARTPTS[v{i}];[0:a]atrim={a:.2f}:{b:.2f},asetpts=PTS-STARTPTS[a{i}]" for i, (a, b) in enumerate(segs)]
f.append("".join(f"[v{i}][a{i}]" for i in range(len(segs))) + f"concat=n={len(segs)}:v=1:a=1[vc][ac]")
f.append(f"[vc]setpts=PTS/{SPEED},scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30[v];[ac]atempo={SPEED}[a]")
p = subprocess.Popen([FF, "-v", "error", "-y", "-threads", "2", "-i", raw, "-filter_complex", ";".join(f), "-map", "[v]", "-map", "[a]",
                      "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-c:a", "aac", "-ar", "48000", "-b:a", "192k", out])
psutil.Process(p.pid).nice(psutil.BELOW_NORMAL_PRIORITY_CLASS); sys.exit(p.wait())
