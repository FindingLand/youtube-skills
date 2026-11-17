// Short 02 (Nov 17 2026): "Claude Code Edited This Entire Short". Scenes anchored to scripts/claude-edits.txt.
// Plan + facts table: findingland-all/client-memories/finding-land-internal/youtube/shorts/02-claude-edited-this-short/plan.md
// Everything on screen is the real pipeline in this folder (make_short.py, cut_takes.py, transcribe.py, finalize.py,
// frames.mjs, check_frames.py) and the real numbers in timings.csv (run egm_final, Nov 17 2026).
import React from "react";
import {interpolate} from "remotion";
import {Card, Mono, Pill, Icon, Logo, Cursor, typed, pop, EndCard, makeShort, SANS, SERIF, MONO, BLUE, INK, GREY, OK, BAD, TOP, H, HOOK_TOP, HOOK_H, W} from "../../kit";
import words from "./words.json";

const WORDS = words as W[];
const CLAUDE = "#D97757";
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

// 1. "Claude Code edited this entire Short." The one command that makes this Short
const S1Hook: React.FC<{d: number}> = ({d}) => {
  const cmd = "py make_short.py face_raw.mp4 claude-edits";
  const steps: [string, string][] = [["● transcribe raw", "#5BD68A"], ["● pick last takes + cut", "#5BD68A"], ["● full render", "#5BD68A"], ["● Desktop/Shorts - final/claude-edits.mp4", "#FFD479"]];
  return (
    <Card dark top={HOOK_TOP} h={HOOK_H} d={d} title="Claude Code · ~/shorts-studio">
      <div style={{display: "flex", alignItems: "center", gap: 14}}><Logo src="claude-icon.svg" size={40} /><Mono c="#8A8A8A" size={30}>Claude Code</Mono></div>
      <Mono c="#fff" size={34}>{"> " + typed(cmd, d, 0, 160)}{d < 8 && <Cursor d={d} />}</Mono>
      {steps.map(([t, c], i) => d > 7 + i * 2 && <Mono key={t} c={c} size={34}>{"  " + t}</Mono>)}
    </Card>
  );
};

// 2. "I filmed it on my phone in one take, retakes and all." Line 5 of Short 01 had 4 attempts, the last one was kept
const S2Phone: React.FC<{d: number}> = ({d}) => {
  const k = pop(d, 2);
  const chip = (i: number) => {
    const kept = i === 3;
    const on = pop(d, 8 + i * 8);
    const struck = !kept && d > 14 + i * 8;
    return (
      <div key={i} style={{padding: "10px 20px", borderRadius: 14, fontFamily: SANS, fontWeight: 800, fontSize: 40, opacity: on, transform: `scale(${0.85 + 0.15 * on})`,
        border: `3px solid ${kept ? BLUE : struck ? BAD : "#C9CFD6"}`, background: kept ? BLUE : "#F4F6F9", color: kept ? "#fff" : struck ? "#A0A6AD" : INK,
        textDecoration: struck ? `line-through ${BAD} 5px` : "none"}}>
        {kept ? "try 4 · kept" : `try ${i + 1}`}
      </div>
    );
  };
  return (
    <Card top={HOOK_TOP} h={HOOK_H} d={d} title="face_raw.mp4">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{display: "flex", alignItems: "center", gap: 26, opacity: k, transform: `scale(${0.9 + 0.1 * k})`, transformOrigin: "left center"}}>
          <Logo src="phone_flat.svg" size={130} />
          <div>
            <div style={{fontSize: 84, fontWeight: 800, letterSpacing: -2, lineHeight: 1}}>1 phone <span style={{fontFamily: SERIF, fontStyle: "italic", color: BLUE}}>take</span></div>
            <div style={{fontSize: 38, fontWeight: 600, color: "#59636E", marginTop: 10}}>retakes and all</div>
          </div>
        </div>
        <div style={{marginTop: 34, display: "flex", gap: 14}}>{[0, 1, 2, 3].map(chip)}</div>
      </div>
    </Card>
  );
};

