// Short 02 v2 (Nov 19 2026): "Claude Code edited this entire Short". Rebuilt to the Short 04 v3 standard (shorts-guide 3-ter, 3g-3j).
// The script describes OUR pipeline, so two spoken lines that are no longer true were CUT from the cut (rule 2: cut content, never
// re-caption): "It cuts every pause longer than a quarter second, and speeds me up ten percent" (the cut is now smooth, real speed)
// and "My last one took eleven minutes of machine time" (07 took ~13 min of machine time). Every other line is still true.
// Real images only: the public repo's shorts-studio page (README rewritten Nov 19 to say today's pipeline in the spoken words),
// remotion.dev, a frame of the real Short 04, the real checker contact sheet of Short 07. Highlights land on the spoken word (cues).
// The Nov 17 v1 (drawn mocks, 1.1x, pauses cut) is kept at D:/Shorts/claude-edits/index_v1_nov17.tsx + v1_nov17/.
import React from "react";
import {Card, Shot, Chip, Icon, Logo, pop, makeShort, cues, SANS, BLUE, INK, TOP, H, HOOK_TOP, HOOK_H, REPO, W} from "../../kit";
import words from "./words.json";

const WS = words as W[];
const URL = "github.com/FindingLand/youtube-skills";
const R = "claude-edits/studio_repo_full.png", RW = 1800, RH = 5008;   // shoot.py --full, Nov 19 2026
type B = {x: number; y: number; w: number; h: number};
const hl = (b: B, from: number, to: number) => ({...b, from, to});
const bx = (b: B, at: number) => ({...b, from: at, to: at + 8, box: true});

// 1 (hook) "Claude Code edited this entire Short. I filmed it on my phone in one take, retakes and all.": the README title + intro
const S1Hook: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "cloud code edited");
  return (
    <Card top={HOOK_TOP} h={HOOK_H} d={d} url={URL + "/shorts-studio"}>
      <Shot d={d} src={R} iw={RW} ih={RH} boxH={316}
        keys={[{at: 0, cx: 640, cy: 2880, w: 1100}, {at: c("i filmed"), cx: 640, cy: 2900, w: 1100}]}
        marks={[hl({x: 92, y: 2925, w: 492, h: 50}, c("edited"), c("edited") + 10), bx({x: 84, y: 2780, w: 414, h: 104}, c("short")),
          hl({x: 667, y: 2925, w: 453, h: 50}, c("phone"), c("all") + 4)]} />
    </Card>
  );
};

// 2 FULL "Whisper writes down every word I say, with timestamps. Then a script keeps my last try at each line.": README steps 1-2, one crop panned
const S2Readme: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "whisper writes");
  const ev = c("every"), th = c("then");
  return (
    <Card top={TOP} h={H} d={d} url={URL + "/shorts-studio"}>
      <Shot d={d} src={R} iw={RW} ih={RH}
        // w 760 in FULL (glyphs ~30 px on the frame): w 1100 showed the whole README at ~22 px, unreadable on a phone (frame pass 1)
        keys={[{at: 0, cx: 468, cy: 3380, w: 760}, {at: ev - 12, cx: 468, cy: 3380, w: 760}, {at: ev + 6, cx: 1000, cy: 3450, w: 760},
          // panned right the header row is out of view, so cy 3450 (final v1: a ~300 px blank band at the card top at 8-11 s)
          {at: th - 2, cx: 1000, cy: 3450, w: 760}, {at: th + 10, cx: 600, cy: 3420, w: 760}]}
        marks={[bx({x: 311, y: 3172, w: 144, h: 62}, 2), hl({x: 673, y: 3178, w: 667, h: 50}, c("writes"), c("sense") + 6),
          hl({x: 481, y: 3234, w: 419, h: 50}, c("keeps"), c("line") + 4)]} />
    </Card>
  );
};

// 3 FULL "Every scene you see is React code, built in Remotion and timed to my words.": remotion.dev, React on the word, the logo on
// "Remotion", then down to the editor's timeline (captions track) on "timed to my words"
const S3Remotion: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "every scene");
  const tm = c("timed");
  return (
    <Card top={TOP} h={H} d={d} url="remotion.dev">
      <Shot d={d} src="claude-edits/remotion_home.png" iw={1800} ih={2200}
        keys={[{at: 0, cx: 600, cy: 560, w: 1100}, {at: tm - 14, cx: 600, cy: 560, w: 1100}, {at: tm + 4, cx: 960, cy: 1240, w: 1300}]}
        marks={[hl({x: 650, y: 321, w: 112, h: 56}, c("react"), c("code") + 4), bx({x: 96, y: 22, w: 300, h: 76}, c("remotion")),
          bx({x: 330, y: 1334, w: 1390, h: 48}, tm + 2)]} />
    </Card>
  );
};

// 4 "Even these captions light up as I say them.": a frame of our real Short 04, its karaoke caption mid-word ("whenever" lighting up)
const S4Captions: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "even discussions");
  const l = c("light");
  return (
    <Card top={TOP} h={H} d={d} title="Short 04 · captions">
      <Shot d={d} src="claude-edits/short04_frame.png" iw={1080} ih={1920}
        keys={[{at: 0, cx: 540, cy: 760, w: 1080}, {at: l - 6, cx: 540, cy: 760, w: 1080}, {at: l + 10, cx: 530, cy: 1060, w: 820}]}
        marks={[bx({x: 210, y: 912, w: 640, h: 116}, l)]} />
    </Card>
  );
};

