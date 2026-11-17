"""One command from Peter's raw face cam to a checked, finished Short, with a timer per stage.
    py make_short.py <face_raw.mp4> <slug>        (pass paths with forward slashes from Git Bash)
<slug> must have: scripts/<slug>.txt (approved script, one line per script line) and src/shorts/<slug>/index.tsx (scenes,
listed in src/shorts/index.ts). Stages: transcribe raw -> pick last take per line + cut pauses + 1.1x -> transcribe cut ->
install into studio (public/<slug>/face.mp4 + wall.jpg, src/shorts/<slug>/words.json) -> 1 check frame per second +
empty-space check -> full render -> finalize (studio chain + loudness) -> Desktop. The checker agent (independent review of
the frames) is run by Claude in parallel with the full render. Timings are appended to timings.csv.
Every heavy step runs at BelowNormal priority on 2 threads (central Law 0).
"""
import subprocess, sys, time, shutil, csv, pathlib, datetime, os, psutil
ROOT = pathlib.Path(__file__).parent
from ffpath import FF
raw, slug = pathlib.Path(sys.argv[1]).resolve(), sys.argv[2]
work = raw.parent
script = ROOT / "scripts" / f"{slug}.txt"
scenes = ROOT / "src" / "shorts" / slug / "index.tsx"
for p in (raw, script, scenes):
    if not p.exists(): sys.exit(f"missing: {p}")
if f"./{slug}" not in (ROOT / "src" / "shorts" / "index.ts").read_text(): sys.exit(f"{slug} is not registered in src/shorts/index.ts")
log, t0 = [], time.time()

def run(label, cmd, cwd=ROOT):
    t = time.time()
    p = subprocess.Popen(cmd, cwd=cwd, shell=isinstance(cmd, str))
    try: psutil.Process(p.pid).nice(psutil.BELOW_NORMAL_PRIORITY_CLASS)
    except Exception: pass
    rc = p.wait()
    secs = round(time.time() - t)
    log.append((label, secs)); print(f"== {label}: {secs}s (rc {rc})", flush=True)
    if rc not in (0, 1) or (rc == 1 and label != "empty-space check"):
        sys.exit(f"stage failed: {label}")

run("transcribe raw", ["py", str(ROOT / "transcribe.py"), str(raw), str(work / "words.json")], cwd=work)
run("pick last takes + cut", ["py", str(ROOT / "cut_takes.py"), str(raw), str(work / "words.json"), str(script), str(work / "face_cut.mp4"), str(work / "lines.json")])
run("transcribe cut", ["py", str(ROOT / "transcribe.py"), str(work / "face_cut.mp4"), str(work / "words_cut.json")], cwd=work)
pub = ROOT / "public" / slug; pub.mkdir(parents=True, exist_ok=True)
shutil.copy(work / "face_cut.mp4", pub / "face.mp4"); shutil.copy(work / "words_cut.json", scenes.parent / "words.json")
# side fill of the face card: a blurred still of the wall above his head (a still, not a 2nd video: that doubled render time)
run("wall still", [FF, "-v", "error", "-y", "-ss", "1", "-i", str(pub / "face.mp4"), "-frames:v", "1", "-vf", "crop=1080:520:0:0,scale=1080:1920,boxblur=30:3", "-q:v", "3", str(pub / "wall.jpg")])
frames = ROOT / "out" / f"frames_{slug}"; shutil.rmtree(frames, ignore_errors=True); frames.mkdir(parents=True)
run("check frames", f"node frames.mjs {slug} out/frames_{slug}")
run("empty-space check", ["py", "check_frames.py", "--frames-only", str(frames)])
run("full render", f"npx remotion render src/index.ts {slug} out/{slug}.mp4 --concurrency=2 --codec=h264 --crf=18 --log=error")
run("finalize audio", ["py", "finalize.py", f"out/{slug}.mp4", f"out/{slug}_final.mp4"])
dst = pathlib.Path.home() / "Desktop" / "Shorts - final" / f"{slug}.mp4"; dst.parent.mkdir(exist_ok=True)
shutil.copy(ROOT / "out" / f"{slug}_final.mp4", dst)
total = round(time.time() - t0)
print(f"\nDONE {dst}  total {total}s"); [print(f"  {l:<22}{s:>5}s") for l, s in log]
with open(ROOT / "timings.csv", "a", newline="") as f:
    w = csv.writer(f); [w.writerow([datetime.datetime.now().isoformat(timespec="minutes"), slug, l, s]) for l, s in log]
    w.writerow([datetime.datetime.now().isoformat(timespec="minutes"), slug, "TOTAL machine", total])
