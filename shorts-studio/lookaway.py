"""Look-away sheets for a cut Short (shorts-guide 3h/3i): the face at 5 fps, 30 tiles per sheet (6 s), each tile stamped with
its time in the CUT video, so eyes-down / hand-at-face moments can be read in a few images and covered with FULL spans.
    py lookaway.py <slug> [--box x,y,w,h] [--fps 5]
Reads public/<slug>/face.mp4, writes D:/Shorts/<slug>/look/sheet_NN.png. --box is the face area in SOURCE pixels (default
160,1000,760,460 = a close take with the hair top near y 850; measure once on a frame). Built Nov 18 2026 (Short 07): the
ffmpeg drawtext route crashed on this PC (no fontconfig), so tiles and labels are drawn with PIL. Light job: one ffmpeg
process on 2 threads, BelowNormal priority.
"""
import sys, argparse, pathlib, subprocess, tempfile, glob, os
import psutil
from PIL import Image, ImageDraw, ImageFont
from ffpath import FF as FFMPEG

psutil.Process().nice(psutil.BELOW_NORMAL_PRIORITY_CLASS)
ap = argparse.ArgumentParser()
ap.add_argument("slug"); ap.add_argument("--box", default="160,1000,760,460"); ap.add_argument("--fps", type=float, default=5)
a = ap.parse_args()
x, y, w, h = map(int, a.box.split(","))
src = pathlib.Path(__file__).parent / "public" / a.slug / "face.mp4"
out = pathlib.Path(f"D:/Shorts/{a.slug}/look"); out.mkdir(parents=True, exist_ok=True)
for f in out.glob("sheet_*.png"): f.unlink()
TW, TH = 228, round(228 * h / w)
with tempfile.TemporaryDirectory() as tmp:
    subprocess.run([FFMPEG, "-v", "error", "-y", "-i", str(src), "-vf", f"fps={a.fps},crop={w}:{h}:{x}:{y},scale={TW}:{TH}",
                    "-threads", "2", os.path.join(tmp, "f_%05d.png")], check=True)
    frames = sorted(glob.glob(os.path.join(tmp, "f_*.png")))
    font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 20)
    COLS, ROWS = 5, 6
    for si in range(0, len(frames), COLS * ROWS):
        sheet = Image.new("RGB", (COLS * TW, ROWS * TH), "black")
        for j, f in enumerate(frames[si:si + COLS * ROWS]):
            t = (si + j) / a.fps
            im = Image.open(f); dr = ImageDraw.Draw(im)
            lab = f"{t:5.1f}s"; dr.rectangle((0, 0, 70, 24), fill="black"); dr.text((4, 1), lab, fill="yellow", font=font)
            sheet.paste(im, ((j % COLS) * TW, (j // COLS) * TH))
        p = out / f"sheet_{si // (COLS * ROWS) + 1:02d}.png"; sheet.save(p); print(p)