// 3. "Whisper writes down every word I say, with timestamps." The real first rows of this Short's words.json
const S3Words: React.FC<{d: number}> = ({d}) => {
  const rows = WORDS.slice(0, 5).map((x) => [x.w.replace(/[.,!?]$/, ""), x.s.toFixed(2), x.e.toFixed(2)]);
  const shown = Math.floor(interpolate(d, [2, 20], [0, rows.length], clamp));
  const tag = (t: string, at: number) => <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 38, color: "#fff", background: BAD, padding: "8px 18px", borderRadius: 10, opacity: pop(d, at), transform: `scale(${0.85 + 0.15 * pop(d, at)})`}}>{t}</div>;
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.14} title="transcribe.py">
      <Mono c="#8A8A8A" size={30}>faster-whisper · word_timestamps=True</Mono>
      <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 64, color: "#fff", letterSpacing: -1, marginTop: 4}}>words.json</div>
      <div style={{marginTop: 14, padding: "10px 16px", borderRadius: 12, background: "#111", border: "1px solid #2A2A2A"}}>
        {rows.slice(0, shown).map(([w, a, b], i) => (
          <div key={i} style={{fontFamily: MONO, fontSize: 36, lineHeight: 1.5, color: "#E6E6E6", whiteSpace: "pre"}}>
            {`{"w": `}<span style={{color: "#FFD479"}}>{`"${w}"`}</span>{", "}
            <span style={{outline: i === 0 && d > 26 ? `3px solid ${BAD}` : "none", borderRadius: 4}}>{`"s": `}<span style={{color: "#7AB8FF"}}>{a}</span></span>
            {", "}
            <span style={{outline: i === 0 && d > 40 ? `3px solid ${BAD}` : "none", borderRadius: 4}}>{`"e": `}<span style={{color: "#7AB8FF"}}>{b}</span></span>{"}"}
          </div>
        ))}
      </div>
      <div style={{display: "flex", gap: 14, marginTop: 16}}>{tag("s = start time", 26)}{tag("e = end time", 40)}</div>
    </Card>
  );
};

// 4. "Then a script keeps my last try at each line." cut_takes.py prints "line N: K attempt(s), using the last"
const S4Cut: React.FC<{d: number}> = ({d}) => {
  const out: [string, string, number][] = [["line 5: 4 attempt(s),", "#E6E6E6", 12], ["  using the last", "#5BD68A", 16], ["line 6: 2 attempt(s),", "#E6E6E6", 22], ["  using the last", "#5BD68A", 26]];
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.2} title="Terminal · ~/shorts-studio">
      <div style={{display: "flex", alignItems: "center", gap: 14}}><Logo src="python.svg" size={48} /><Mono c="#8A8A8A" size={32}>cut_takes.py</Mono></div>
      <Mono c="#fff" size={56}>{"> " + typed("py cut_takes.py", d, 0, 50)}{d < 10 && <Cursor d={d} />}</Mono>
      {out.map(([t, c, at], i) => d > at && <Mono key={i} c={c} size={44}>{t}</Mono>)}
      <Pill ok text="last try of each line kept" d={d} at={34} />
    </Card>
  );
};

