// EGM Short v2 (Nov 18 2026): "Google's free fix for sloppy AI code" (google/elephant-goldfish-model, Apache-2.0).
// Rebuilt to the Short 04 v3 standard (shorts-guide 3-ter / 3g): REAL screenshots (shoot.py, Playwright 2x, Nov 18 2026) of the
// GitHub repo + README and Google's own launch post, panned and highlighted ON the spoken word (kit cues()); one FULL span over the
// name + the elephant/goldfish mechanism (the hard part); on-screen text only repeats what is said; no drawn mocks, no music.
// Facts re-verified Nov 18 2026: repo 21.2k stars, Apache-2.0; blog (Oct 22 2026): "Originally, this plugin was developed
// internally for Google software engineers, and is now open source."
// The take (D:/Shorts/egm2, Nov 17) starts on "just": "Google" was never recorded. The first 0.12 s is the tail of "Google"
// (Whisper hears "People"); it is dropped from the captions, the hook title + the repo's Google logo carry the brand.
import React from "react";
import {Card, Shot, Chip, Pill, Icon, EndCard, makeShort, cues, ELEPHANT, BAD, TOP, H, HOOK_TOP, HOOK_H, W} from "../../kit";
import words from "./words.json";

const WS = (words as W[]).filter((w, i) => !(i === 0 && /^people/i.test(w.w)));
const REPO_URL = "github.com/google/elephant-goldfish-model";
const REPO = "egm/egm_repo_full.png";            // 1800x13530, whole repo page (header, README, How it works table)
const BLOG = "egm/googleblog_egm_full.png";      // 1800x8268, opensource.googleblog.com launch post, Oct 22 2026
const BLOG_URL = "opensource.googleblog.com";
const IW = 1800;
type B = {x: number; y: number; w: number; h: number};
const hl = (b: B, from: number, to: number) => ({...b, from, to});
const bx = (b: B, at: number) => ({...b, from: at, to: at + 8, box: true});

// 1 (hook, under the title) "[Google] just made their fix for sloppy AI code free": the repo header, Google logo + name, push in
const S1Hook: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "just made");
  return (
    <Card top={HOOK_TOP} h={HOOK_H} d={d} url={REPO_URL}>
      <Shot d={d} src={REPO} iw={IW} ih={13530} boxH={316}
        keys={[{at: 0, cx: 820, cy: 360, w: 1560}, {at: 110, cx: 560, cy: 372, w: 1150}]}
        marks={[hl({x: 90, y: 346, w: 462, h: 54}, c("fix"), c("code"))]} />
    </Card>
  );
};

// 2 "They built it for their own engineers, and now anyone can install it": Google's launch post says exactly that
const S2Blog: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "they built");
  const e = c("engineers"), n = c("now");
  return (
    <Card top={TOP} h={H} d={d} url={BLOG_URL}>
      <Shot d={d} src={BLOG} iw={IW} ih={8268}
        keys={[{at: 0, cx: 690, cy: 4200, w: 1250}, {at: c("own") - 6, cx: 1000, cy: 4285, w: 900}, {at: e + 2, cx: 1000, cy: 4285, w: 900}, {at: e + 10, cx: 480, cy: 4310, w: 900}]}
        marks={[hl({x: 719, y: 4262, w: 586, h: 46}, c("own"), e), hl({x: 24, y: 4310, w: 151, h: 46}, e, e + 8),
          hl({x: 178, y: 4310, w: 349, h: 46}, n, c("anyone") + 10)]} />
    </Card>
  );
};

