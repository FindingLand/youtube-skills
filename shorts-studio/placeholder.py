"""Set up a NEW Short before Peter records it, so its scenes can be built and frame-checked today.
    py placeholder.py <slug>
Reads scripts/<slug>.txt and writes src/shorts/<slug>/words.json with FAKE timings (Peter's measured pace: ~2.9 words/s after
the 1.1x cut, 0.15 s between lines), and copies the EGM face video + wall still into public/<slug>/ as a stand-in.
make_short.py overwrites all three with the real recording, and the scenes re-time themselves (they are anchored to words).
"""
import json, pathlib, shutil, sys
ROOT = pathlib.Path(__file__).parent
slug = sys.argv[1]
lines = [l.strip() for l in (ROOT / "scripts" / f"{slug}.txt").read_text(encoding="utf-8").splitlines() if l.strip()]
words, t = [], 0.0
for line in lines:
    for w in line.split():
        d = 0.18 + 0.035 * len(w)
        words.append({"w": w, "s": round(t, 2), "e": round(t + d, 2)}); t += d + 0.03
    t += 0.15
d = ROOT / "src" / "shorts" / slug; d.mkdir(parents=True, exist_ok=True)
json.dump(words, open(d / "words.json", "w"), indent=0)
pub = ROOT / "public" / slug; pub.mkdir(parents=True, exist_ok=True)
for f in ("face.mp4", "wall.jpg"):
    if not (pub / f).exists(): shutil.copy(ROOT / "public" / "egm" / f, pub / f)
print(f"{slug}: {len(words)} words, {t:.1f} s placeholder timeline")
