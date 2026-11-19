// Game Studios Short v2 (Nov 18 2026): "Claude Code can build you a playable game from one sentence" (Donchitos/Claude-Code-Game-Studios, MIT).
// Built to the Short 04 v3 standard (shorts-guide 3-ter / 3g / 3h / 3i): ONE real page (shoot.py --full, Playwright 2x, Nov 18 2026, code
// blocks wrapped) carries the scenes: repo header + Star, the About line ("49 AI agents, 75 workflow skills"), the README's "Make me a game"
// steps word for word (/prototype, a few questions, a one-page brief, "Checked before you get it", headless browser, "Change it by
// asking", checkpoint, "Grow it", real web project) and the Engines table. Highlights land ON the spoken word (kit cues()).
// Only two drawn pieces, both OUR example: the /prototype line typed with "paper boats racing down a rainy street" (spoken), and a
// simple paper-boat game in a browser card titled "example".
// FULL spans: the name + stars, and the whole /prototype -> questions -> brief -> build -> test flow (the hard part; it also covers
// the look-aways at 26 s and 32-34 s found on the 5 fps sheets, lookaway.py).
// Facts re-verified Nov 18 2026 (GitHub API): 40,082 stars, 5,237 forks, MIT, pushed Nov 9 2026. Engine route: README "Not yet shown"
// in their tests, so the script says "supported", never "proven".
// The earlier draft (drawn mocks on placeholder timing) is kept at D:/Shorts/game-studios/index_draft_placeholder.tsx.
import React from "react";
import {interpolate} from "remotion";
import {Card, FullCtx, Shot, Chip, Mono, Icon, Logo, Cursor, typed, pop, makeShort, cues, SANS, BLUE, INK, TOP, H, HOOK_TOP, HOOK_H, REPO, W} from "../../kit";
import words from "./words.json";

// Whisper heard "Unreal supported too." as one word "RealSupported2." (cut transcript, Nov 18): split it into 3 timed words so the
// karaoke and the "unreal" cue work. Duration split by syllables (2/3/1).
const WS: W[] = (words as W[]).flatMap((x) => {
  if (x.w !== "RealSupported2.") return [x];
  const t = (x.e - x.s) / 6;
  return [{w: "Unreal", s: x.s, e: x.s + 2 * t}, {w: "supported", s: x.s + 2 * t, e: x.s + 5 * t}, {w: "too.", s: x.s + 5 * t, e: x.e}];
});
const URL = "github.com/Donchitos/Claude-Code-Game-Studios";
const R = "game-studios/gamestudios_repo_full.png";   // 1800x11000: top of the repo page through the Engines table, code blocks wrapped
const IW = 1800, IH = 11000;   // truncated from 35822 (Nov 18 2026): every crop is above y 10800, and the full 64 MP PNG made the final render ~6x slower
type B = {x: number; y: number; w: number; h: number};
const hl = (b: B, from: number, to: number) => ({...b, from, to});
const bx = (b: B, at: number) => ({...b, from: at, to: at + 8, box: true});
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

// 1 (hook, under the title) "Claude Code can build you a playable game from one sentence": the README title + "builds a playable browser game"
const S1Hook: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "cloud code can");
  return (
    <Card top={HOOK_TOP} h={HOOK_H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH} boxH={316}
        keys={[{at: 0, cx: 640, cy: 2520, w: 1060}, {at: 110, cx: 650, cy: 2560, w: 940}]}
        marks={[hl({x: 416, y: 2587, w: 471, h: 58}, c("playable"), c("playable") + 10)]} />
    </Card>
  );
};

// 2 FULL "It's called Claude Code Game Studios, and it has over 40 thousand stars on GitHub": the repo name, then the Star button
const S2Repo: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "it's called");
  const st = c("stars");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 600, cy: 560, w: 1100}, {at: st - 26, cx: 600, cy: 560, w: 1100}, {at: st - 8, cx: 1440, cy: 400, w: 700}]}
        marks={[bx({x: 70, y: 344, w: 526, h: 62}, c("called")), bx({x: 1556, y: 340, w: 214, h: 64}, st - 4)]} />
    </Card>
  );
};

