"""Cut every silence in a face video down to a short breath, judged from the AUDIO, not from Whisper's word times.
    py trim_silence.py in.mp4 out.mp4 [noise_dB=-35] [keep=0.16] [cut_ranges.json]
Why (Peter, Nov 18 2026, Short 03): "There's actually a VERY long gap of silence there ... where I'm looking off camera".
Whisper stretched words over the pauses ("so" lasted 1.24 s), so cut_takes.py, which trusts word times, kept ~16 s of
silence in a 65 s cut. Here ffmpeg silencedetect finds every silence >= 0.3 s and keeps only `keep` seconds of it (half
after the last word, half before the next). Pauses are also where Peter looks away to read, so this removes most look-aways.
Optional cut_ranges.json: extra [start, end] spans (seconds of in.mp4) to drop, e.g. look-away frames found on contact sheets.
No speed change (the input is already the 1.1x cut). Runs BelowNormal on 2 threads (central Law 0).
"""
import json, re, subprocess, sys, psutil
from ffpath import FF
src, out = sys.argv[1], sys.argv[2]
NOISE = float(sys.argv[3]) if len(sys.argv) > 3 else -35
KEEP = float(sys.argv[4]) if len(sys.argv) > 4 else 0.16
extra = json.load(open(sys.argv[5])) if len(sys.argv) > 5 else []
r = subprocess.run([FF, "-hide_banner", "-nostats", "-threads", "2", "-i", src, "-vn", "-af", f"silencedetect=noise={NOISE}dB:d=0.3", "-f", "null", "-"],
                   capture_output=True, text=True)
dur = float(re.search(r"Duration: (\d+):(\d+):([\d.]+)", r.stderr).group(3)) + 60 * int(re.search(r"Duration: (\d+):(\d+)", r.stderr).group(2))
starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", r.stderr)]
ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", r.stderr)]
drop = []
for s, e in zip(starts, ends):
    a = s + KEEP / 2 if s > 0.05 else 0.0          # leading silence: drop it all
    b = e - KEEP / 2 if e < dur - 0.05 else dur      # trailing silence: drop it all
    if b - a > 0.05: drop.append((a, b))
drop += [tuple(x) for x in extra]
drop.sort()
merged = []
for a, b in drop:
    if merged and a <= merged[-1][1]: merged[-1] = (merged[-1][0], max(b, merged[-1][1]))
    else: merged.append((a, b))
keep, t = [], 0.0
for a, b in merged:
    if a > t: keep.append((t, a))
    t = max(t, b)
if t < dur: keep.append((t, dur))
removed = sum(b - a for a, b in merged)
print(f"{len(merged)} cuts, {removed:.1f} s removed, {dur:.1f} s -> {dur - removed:.1f} s")
f = [f"[0:v]trim={a:.3f}:{b:.3f},setpts=PTS-STARTPTS[v{i}];[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS[a{i}]" for i, (a, b) in enumerate(keep)]
f.append("".join(f"[v{i}][a{i}]" for i in range(len(keep))) + f"concat=n={len(keep)}:v=1:a=1[v][a]")
p = subprocess.Popen([FF, "-v", "error", "-y", "-threads", "2", "-i", src, "-filter_complex", ";".join(f), "-map", "[v]", "-map", "[a]",
                      "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-r", "30", "-c:a", "aac", "-ar", "48000", "-b:a", "192k", out])
psutil.Process(p.pid).nice(psutil.BELOW_NORMAL_PRIORITY_CLASS); sys.exit(p.wait())
