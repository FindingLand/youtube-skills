# Shorts studio

How I turn one phone take (with retakes) into a finished 9:16 Short with Claude Code. One command per video.

## What it does

1. **Transcribe**: faster-whisper writes down every word with timestamps (`transcribe.py`)
2. **Pick the takes**: for every line of the script, keep my LAST attempt; cut every pause over 0.25 s; speed up 1.1x (`cut_takes.py`)
3. **Build the video**: every scene and the karaoke captions are React components rendered with [Remotion](https://www.remotion.dev). Scenes are anchored to the first words of a script line, so a new recording re-times itself (`src/kit.tsx`, `src/shorts/<slug>/`)
4. **Check before anyone sees it**: one frame per second is rendered (`frames.mjs`) and checked for empty space (`check_frames.py`); Claude also runs an independent checker agent on the same frames
5. **Finish**: full render, light voice chain (EQ, de-ess, gentle compression, no denoise) and loudness to -14 LUFS (`finalize.py`)

## Use it

Needs Node 20+, Python 3.10+ with `faster-whisper` and `psutil`, and ffmpeg (on PATH or in `$FFMPEG`).

```
npm install
# 1. write scripts/<slug>.txt (one spoken line per line)
# 2. py placeholder.py <slug>    -> fake timings so you can build scenes before recording
# 3. write src/shorts/<slug>/index.tsx (scenes + makeShort config) and register it in src/shorts/index.ts
# 4. record, then:
py make_short.py path/to/face_raw.mp4 <slug>
```

`src/shorts/egm/index.tsx` is a complete example.

## License note

Remotion is free for individuals and companies up to 3 people; above that it needs a company license (see remotion.dev/license). The rest of this folder is MIT.

Built by [Peter Israel](https://peterisrael.com)
