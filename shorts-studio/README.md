# Shorts studio

How Claude Code edits my Shorts: I film one phone take, retakes and all, and get a finished 9:16 Short back. One command per video.

## What it does

1. **Transcribe**: Whisper (faster-whisper) writes down every word I say, with timestamps (`transcribe.py`)
2. **Pick the takes**: a script keeps my last try at each line and cuts only the look-aways between lines. Pauses inside a line stay, at real speed, so it stays smooth (`cut_takes.py`, `cut_report.py`)
3. **Build the video**: every scene is React code, built in Remotion and timed to my words. Scenes use real screenshots with highlights that land on the spoken word (`shoot.py`, `src/kit.tsx`, `src/shorts/<slug>/`)
4. **Captions**: karaoke captions light up as I say them, spelled from the script
5. **Check before I see it**: one frame per second is rendered (`frames.mjs`), checked for empty space (`check_frames.py`), and a separate AI agent reviews every frame (`checker_prompt.md`)
6. **Finish**: it levels the sound (voice chain, -14 LUFS, `finalize.py`) and the video lands on my desktop

## Use it

Needs Node 20+, Python 3.10+ with `faster-whisper`, `psutil` and `playwright`, and ffmpeg (on PATH or in `$FFMPEG`).

```
npm install
# 1. write scripts/<slug>.txt (one spoken line per line), record yourself saying it
py make_short.py path/to/face_raw.mp4 <slug> --cut-only     # cut + per-line report + look-away sheets
# 2. screenshots for the scenes: py shoot.py <url> <name> --slug <slug> --find "phrase" (prints highlight boxes)
# 3. write src/shorts/<slug>/index.tsx (scenes + makeShort config) and register it in src/shorts/index.ts
py make_short.py path/to/face_raw.mp4 <slug> --skip-cut --check-only   # 1 frame per second + contact sheet
py make_short.py path/to/face_raw.mp4 <slug> --skip-cut --no-frames    # final render + sound
```

`src/shorts/web-to-api/index.tsx` is a complete example.

## License note

Remotion is free for individuals and companies up to 3 people; above that it needs a company license (see remotion.dev/license). The rest of this folder is MIT.

Built by [Peter Israel](https://peterisrael.com)