// 5. "It cuts every pause longer than a quarter second, and speeds me up ten percent." SPEED = 1.1, pauses > 0.25 s
const S5Pauses: React.FC<{d: number}> = ({d}) => {
  const gap = interpolate(d, [6, 20], [52, 0], clamp);
  const chunks = [0, 1, 2, 3];
  const badge = (big: string, sub: string, at: number) => {
    const k = pop(d, at);
    return (
      <div style={{flex: 1, borderRadius: 22, background: "#E7F1FF", border: "2px solid #C7DDFB", padding: "26px 10px", textAlign: "center", opacity: k, transform: `scale(${0.85 + 0.15 * k})`, filter: `blur(${(1 - k) * 8}px)`}}>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 118, color: BLUE, lineHeight: 1.05}}>{big}</div>
        <div style={{fontFamily: SANS, fontWeight: 700, fontSize: 40, color: "#3B434C", marginTop: 6}}>{sub}</div>
      </div>
    );
  };
  return (
    <Card top={TOP} h={H} d={d} title="cut_takes.py">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{fontSize: 30, color: "#59636E", fontWeight: 500}}>My voice, before and after</div>
        <div style={{fontSize: 62, fontWeight: 800, letterSpacing: -1.5}}>Pauses <span style={{fontFamily: SERIF, fontStyle: "italic", color: BAD}}>gone</span></div>
        <div style={{marginTop: 20, height: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6F9", borderRadius: 18, border: "1px solid #E1E5EA"}}>
          {chunks.map((c) => (
            <React.Fragment key={c}>
              <div style={{display: "flex", alignItems: "center", gap: 5}}>
                {Array.from({length: 11}).map((_, i) => (
                  <div key={i} style={{width: 12, borderRadius: 6, background: BLUE, height: 30 + Math.abs(Math.sin((c * 11 + i) * 1.7)) * 100}} />
                ))}
              </div>
              {c < 3 && <div style={{width: gap, height: 110, margin: `0 ${gap > 1 ? 6 : 2}px`, borderRadius: 8, background: `repeating-linear-gradient(90deg, #D5DAE0 0 6px, transparent 6px 12px)`, opacity: gap / 52}} />}
            </React.Fragment>
          ))}
        </div>
        <div style={{marginTop: 26, display: "flex", gap: 24}}>
          {badge("0.25 s", "longer pauses: cut", 12)}
          {badge("1.1x", "speed", 70)}
        </div>
      </div>
    </Card>
  );
};

// 6. "Every scene you see is React code, built in Remotion and timed to my words." This very file's anchors
const S6Code: React.FC<{d: number}> = ({d}) => {
  const code = `anchors: [
  ["claude code edited", S1Hook],
  ["i filmed", S2Phone],
  ["whisper writes", S3Words],
  ["then a script", S4Cut],
  ["it cuts", S5Pauses],`;
  const t = typed(code, d, 0, 140);
  const lines = t.split("\n");
  const mark = d > 34;
  const A = '"claude code edited"';
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.22} title="src/shorts/claude-edits/index.tsx">
      <div style={{display: "flex", alignItems: "center", gap: 16, marginBottom: 6}}>
        <Logo src="react.svg" size={50} />
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 40, color: "#fff"}}>React <span style={{color: "#8A8A8A"}}>+</span> Remotion</div>
      </div>
      {lines.map((l, i) => (
        <div key={i} style={{fontFamily: MONO, fontSize: 36, lineHeight: 1.45, color: "#E6E6E6", whiteSpace: "pre"}}>
          {i === 1 && l.includes(A) ? (
            <>{"  ["}<span style={{color: "#FFD479", outline: mark ? `3px solid ${BAD}` : "none", borderRadius: 4}}>{A}</span>{l.slice(l.indexOf(A) + A.length)}</>
          ) : l}
          {i === lines.length - 1 && d < 34 && <Cursor d={d} />}
        </div>
      ))}
      {mark && <div style={{marginTop: 10, fontFamily: SANS, fontWeight: 800, fontSize: 36, color: "#fff", background: BAD, display: "inline-block", padding: "6px 16px", borderRadius: 8, opacity: pop(d, 34)}}>↑ scene starts on this word</div>}
    </Card>
  );
};

