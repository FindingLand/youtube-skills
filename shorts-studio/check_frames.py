"""Mechanical frame check for a rendered Short (Peter, Nov 17 2026: "too much white space", "shoulders always on screen").
    py check_frames.py out/video.mp4 out/frames_dir
Extracts 1 frame per second, then for each frame finds the longest run of EMPTY rows (a row is empty when >=95% of its
pixels between x=60..1020 are within +-8 of that row's median colour). Flags runs over 180 px in the content area
(y 150..1250 always; y 150..1900 for frames with the face card). Writes a contact sheet for the checker agent.
Exit 1 if any frame is flagged.
"""
import subprocess, sys, pathlib, psutil
from PIL import Image
import numpy as np
from ffpath import FF
video, out = sys.argv[1], pathlib.Path(sys.argv[2]); out.mkdir(parents=True, exist_ok=True)
if video != "--frames-only":
    for f in out.glob("s_*.png"): f.unlink()
    p = subprocess.Popen([FF, "-v", "error", "-y", "-threads", "2", "-i", video, "-vf", "fps=1", str(out / "s_%03d.png")])
    psutil.Process(p.pid).nice(psutil.BELOW_NORMAL_PRIORITY_CLASS); p.wait()
bad = 0
for f in sorted(out.glob("s_*.png")):
    a = np.asarray(Image.open(f).convert("RGB")).astype(int)[:, 60:1020]
    med = np.median(a, axis=1, keepdims=True)
    empty = (np.abs(a - med).max(axis=2) <= 8).mean(axis=1) >= 0.95
    run, best, start, bstart = 0, 0, 0, 0
    for y in range(150, 1900):
        if empty[y]:
            if run == 0: start = y
            run += 1
            if run > best: best, bstart = run, start
        else: run = 0
    flag = best > 180
    bad += flag
    print(f"{f.name}: longest empty band {best}px at y={bstart}{'  <-- TOO MUCH EMPTY SPACE' if flag else ''}")
p = subprocess.Popen([FF, "-v", "error", "-y", "-threads", "2", "-i", str(out / "s_%03d.png"), "-vf", "scale=200:-1,tile=12x4", "-frames:v", "1", str(out / "sheet.png")])
p.wait()
print("flagged frames:", bad)
sys.exit(1 if bad else 0)
