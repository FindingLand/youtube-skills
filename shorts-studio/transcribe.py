import sys, json, psutil
psutil.Process().nice(psutil.BELOW_NORMAL_PRIORITY_CLASS)
from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=2)
# condition_on_previous_text=False (Nov 18 2026): with it on, Whisper skipped a whole retake ("Fills in forms and pulls data
# from sites with no API", 5 s of speech) because repeated text looks like a loop to it, and mistimed the next word by 4 s
# vad_filter=True (Nov 18 2026, web-to-api): with Peter's read-look-pause habit the take has 5-15 s silences; without VAD
# Whisper placed "There's two catches" (spoken at 115 s) at 127 s, inside silence, so the cut would have lost the line.
segs, _ = m.transcribe(sys.argv[1], word_timestamps=True, language="en", condition_on_previous_text=False,
                       vad_filter=True, vad_parameters={"min_silence_duration_ms": 500, "speech_pad_ms": 200})
words = []
for s in segs:
    print(f"[{s.start:6.2f}-{s.end:6.2f}] {s.text}")
    words += [{"w": w.word.strip(), "s": round(w.start, 2), "e": round(w.end, 2)} for w in s.words]
json.dump(words, open(sys.argv[2], "w"), indent=0)
