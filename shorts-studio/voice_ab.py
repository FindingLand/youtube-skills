"""Voice A/B test: the same cut with different speed-up / channel treatments, each finished with finalize.py.
    py voice_ab.py <video folder with face_raw.mp4 + words.json> <finished short.mp4>
Writes <folder>/ab/N_name.mp4 (video of the finished Short + that audio) so Peter compares by ear on the PC.
Why (Nov 17 2026): Peter hears a "weird acoustic, a bit underwater" on some parts only, with no denoise in the chain.
Suspects: atempo (WSOLA) artifacts from the 1.1x speed-up, or the phone's own processing. Variant 4 has no speed-up at all:
if the sound is also there, it is in the recording (phone), not in our edit.
"""
import os, subprocess, sys, pathlib
ROOT = pathlib.Path(__file__).parent
from ffpath import FF
work, short = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
ab = work / "ab"; ab.mkdir(exist_ok=True)
RB = "rubberband=tempo=1.1:pitchq=quality:formant=preserved:channels=together"
VARIANTS = [
    ("1_now_atempo", "atempo=1.1"),
    ("2_rubberband", RB),
    ("3_rubberband_one_mic", "pan=mono|c0=c0," + RB),
    ("4_no_speedup_check", "anull"),
]
for name, speed in VARIANTS:
    wav = ab / f"{name}.wav"
    env = dict(os.environ, SPEEDUP=speed, AUDIO_ONLY="1")
    subprocess.run(["py", str(ROOT / "cut_takes.py"), str(work / "face_raw.mp4"), str(work / "words.json"), str(ROOT / "script.txt"),
                    str(wav), str(ab / "lines_tmp.json")], env=env, check=True, stdout=subprocess.DEVNULL)
    mux = ab / f"{name}_mux.mp4"
    if name.startswith("4_"):   # different length: audio only
        subprocess.run([FF, "-v", "error", "-y", "-i", str(wav), "-c:a", "aac", "-b:a", "192k", str(mux)], check=True)
    else:
        subprocess.run([FF, "-v", "error", "-y", "-i", str(short), "-i", str(wav), "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                        "-c:a", "aac", "-b:a", "256k", "-shortest", str(mux)], check=True)
    subprocess.run(["py", str(ROOT / "finalize.py"), str(mux), str(ab / f"{name}.mp4")], check=True)
    mux.unlink(); wav.unlink()
    print("made", ab / f"{name}.mp4", flush=True)
(ab / "lines_tmp.json").unlink(missing_ok=True)