// 3 FULL "It's called the Elephant Goldfish Model, and it runs two kinds of agents": the README title + "Design with an
// elephant. Review with a goldfish." (each half on its word)
const S3Name: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "it's called");
  const k = c("kind");
  return (
    <Card top={TOP} h={H} d={d} url={REPO_URL}>
      <Shot d={d} src={REPO} iw={IW} ih={13530}
        keys={[{at: 0, cx: 640, cy: 3660, w: 920}, {at: c("two") - 6, cx: 640, cy: 3700, w: 800}]}
        marks={[hl({x: 290, y: 3606, w: 700, h: 86}, c("elephant"), c("model") + 8),
          hl({x: 291, y: 3732, w: 353, h: 50}, c("two"), k), hl({x: 648, y: 3732, w: 326, h: 50}, k, c("agents") + 4)]} />
    </Card>
  );
};

// 4 FULL "You give it a task. The elephant remembers everything about your project, and writes the plan. Then the goldfish
// agents read that plan with zero memory ..., and they try to break it": the README's "How it works" table, row by row
const S4Table: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "you give");
  const g = c("then the goldfish"), z = c("zero memory"), b = c("try to break");
  return (
    <Card top={TOP} h={H} d={d} url={REPO_URL}>
      <Shot d={d} src={REPO} iw={IW} ih={13530}
        keys={[{at: 0, cx: 640, cy: 10180, w: 1140}, {at: c("elephant") - 8, cx: 520, cy: 10150, w: 860}, {at: c("writes") - 8, cx: 520, cy: 10150, w: 860},
          {at: c("writes"), cx: 740, cy: 10150, w: 860}, {at: g - 8, cx: 740, cy: 10150, w: 860}, {at: g + 2, cx: 520, cy: 10290, w: 860},
          {at: b - 8, cx: 520, cy: 10290, w: 860}, {at: b, cx: 740, cy: 10290, w: 860}]}
        marks={[bx({x: 104, y: 10431, w: 92, h: 62}, 2),
          bx({x: 100, y: 10087, w: 172, h: 62}, c("elephant")),
          hl({x: 301, y: 10097, w: 392, h: 50}, c("your project"), c("your project") + 8), hl({x: 301, y: 10145, w: 300, h: 50}, c("your project") + 8, c("project") + 14),
          hl({x: 746, y: 10097, w: 361, h: 50}, c("writes"), c("writes") + 8), hl({x: 746, y: 10145, w: 325, h: 50}, c("writes") + 8, c("plan") + 6),
          bx({x: 100, y: 10209, w: 168, h: 62}, c("goldfish")),
          hl({x: 301, y: 10317, w: 272, h: 50}, z, z + 8), hl({x: 301, y: 10365, w: 194, h: 50}, z + 8, z + 14),
          hl({x: 746, y: 10219, w: 381, h: 50}, b, b + 6), hl({x: 746, y: 10267, w: 380, h: 50}, b + 6, b + 12), hl({x: 746, y: 10315, w: 313, h: 50}, b + 12, b + 18)]} />
    </Card>
  );
};

// 5 (FULL, then face back on "you can't") "Every gap, every blind spot. You can't see your own mistakes. Someone who wasn't in the
// room sees them in seconds": Google's post on the goldfish ("zero-context sessions ... share no blind spots ... probing for gaps")
const S5Blind: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "every gap");
  const y = c("you can't"), s = c("someone");
  return (
    <Card top={TOP} h={H} d={d} url={BLOG_URL}>
      <Shot d={d} src={BLOG} iw={IW} ih={8268}
        keys={[{at: 0, cx: 448, cy: 2900, w: 860}, {at: y - 4, cx: 448, cy: 2900, w: 860}, {at: y + 6, cx: 620, cy: 2990, w: 900}]}
        marks={[hl({x: 125, y: 3030, w: 246, h: 46}, c("gap"), c("gap") + 10), hl({x: 579, y: 2982, w: 169, h: 46}, c("blind"), c("blind") + 10),
          hl({x: 239, y: 2982, w: 333, h: 46}, c("can't see"), c("mistakes")), hl({x: 755, y: 2982, w: 254, h: 46}, c("mistakes"), c("mistakes") + 8),
          bx({x: 536, y: 2934, w: 323, h: 46}, s)]} />
    </Card>
  );
};