// 7. "Even these captions light up as I say them." Same rule as the real captions: grey until said, then ink, keyword blue
const S7Captions: React.FC<{d: number}> = ({d}) => {
  const demo = ["Even", "these", "captions", "light", "up"];
  const cap = WORDS.find((x) => x.w.toLowerCase().startsWith("captions"));
  const chip = (dot: string, label: string, at: number) => (
    <div style={{display: "flex", alignItems: "center", gap: 12, padding: "10px 18px", borderRadius: 14, border: "2px solid #E1E5EA", background: "#F4F6F9", opacity: pop(d, at), fontSize: 34, fontWeight: 700, color: "#3B434C"}}>
      <div style={{width: 26, height: 26, borderRadius: 13, background: dot}} />{label}
    </div>
  );
  return (
    <Card top={TOP} h={H} d={d} fill={1.05} title="kit.tsx · Captions">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{fontSize: 34, color: "#59636E", fontWeight: 600}}>Karaoke captions, from my real word times</div>
        <div style={{marginTop: 14, fontSize: 104, fontWeight: 800, letterSpacing: -2, lineHeight: 1.1, display: "flex", flexWrap: "wrap", columnGap: 26}}>
          {demo.map((w, i) => {
            const said = d > 4 + i * 6;
            const key = w === "captions";
            return <span key={w} style={{color: !said ? GREY : key ? BLUE : INK, fontFamily: key ? SERIF : SANS, fontStyle: key ? "italic" : "normal"}}>{w}</span>;
          })}
        </div>
        <div style={{marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap"}}>
          {chip(GREY, "not said yet", 2)}{chip(INK, "said", 6)}{chip(BLUE, "keyword", 10)}
        </div>
        {cap && <div style={{marginTop: 26, opacity: pop(d, 12)}}><Mono c="#3B434C" size={36}>{`"captions" lights up at ${cap.s.toFixed(2)} s`}</Mono></div>}
      </div>
    </Card>
  );
};

// 8. "Before I see anything, a separate AI agent reviews one frame per second." frames.mjs renders s_001.png, s_002.png...
const S8Frames: React.FC<{d: number}> = ({d}) => {
  const scan = d < 4 ? 0 : (((d - 4) % 44) / 44) * 100;
  const tile = (i: number) => {
    const k = pop(d, i * 2);
    return (
      <div key={i} style={{position: "relative", width: 136, height: 242, borderRadius: 12, overflow: "hidden", border: "2px solid #D1D9E0",
        background: "linear-gradient(160deg,#F3F4F1,#DFECF2)", opacity: k, transform: `scale(${0.85 + 0.15 * k})`}}>
        <div style={{position: "absolute", left: 10, right: 10, top: 16, height: 80, borderRadius: 6, background: i % 3 === 1 ? "#1A1A1A" : "#fff", border: `2px solid ${BLUE}`}} />
        <div style={{position: "absolute", left: 24, right: 24, top: 108, height: 10, borderRadius: 5, background: INK}} />
        <div style={{position: "absolute", left: 8, right: 8, top: 132, bottom: -10, borderRadius: 14, background: "#B9C2C9"}} />
        <div style={{position: "absolute", left: 46, top: 150, width: 44, height: 44, borderRadius: 22, background: "#8C969F"}} />
        <div style={{position: "absolute", left: 0, right: 0, bottom: 6, textAlign: "center", fontFamily: MONO, fontSize: 20, color: "#fff", fontWeight: 700}}>{`s_${String(i + 1).padStart(3, "0")}`}</div>
      </div>
    );
  };
  const stamp = (row: number, at: number) => {
    const k = pop(d, at);
    return <div style={{position: "absolute", right: 10, top: row * 256 + 80, padding: "6px 20px", border: `5px solid ${OK}`, borderRadius: 12, background: "#EAF7EEee",
      color: OK, fontFamily: SANS, fontWeight: 900, fontSize: 54, letterSpacing: 2, opacity: k, transform: `rotate(-8deg) scale(${1.4 - 0.4 * k})`}}>PASS</div>;
  };
  return (
    <Card top={TOP} h={H} d={d} title="frames.mjs · check_frames.py">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{display: "flex", alignItems: "center", gap: 16}}>
          <Logo src="robot_flat.svg" size={64} />
          <div style={{fontSize: 52, fontWeight: 800, letterSpacing: -1}}>1 frame <span style={{fontFamily: SERIF, fontStyle: "italic", color: BLUE}}>per second</span></div>
        </div>
        <div style={{position: "relative", marginTop: 18}}>
          <div style={{display: "flex", flexWrap: "wrap", gap: 14}}>{Array.from({length: 12}).map((_, i) => tile(i))}</div>
          <div style={{position: "absolute", left: -10, right: -10, top: `${scan}%`, height: 6, background: BLUE, boxShadow: `0 0 18px ${BLUE}`, opacity: scan < 100 ? 1 : 0}} />
          {stamp(0, 26)}{stamp(1, 46)}
        </div>
      </div>
    </Card>
  );
};