// 5 FULL "Before I see anything, a separate AI agent reviews one frame per second.": the checker's real contact sheet (Short 07),
// one frame boxed on "one frame", the next on "second"
const S5Checker: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "before i");
  const o = c("one");
  return (
    <Card top={TOP} h={H} d={d} title="checker · 1 frame per second">
      <Shot d={d} src="claude-edits/checker_sheet.png" iw={1728} ih={2688}
        keys={[{at: 0, cx: 864, cy: 1000, w: 1728}, {at: o - 14, cx: 864, cy: 1000, w: 1728}, {at: o + 2, cx: 760, cy: 960, w: 760}]}
        marks={[bx({x: 432, y: 768, w: 216, h: 384}, o), bx({x: 648, y: 768, w: 216, h: 384}, c("second"))]} />
    </Card>
  );
};

// 6 "It levels the sound, and the video lands on my desktop.": README step 6, panned to the second half on "the video"
const S6Finish: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "it levels");
  const v = c("video");
  return (
    <Card top={TOP} h={H} d={d} url={URL + "/shorts-studio"}>
      <Shot d={d} src={R} iw={RW} ih={RH}
        keys={[{at: 0, cx: 495, cy: 3420, w: 820}, {at: v - 12, cx: 495, cy: 3420, w: 820}, {at: v + 4, cx: 1240, cy: 3420, w: 820}]}
        marks={[hl({x: 283, y: 3602, w: 240, h: 50}, c("levels"), c("sound") + 6), hl({x: 1110, y: 3602, w: 447, h: 50}, v - 4, c("desktop") + 6)]} />
    </Card>
  );
};

// 7 "I just talk. Claude handles the rest.": two chips, each on its words
const S7Talk: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "i just");
  return (
    <Card top={TOP} h={H} d={d} title="Who does what">
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 46, height: 610, whiteSpace: "nowrap"}}>
        <Chip d={d} at={c("talk") - 4} text="I just talk" size={104} />
        <div style={{display: "flex", alignItems: "center", gap: 22, opacity: pop(d, c("claude") - 2)}}>
          <Logo src="claude-icon.svg" size={96} />
          <Chip d={d} at={c("claude") - 2} text="Claude handles the rest" size={68} />
        </div>
      </div>
    </Card>
  );
};

// 8 "And the whole pipeline is free. Link's in the description.": Free on its word, then the link line (our repo folder)
const S8End: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "and the whole");
  const l = c("links");
  return (
    <Card top={TOP} h={H} d={d} url={REPO}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 44, height: 610, whiteSpace: "nowrap"}}>
        {/* the pipeline's folder shows on "the whole pipeline" (frame pass 1: the card sat blank ~1 s until "free") */}
        <div style={{display: "flex", alignItems: "center", gap: 14, fontFamily: SANS, fontWeight: 600, fontSize: 36, color: "#59636E", opacity: pop(d, c("pipeline") - 4)}}>
          <Logo src="github-icon.svg" size={46} />FindingLand/youtube-skills/shorts-studio</div>
        <Chip d={d} at={c("free") - 2} text="Free" size={130} />
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 64, color: INK, letterSpacing: -1, display: "flex", alignItems: "center", gap: 16,
          opacity: pop(d, l), transform: `scale(${0.88 + 0.12 * pop(d, l)})`}}>
          <Icon src="pin_flat.svg" color={BLUE} size={70} />Link in the description</div>
      </div>
    </Card>
  );
};

export const claudeedits = makeShort({
  slug: "claude-edits",
  words: WS,
  // from the CUT transcript (shorts-guide 3e): Whisper heard "Cloud", "time sense", "discussions", "Links"
  fix: {cloud: "Claude", "time sense": "timestamps", discussions: "these captions", short: "Short", react: "React", remotion: "Remotion", links: "Link's"},
  key: ["edited", "retakes", "timestamps", "last", "react", "these captions", "agent", "second", "sound", "desktop", "talk", "free"],
  noun: ["claude", "code", "short", "whisper", "remotion"],
  anchors: [
    ["claude code edited", S1Hook], ["whisper writes", S2Readme], ["every scene", S3Remotion], ["even", S4Captions], ["before i", S5Checker],
    ["it levels", S6Finish], ["i just", S7Talk], ["and the whole", S8End],
  ],
  // FULL (no face): the hard part Whisper -> takes -> React/Remotion (covers the slight look-aways at 12.4, 14.4-15.2, 17.6-18.0 and
  // 21.4-21.6 s on the 5 fps sheets), and the checker line through "on my desktop" (covers the hand at the face at 25.2-25.4 s, 28.8 s,
  // and the head turn + eyes down at 33.2-34.2 s the checker flagged). Face on screen ~37%.
  full: [["whisper writes", 14.9], ["before i", 11.3]],
  hookEnd: 1,
  hook: {brand: "Claude Code", rest: "Edited", box: "This Entire Short", brandColor: "#D97757", boxSize: 92},
  faceSrcTop: 810,   // hair top at source y ~870 (frames at 5 s and 30 s)
  faceFit: "zoom",   // close take: chin at source y ~1640 (shorts-guide 3h)
});
