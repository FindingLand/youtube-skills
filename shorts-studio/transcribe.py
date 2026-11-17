import sys, json, psutil
psutil.Process().nice(psutil.BELOW_NORMAL_PRIORITY_CLASS)
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=2)
segs, _ = m.transcribe(sys.argv[1], word_timestamps=True, language="en")
words = []
for s in segs:
    print(f"[{s.start:6.2f}-{s.end:6.2f}] {s.text}")
    words += [{"w": w.word.strip(), "s": round(w.start, 2), "e": round(w.end, 2)} for w in s.words]
json.dump(words, open(sys.argv[2], "w"), indent=0)