// 9. "It levels the sound, and the video lands on my desktop." finalize.py loudnorm I=-14; make_short.py copies to Desktop
const S9Audio: React.FC<{d: number}> = ({d}) => {
  const lvl = -14 + Math.sin(d / 3) * 9 * Math.max(0, 1 - d / 36);
  const pct = interpolate(lvl, [-30, 0], [0, 100], clamp);
  const slide = interpolate(d, [52, 70], [-420, 0], clamp);
  const landed = d > 70;
  return (
    <Card top={TOP} h={H} d={d} fill={1.16} title="finalize.py · make_short.py">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 130, color: BLUE, lineHeight: 1}}>-14 LUFS</div>
        <div style={{fontSize: 36, fontWeight: 600, color: "#59636E", marginTop: 6}}>the sound, levelled: two-pass loudnorm</div>
        <div style={{position: "relative", marginTop: 22, height: 56, borderRadius: 28, background: "#E9EDF1", overflow: "hidden"}}>
          <div style={{position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: "linear-gradient(90deg,#2EA043,#A4AF2A,#FFA412)"}} />
          <div style={{position: "absolute", left: `${(16 / 30) * 100}%`, top: -4, bottom: -4, width: 5, background: INK}} />
        </div>
        <div style={{marginTop: 40, display: "flex", alignItems: "center", gap: 20, height: 190, padding: "0 20px", borderRadius: 22, background: "#E7F1FF", border: "2px solid #C7DDFB", overflow: "hidden"}}>
          <div style={{transform: `translateX(${slide}px)`, display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", borderRadius: 16, background: "#fff", boxShadow: "0 6px 20px rgba(0,0,0,.12)", opacity: d > 50 ? 1 : 0}}>
            <Icon src="film_flat.svg" color={BLUE} size={64} />
            <div style={{fontFamily: MONO, fontSize: 34, color: INK, fontWeight: 700}}>claude-edits.mp4</div>
          </div>
          <div style={{marginLeft: "auto", textAlign: "center"}}>
            <Icon src="desktop_flat.svg" color={landed ? OK : "#6B7480"} size={92} />
            <div style={{fontSize: 30, fontWeight: 700, color: landed ? OK : "#3B434C"}}>{landed ? "✓ Desktop" : "Desktop"}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// 10. "My last one took eleven minutes of machine time." timings.csv, run egm_final: TOTAL machine 684 s
const S10Time: React.FC<{d: number}> = ({d}) => {
  const n = Math.round(interpolate(d, [0, 20], [0, 684], clamp));
  const rows: [string, string][] = [["transcribe raw", "36 s"], ["pick last takes + cut", "74 s"], ["check frames", "263 s"], ["full render", "268 s"]];
  return (
    <Card top={TOP} h={H} d={d} fill={1.1} title="timings.csv · my last Short">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{display: "flex", alignItems: "baseline", gap: 26}}>
          <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 160, color: BLUE, lineHeight: 1, paddingLeft: 12}}>{n} s</div>
          <div style={{fontSize: 56, fontWeight: 800, letterSpacing: -1, opacity: pop(d, 18)}}>= 11 min</div>
        </div>
        <div style={{fontSize: 34, fontWeight: 600, color: "#59636E", marginTop: 8}}>total machine time, biggest steps:</div>
        <div style={{marginTop: 14}}>
          {rows.map(([a, b], i) => (
            <div key={a} style={{display: "flex", justifyContent: "space-between", padding: "12px 24px", marginBottom: 6, borderRadius: 12, fontSize: 42, fontWeight: 700, background: "#F4F6F9", border: "2px solid #E1E5EA", opacity: pop(d, 4 + i * 3)}}>
              <span>{a}</span><span style={{fontFamily: MONO, color: BLUE}}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// 11. "I just talk. Claude handles the rest."
const S11Split: React.FC<{d: number}> = ({d}) => {
  const a = pop(d, 2), b = pop(d, 10);
  const grow = interpolate(d, [10, 34], [1, 1.5], clamp);
  const jobs = ["transcript", "cuts", "scenes", "captions", "frame check", "sound"];
  return (
    <Card top={TOP} h={H} d={d} fill={1.12} title="Who does what">
      <div style={{fontFamily: SANS}}>
        <div style={{display: "flex", gap: 24}}>
          <div style={{flex: 1, borderRadius: 22, background: "#F4F6F9", border: "2px solid #E1E5EA", padding: "34px 10px", textAlign: "center", opacity: a, transform: `scale(${0.9 + 0.1 * a})`}}>
            <Icon src="mic_flat.svg" color={INK} size={150} />
            <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 70, color: INK, marginTop: 8}}>Me</div>
            <div style={{fontWeight: 700, fontSize: 40, color: "#3B434C"}}>I talk</div>
          </div>
          <div style={{flex: grow, borderRadius: 22, background: "#FFF1E4", border: "2px solid #FBD9B8", padding: "34px 10px", textAlign: "center", opacity: b, transform: `scale(${0.9 + 0.1 * b})`}}>
            <Logo src="claude-icon.svg" size={150} />
            <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 70, color: CLAUDE, marginTop: 8}}>Claude</div>
            <div style={{fontWeight: 700, fontSize: 40, color: "#3B434C"}}>everything else</div>
          </div>
        </div>
        <div style={{marginTop: 26, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center"}}>
          {jobs.map((j, i) => <span key={j} style={{padding: "8px 20px", borderRadius: 12, border: `2px solid ${CLAUDE}`, color: CLAUDE, fontWeight: 800, fontSize: 36, opacity: pop(d, 12 + i * 3)}}>✓ {j}</span>)}
        </div>
      </div>
    </Card>
  );
};

// 12. "And the whole pipeline is free. Link's in the description."
const S12End: React.FC<{d: number}> = ({d}) => <EndCard d={d} folder="shorts-studio" />;

export const claudeedits = makeShort({
  slug: "claude-edits",
  words: WORDS,
  fix: {cloud: "Claude", clod: "Claude", claud: "Claude", emotion: "Remotion", promotion: "Remotion", links: "Link's"},
  key: ["free", "retakes", "timestamps", "last", "pause", "scene", "captions", "agent", "eleven"],
  noun: ["claude", "whisper", "remotion", "react"],
  anchors: [
    ["claude code edited", S1Hook], ["i filmed", S2Phone], ["whisper writes", S3Words], ["then a script", S4Cut], ["it cuts", S5Pauses],
    ["every scene", S6Code], ["even these", S7Captions], ["before i", S8Frames], ["it levels", S9Audio], ["my last", S10Time],
    ["i just", S11Split], ["and the whole", S12End],
  ],
  hookEnd: 2,
  hook: {brand: "Claude Code", rest: "Edited", box: "This Entire Short", brandColor: "#D97757"},
  faceSrcTop: 690,
});
