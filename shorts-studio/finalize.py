"""Audio finish for a Short: Peter's chosen studio chain + two-pass loudness to -14 LUFS / -1.5 dBTP.
    py finalize.py in.mp4 out.mp4 [--raw]
Voice decisions (Peter, Nov 17 2026): NO denoise (afftdn = "underwater"); NO pitch shift (1-2 semitones = "robotic, a disaster");
"C warmer deeper" chain (Nov 18 2026: warmth, mud cut, presence, de-ess, 4:1 compression) is the default. --raw = loudness only.
"""
import subprocess, sys, json, re
from ffpath import FF
src, dst = sys.argv[1], sys.argv[2]
# Nov 18 2026: Peter picked "C warmer deeper" on Short 04 (A raw / B old chain / C, same -14 LUFS). He could not hear the
# difference ("good = no detection"): EQ moves of 2-4 dB are subtle and phone speakers barely play below 150 Hz. Do not push
# the EQ further (boomy, muffled); the real upgrade is a lav mic close to the mouth. Old chain (B) kept below for A/B tests.
CHAIN_B = ("highpass=f=80,equalizer=f=200:t=q:w=1:g=2,equalizer=f=350:t=q:w=1.2:g=-2,equalizer=f=4000:t=q:w=1.5:g=2,"
           "deesser=i=0.4:m=0.5:f=0.5:s=o,acompressor=threshold=-18dB:ratio=3:attack=10:release=120:makeup=2,alimiter=limit=0.89:level=disabled")
CHAIN = ("highpass=f=75,lowshelf=f=160:g=4,equalizer=f=400:t=q:w=1.2:g=-3,equalizer=f=3500:t=q:w=1.4:g=2.5,highshelf=f=10000:g=-1.5,"
         "deesser=i=0.5:m=0.5:f=0.5:s=o,acompressor=threshold=-20dB:ratio=4:attack=8:release=150:makeup=3,alimiter=limit=0.89:level=disabled")
pre = "" if "--raw" in sys.argv else CHAIN + ","
r = subprocess.run([FF, "-hide_banner", "-nostats", "-threads", "2", "-i", src, "-af", pre + "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True)
m = json.loads(re.search(r"\{[^{}]*\}", r.stderr, re.S).group(0))
af = pre + f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
subprocess.run([FF, "-v", "error", "-y", "-threads", "2", "-i", src, "-c:v", "copy", "-af", af, "-c:a", "aac", "-ar", "48000", "-b:a", "192k", "-movflags", "+faststart", dst], check=True)
print("done", dst)