// 3 "It gives Claude 49 AI agents and 75 skills, like a whole game studio": the repo's About line, each number on its word
const S3About: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "it gives cloud");
  const n = c("49"), sk = c("75");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 1350, cy: 620, w: 900}]}
        marks={[hl({x: 1577, y: 588, w: 96, h: 56}, n, n + 6), hl({x: 1292, y: 636, w: 118, h: 56}, n + 6, n + 12),
          hl({x: 1402, y: 636, w: 271, h: 56}, sk, sk + 10), bx({x: 1292, y: 584, w: 262, h: 64}, c("studio"))]} />
    </Card>
  );
};

// 4 FULL "You type slash prototype and describe your game.": the README's own /prototype line
const S4Readme: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "you type slash");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 560, cy: 3090, w: 930}]}
        marks={[bx({x: 118, y: 3134, w: 174, h: 56}, c("slash")), hl({x: 282, y: 3138, w: 727, h: 48}, c("describe"), c("game") + 4),
          hl({x: 118, y: 3177, w: 84, h: 48}, c("game") + 4, c("game") + 8)]} />
    </Card>
  );
};

// 4b FULL "Say, paper boats racing down a rainy street.": OUR example typed after /prototype (every word on screen is spoken)
const S4Type: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "say paper");
  const idea = "paper boats racing\ndown a rainy street";
  const p0 = c("paper"), p1 = c("street") + 6;
  const n = Math.round(interpolate(d, [p0, p1], [0, idea.length], clamp));
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.05} title="Claude Code">
      <div style={{display: "flex", alignItems: "center", gap: 14, marginBottom: 18}}><Logo src="claude-icon.svg" size={44} /></div>
      <Mono c="#7AB8FF" size={56}>{"> /prototype"}</Mono>
      <Mono c="#fff" size={56}>{idea.slice(0, n)}<Cursor d={d} /></Mono>
    </Card>
  );
};

// 5 FULL "Claude asks a few questions, then writes a one-page brief for you to approve.": README steps 1 and 2
const S5Brief: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "claude asks");
  const a = c("approve");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 570, cy: 3430, w: 920}]}
        marks={[bx({x: 150, y: 3278, w: 263, h: 62}, c("few")), bx({x: 150, y: 3478, w: 276, h: 62}, c("one")),
          hl({x: 438, y: 3576, w: 398, h: 58}, a, a + 10)]} />
    </Card>
  );
};