// 6 "And Claude only starts coding after you approve the plan": the README, "You ... approve the specification before implementing"
const S6Approve: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "and claude only");
  const a = c("approve");
  return (
    <Card top={TOP} h={H} d={d} url={REPO_URL}>
      <Shot d={d} src={REPO} iw={IW} ih={13530}
        keys={[{at: 0, cx: 640, cy: 4040, w: 1120}, {at: a - 8, cx: 625, cy: 4080, w: 1090}]}
        marks={[hl({x: 1051, y: 4212, w: 104, h: 50}, c("coding"), c("coding") + 6), hl({x: 92, y: 4260, w: 209, h: 50}, c("coding") + 6, c("after") + 6),
          bx({x: 88, y: 4208, w: 70, h: 58}, c("you approve")), hl({x: 687, y: 4212, w: 367, h: 50}, a, a + 10)]} />
    </Card>
  );
};

// 7 "So the bugs get caught on paper, where they cost nothing, not in your code, where they cost hours and tokens"
const S7Cost: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "so the bags");
  const row = (icon: string, color: string, chip: string, at: number, pill: string, pat: number, ok: boolean) => (
    <div style={{display: "flex", alignItems: "center", gap: 34}}>
      <Icon src={icon} color={color} size={120} style={{opacity: d >= at - 4 ? 1 : 0.15}} />
      <div style={{whiteSpace: "nowrap"}}><Chip d={d} at={at} text={chip} size={72} /><div style={{zoom: 1.05}}><Pill ok={ok} text={pill} d={d} at={pat} /></div></div>
    </div>
  );
  // "So the bugs get caught" lands first (frame study: the card sat ~2 s nearly empty until "paper")
  return (
    <Card top={TOP} h={H} d={d} title="Bugs">
      <div style={{display: "flex", justifyContent: "center", marginBottom: 34, whiteSpace: "nowrap"}}><Chip d={d} at={2} text="Bugs get caught" size={78} /></div>
      <div style={{display: "flex", flexDirection: "column", gap: 34, paddingLeft: 0}}>
        {row("memo_flat.svg", ELEPHANT, "On paper", c("paper"), "cost nothing", c("nothing"), true)}
        {row("laptop_flat.svg", BAD, "In your code", c("not"), "cost hours and tokens", c("hours"), false)}
      </div>
    </Card>
  );
};

// 8 "And it's free. Link's in the description."
const S8End: React.FC<{d: number}> = ({d}) => <EndCard d={d} />;

export const egm = makeShort({
  slug: "egm",
  words: WS,
  // from the CUT transcript: "kind" (old approved captions said "kinds"), "bags", "links"
  fix: {kind: "kinds", bags: "bugs", links: "Link's", modal: "Model"},
  key: ["sloppy", "free", "engineers", "anyone", "plan", "zero", "gap", "blind", "mistakes", "seconds", "approve", "paper", "nothing", "hours", "tokens"],
  noun: ["google", "elephant", "goldfish", "model", "claude"],
  anchors: [
    ["just made", S1Hook], ["they built", S2Blog], ["it's called", S3Name], ["you give", S4Table], ["every gap", S5Blind],
    ["and claude only", S6Approve], ["so the bugs", S7Cost], ["and it's free", S8End],
  ],
  // FULL (no face) from the name through the elephant/goldfish mechanism and "every gap, every blind spot" (the hard part);
  // the face comes back on "You can't see your own mistakes". Two short FULL spans cover eyes-down-on-the-script stretches
  // (5 fps sheet, Nov 18): line 7 "And Claude only ... approve the plan" and the end of line 8 "where they cost hours and tokens"
  full: [["it's called", 21.2], ["and claude only", 3.8], ["code where", 2.6]],
  hookEnd: 1,
  hook: {brand: "Google's", rest: "Free Fix For", box: "Sloppy AI Code"},
  faceSrcTop: 640,
  faceFit: "zoom",   // close take (chin at source y ~1640): full width cut the chin
});
