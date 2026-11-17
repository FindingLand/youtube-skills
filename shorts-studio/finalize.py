"""Audio finish for a Short: Peter's chosen studio chain + two-pass loudness to -14 LUFS / -1.5 dBTP.
    py finalize.py in.mp4 out.mp4 [--raw]
Voice decisions (Peter, Nov 17 2026): NO denoise (afftdn = "underwater"); NO pitch shift (1-2 semitones = "robotic, a disaster");
sample 1 "studio chain" (warmth, de-ess, gentle compression) beats the raw voice and is the default. --raw = loudness only.
"""
import subprocess, sys, json, re
from ffpath import FF
src, dst = sys.argv[1], sys.argv[2]
CHAIN = ("highpass=f=80,equalizer=f=200:t=q:w=1:g=2,equalizer=f=350:t=q:w=1.2:g=-2,equalizer=f=4000:t=q:w=1.5:g=2,"
         "deesser=i=0.4:m=0.5:f=0.5:s=o,acompressor=threshold=-18dB:ratio=3:attack=10:release=120:makeup=2,alimiter=limit=0.89:level=disabled")
pre = "" if "--raw" in sys.argv else CHAIN + ","
r = subprocess.run([FF, "-hide_banner", "-nostats", "-threads", "2", "-i", src, "-af", pre + "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True)
m = json.loads(re.search(r"\{[^{}]*\}", r.stderr, re.S).group(0))
af = pre + f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
subprocess.run([FF, "-v", "error", "-y", "-threads", "2", "-i", src, "-c:v", "copy", "-af", af, "-c:a", "aac", "-ar", "48000", "-b:a", "192k", "-movflags", "+faststart", dst], check=True)
print("done", dst)