// 6 FULL "Then it builds a browser game you open with a double click.": OUR example game (drawn, simple), a double-click ripple on "double"
const Boat: React.FC<{x: number; y: number; c: string; bob: number}> = ({x, y, c, bob}) => (
  <g transform={`translate(${x} ${y + Math.sin(bob) * 3}) rotate(${Math.sin(bob * 0.8) * 3})`}>
    <ellipse cx={0} cy={24} rx={50} ry={8} fill="rgba(0,0,0,.22)" />
    <polygon points="-50,2 50,2 32,22 -32,22" fill={c} stroke="#6B7684" strokeWidth={3} strokeLinejoin="round" />
    <polygon points="-28,2 0,-42 28,2" fill="#FFFFFF" stroke="#6B7684" strokeWidth={3} strokeLinejoin="round" />
  </g>
);
const DROPS = Array.from({length: 60}, (_, i) => [((i * 137) % 100) / 100, ((i * 61) % 100) / 100, 0.8 + ((i * 29) % 40) / 100]);
const BOATS: [number, string, number][] = [[3.1, "#FFF4D6", 0], [2.6, "#DDEBFF", 1.7], [2.85, "#FFE1D6", 3.1]];
const Game: React.FC<{d: number; h: number}> = ({d, h}) => {
  const Wd = 892, sky = Math.round(h * 0.3), curb = sky + 14;
  const lanes = [0.5, 0.68, 0.86].map((f) => Math.round(h * f));
  return (
    <svg viewBox={`0 0 ${Wd} ${h}`} style={{display: "block", width: "100%", borderRadius: 18}}>
      <rect x={0} y={0} width={Wd} height={h} fill="#5B6571" />
      {[[30, 60, 120], [170, 30, 150], [340, 70, 110], [470, 20, 170], [660, 50, 130], [800, 40, 120]].map(([x, top, w]) => (
        <g key={x}><rect x={x} y={top} width={w} height={sky - top} fill="#47505B" />
          {[0, 1].map((r) => [0, 1, 2].map((q) => <rect key={`${r}${q}`} x={x + 16 + q * (w - 32) / 3} y={top + 18 + r * 34} width={(w - 32) / 3 - 10} height={18} fill="#6E7B8A" />))}</g>
      ))}
      <rect x={0} y={sky} width={Wd} height={14} fill="#9AA2AB" />
      <rect x={0} y={curb} width={Wd} height={h - curb} fill="#707982" />
      {[0.59, 0.77].map((f) => Array.from({length: 7}, (_, i) => (
        <rect key={`${f}${i}`} x={((i * 150 - d * 4) % 1050 + 1050) % 1050 - 100} y={Math.round(h * f)} width={80} height={6} rx={3} fill="#C9CED3" opacity={0.8} />
      )))}
      {BOATS.map(([v, col, ph], i) => <Boat key={i} x={Math.min(Wd - 70, 110 + i * 40 + d * v)} y={lanes[i]} c={col} bob={d / 7 + ph} />)}
      {DROPS.map(([x, y, sp], i) => {
        const yy = ((y * (h + 60) + d * 24 * sp) % (h + 60)) - 40, xx = ((x * (Wd + 40) - d * 3) % (Wd + 40) + Wd + 40) % (Wd + 40);
        return <line key={i} x1={xx} y1={yy} x2={xx - 6} y2={yy + 30} stroke="#D6E4F2" strokeWidth={3} strokeLinecap="round" opacity={0.75} />;
      })}
    </svg>
  );
};
const S6Game: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "then it builds");
  const dc = c("double");
  const ring = (t: number) => {
    const p = interpolate(d, [t, t + 12], [0, 1], clamp);
    const r = 50 + p * 110;
    return <div style={{position: "absolute", left: "50%", top: "50%", width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r, borderRadius: "50%",
      border: `12px solid #fff`, boxShadow: `0 0 0 6px ${BLUE}`, opacity: p > 0 && p < 1 ? 1 - p * 0.7 : 0}} />;
  };
  const k = pop(d, 2);
  const full = React.useContext(FullCtx);   // FULL card content is ~732x750 before its 1.3 zoom: a taller game fills it (no empty band)
  return (
    <Card top={TOP} h={H} d={d} title="paper-boats · example">
      <div style={{position: "relative", opacity: k, transform: `scale(${0.94 + 0.06 * k})`}}>
        <Game d={d} h={full ? 900 : 560} />
        {ring(dc)}{ring(dc + 6)}
      </div>
    </Card>
  );
};

// 7 FULL "Before you get it, it tests the game in a hidden browser and fixes what's broken.": README step 4
const S7Test: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "before you get");
  const hb = c("hidden"), fx = c("fixes");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 640, cy: 3990, w: 1080}]}
        marks={[bx({x: 150, y: 3878, w: 407, h: 62}, 2), hl({x: 980, y: 3880, w: 146, h: 58}, hb, hb + 6), hl({x: 150, y: 3928, w: 122, h: 58}, hb + 6, hb + 12),
          hl({x: 989, y: 3976, w: 189, h: 58}, fx, fx + 6), hl({x: 150, y: 4024, w: 103, h: 58}, fx + 6, fx + 12)]} />
    </Card>
  );
};

