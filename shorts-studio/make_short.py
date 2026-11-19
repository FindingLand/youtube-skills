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
# Nov 18 2026: every Remotion render/still leaves a remotion-*-assets* folder (~92 MB) in %TEMP%; 1,061 of them had filled
# 67 GB of C:. Stale ones (over 30 min old, so no live render loses its files) are removed before each run.
_tmp = pathlib.Path(os.environ.get("TEMP", "/tmp"))
for d in _tmp.glob("remotion-*"):
    if time.time() - d.stat().st_mtime > 1800: shutil.rmtree(d, ignore_errors=True)

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

# Flags (Nov 18 2026, the per-Short session loop): --skip-cut reuses face_cut.mp4 + words_cut.json (scene iteration only);
# --check-only stops after the check frames + contact sheet (run the checker agent, fix, re-run with --skip-cut);
# --name "04 Pull data from almost any website" = the file name on the Desktop (default: the slug).
skip_cut, check_only = "--skip-cut" in sys.argv, "--check-only" in sys.argv
name = sys.argv[sys.argv.index("--name") + 1] if "--name" in sys.argv else slug
if not skip_cut:
    run("transcribe raw", ["py", str(ROOT / "transcribe.py"), str(raw), str(work / "words.json")], cwd=work)
    run("pick last takes + cut", ["py", str(ROOT / "cut_takes.py"), str(raw), str(work / "words.json"), str(script), str(work / "face_cut.mp4"), str(work / "lines.json")])
    run("transcribe cut", ["py", str(ROOT / "transcribe.py"), str(work / "face_cut.mp4"), str(work / "words_cut.json")], cwd=work)
    # Nov 18 2026 (egm): the cut transcript next to the script, one row per line, OK/CHECK. Read every CHECK before building scenes
    # (05 line 9 lost "hand it to a human"; egm line 8 lost half its words; both looked normal in the take printout)
    subprocess.run(["py", str(ROOT / "cut_report.py"), str(work / "words_cut.json"), str(work / "lines.json"), str(script)])
pub = ROOT / "public" / slug; pub.mkdir(parents=True, exist_ok=True)
shutil.copy(work / "face_cut.mp4", pub / "face.mp4"); shutil.copy(work / "words_cut.json", scenes.parent / "words.json")
# side fill of the face card: a blurred still of the wall above his head (a still, not a 2nd video: that doubled render time)
run("wall still", [FF, "-v", "error", "-y", "-ss", "1", "-i", str(pub / "face.mp4"), "-frames:v", "1", "-vf", "crop=1080:520:0:0,scale=1080:1920,boxblur=30:3", "-q:v", "3", str(pub / "wall.jpg")])
# --cut-only (Nov 18 2026, Short 07): stop after the cut + cut_report + the 5 fps look-away sheets. The first --check-only pass of
# 07 also rendered 351 s of check frames of the PLACEHOLDER draft scenes (useless: the scenes are rebuilt on the cut words), and
# its stale contact sheet was later read by mistake as the new one. Use --cut-only first, build scenes, then --skip-cut --check-only.
if "--cut-only" in sys.argv:
    run("look-away sheets", ["py", str(ROOT / "lookaway.py"), slug])
    print("CUT-ONLY: read the cut_report CHECK rows + D:/Shorts/<slug>/look/sheet_*.png, build scenes, then --skip-cut --check-only")
    [print(f"  {l:<22}{s:>5}s") for l, s in log]; sys.exit(0)
# --no-frames (Nov 18 2026, Short 05): the final pass after the frames were checked; re-rendering all check frames cost ~6 min.
# Fixes inside the loop are spot-checked with `node frames.mjs <slug> out/<dir> 26,29` (a few frames, ~1 min).
if "--no-frames" not in sys.argv:
    frames = ROOT / "out" / f"frames_{slug}"; shutil.rmtree(frames, ignore_errors=True); frames.mkdir(parents=True)
    # Nov 18 2026 (07): a wait loop matched the "check frames" line and read the PREVIOUS run's sheet (rewritten ~12 s later).
    # The old sheet is deleted first; wait for the "contact sheet:" line, never the stage line
    (ROOT / "out" / f"sheet_{slug}.png").unlink(missing_ok=True)
    run("check frames", f"node frames.mjs {slug} out/frames_{slug}")
    run("empty-space check", ["py", "check_frames.py", "--frames-only", str(frames)])
    # contact sheet: every check frame on one image, read it first (whole-Short view in one look)
    from PIL import Image
    fs = sorted(frames.glob("s_*.png")); ims = [Image.open(f).resize((216, 384)) for f in fs]
    sheet = Image.new("RGB", (216 * 8, 384 * ((len(ims) + 7) // 8)), "white")
    for i, im in enumerate(ims): sheet.paste(im, ((i % 8) * 216, (i // 8) * 384))
    sheet.save(ROOT / "out" / f"sheet_{slug}.png"); print("contact sheet:", ROOT / "out" / f"sheet_{slug}.png")
    subprocess.run(["py", str(ROOT / "cut_report.py"), str(work / "words_cut.json"), str(work / "lines.json"), str(script)])
if check_only:
    print("CHECK-ONLY: run the checker agent (checker_prompt.md) on", frames); [print(f"  {l:<22}{s:>5}s") for l, s in log]
    sys.exit(0)
run("full render", f"npx remotion render src/index.ts {slug} out/{slug}.mp4 --concurrency=2 --codec=h264 --crf=18 --log=error")
run("finalize audio", ["py", "finalize.py", f"out/{slug}.mp4", f"out/{slug}_final.mp4"])
dst = pathlib.Path.home() / "Desktop" / "Shorts - final" / f"{name}.mp4"; dst.parent.mkdir(exist_ok=True)
shutil.copy(ROOT / "out" / f"{slug}_final.mp4", dst)
total = round(time.time() - t0)
print(f"DONE {dst}  total {total}s"); [print(f"  {l:<22}{s:>5}s") for l, s in log]
with open(ROOT / "timings.csv", "a", newline="") as f:
    w = csv.writer(f); [w.writerow([datetime.datetime.now().isoformat(timespec="minutes"), slug, l, s]) for l, s in log]
    w.writerow([datetime.datetime.now().isoformat(timespec="minutes"), slug, "TOTAL machine", total])