// 8 "Then you change it just by asking, and every change is a checkpoint.": README "Change it by asking"
const S8Change: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "then you change");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 595, cy: 4440, w: 930}]}
        marks={[bx({x: 150, y: 4374, w: 317, h: 62}, c("asking")), hl({x: 482, y: 4424, w: 533, h: 58}, c("every"), c("checkpoint") + 8)]} />
    </Card>
  );
};

// 9 "When you like it, it grows into a real project,": README "Grow it. When you like it, it becomes a real web project"
const S9Grow: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "when you like");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 595, cy: 4700, w: 930}]}
        marks={[hl({x: 272, y: 4680, w: 252, h: 58}, 0, c("it") + 6), bx({x: 150, y: 4678, w: 138, h: 62}, c("grows")),
          hl({x: 704, y: 4680, w: 251, h: 58}, c("real"), c("real") + 10)]} />
    </Card>
  );
};

// 10 "with Godot, Unity and Unreal supported too.": the README Engines table, a box on each engine's row as it is said
const S10Engines: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "with godot");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 470, cy: 10470, w: 860}]}
        marks={[bx({x: 104, y: 10232, w: 390, h: 110}, c("godot")), bx({x: 104, y: 10354, w: 390, h: 160}, c("unity")),
          bx({x: 104, y: 10526, w: 390, h: 158}, c("unreal"))]} />
    </Card>
  );
};

// 11 "It's open source and free. Link's in the description.": each word lands as it is said, then the link line
const S11End: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "it's open source");
  const l = c("links");
  return (
    <Card top={TOP} h={H} d={d} url={REPO}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40, height: 610, whiteSpace: "nowrap"}}>
        <Chip d={d} at={c("open")} text="Open source" size={104} />
        <Chip d={d} at={c("free")} text="Free" size={120} />
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 64, color: INK, letterSpacing: -1, display: "flex", alignItems: "center", gap: 16,
          opacity: pop(d, l), transform: `scale(${0.88 + 0.12 * pop(d, l)})`}}>
          <Icon src="pin_flat.svg" color={BLUE} size={70} />Link in the description</div>
      </div>
    </Card>
  );
};

export const gamestudios = makeShort({
  slug: "game-studios",
  words: WS,
  // from the CUT transcript (shorts-guide 3e: never the raw one)
  fix: {cloud: "Claude", links: "Link's", "40 ,000": "40,000", "one -page": "one-page", say: "Say,"},
  key: ["playable", "sentence", "40,000", "49", "75", "studio", "prototype", "questions", "brief", "double", "hidden", "broken", "asking", "checkpoint", "real", "free"],
  noun: ["claude", "code", "game", "studios", "github", "godot", "unity", "unreal"],
  anchors: [
    ["claude code can", S1Hook], ["it's called", S2Repo], ["it gives claude", S3About], ["you type slash", S4Readme], ["say paper", S4Type],
    ["claude asks", S5Brief], ["then it builds", S6Game], ["before you get", S7Test], ["then you change", S8Change], ["when you like", S9Grow],
    ["with godot", S10Engines], ["it's open source", S11End],
  ],
  // FULL (no face): the name + stars (stretched over look-aways at 6.6-7.4 s, 9.0-9.8 s, 12.4-12.8 s) and the whole
  // /prototype -> questions -> brief -> build -> test flow (hard part; covers 26.0 s and 32.0-33.8 s), started early on "like a whole"
  // to cover a hand over the mouth at 17.5 s (checker); "When you like it" covers eyes down at 45-46.4 s. Face on screen ~39%.
  full: [["it's called", 8.8], ["like a whole", 22.6], ["when you like", 2.3]],
  hookEnd: 1,
  hook: {brand: "Claude Code", rest: "Builds A Game", box: "From One Sentence", size: 70, boxSize: 90},   // 25 chars ran off the edge at 86
  faceSrcTop: 809,   // hair top at source y ~870 (frames at 10 s and 45 s)
  faceFit: "zoom",   // close take: chin at source y ~1740 (shorts-guide 3h)
});
