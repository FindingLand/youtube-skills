// Short 03 v3 (Nov 19 2026): "5 Claude plugins every automation builder needs". Rebuilt from the RAW take to the Short 04 v3
// standard (shorts-guide 3-ter, 3g-3k). The Nov 18 v1 (drawn mocks, 1.1x, trim_silence cut every pause to 0.16 s, 8 short FULL
// patches) was rejected by Peter: "this one is shit. I cannot post this one" (look-aways + a long silence); kept at
// D:/Shorts/five-plugins/v1_nov18/. Now: smooth cut (pauses inside a line kept), two script lines CUT for length (rule 2: cut
// content, not pauses; the 9-line cut ran 68.4 s): "Each one fixes a different headache." and the recap "Building, browsing,
// docs, planning, and memory. That's most of an automation job." (scripts/five-plugins.dropped.txt stops them leaking).
// Real images only: each plugin's own GitHub page (shoot.py, Nov 19 2026), highlights on the spoken words via cues().
// Facts re-verified Nov 19 2026 (GitHub API): n8n-skills 6,674 stars MIT; playwright-mcp 39,867 Apache-2.0; context7 65,090 MIT;
// superpowers 321,401 MIT ("over three hundred thousand" holds); claude-plugins-official 47,677 Apache-2.0, plugins/skill-creator.
import React from "react";
import {Card, Shot, Chip, Icon, Logo, pop, makeShort, cues, SANS, BLUE, INK, TOP, H, HOOK_TOP, HOOK_H, REPO, W} from "../../kit";
import words from "./words.json";

const WS = words as W[];
const F = "five-plugins/";
type B = {x: number; y: number; w: number; h: number};
const hl = (b: B, from: number, to: number) => ({...b, from, to});
const bx = (b: B, at: number) => ({...b, from: at, to: at + 8, box: true});

// 1 (hook) "Five Claude plugins every automation builder needs.": Anthropic's official plugin directory, title boxed on "Claude",
// then its About line "... Claude Code Plugins." lit on "plugins"
const S1Hook: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "five clod plugins");
  const p = c("plugins");
  return (
    <Card top={HOOK_TOP} h={HOOK_H} d={d} url="github.com/anthropics/claude-plugins-official">
      <Shot d={d} src={F + "pluginsofficial_top.png"} iw={1800} ih={2600} boxH={316}
        keys={[{at: 0, cx: 560, cy: 375, w: 1000}, {at: p - 8, cx: 560, cy: 375, w: 1000}, {at: p + 8, cx: 1350, cy: 600, w: 900}]}
        marks={[bx({x: 24, y: 338, w: 490, h: 70}, c("clod")), hl({x: 1650, y: 592, w: 105, h: 50}, p + 6, p + 14),
          hl({x: 1298, y: 640, w: 197, h: 50}, p + 12, p + 20)]} />
    </Card>
  );
};

// 2 "First, n8n Skills." (split) then FULL "It teaches Claude how to build n8n workflows the right way, node by node.":
// title boxed, About line lit on "teaches ... workflows", then the README's "teaching Claude" list on "right way" / "node by node"
const S2N8n: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "first na10");
  const t = c("it teaches"), r = c("the right");
  return (
    <Card top={TOP} h={H} d={d} url="github.com/czlonkowski/n8n-skills">
      <Shot d={d} src={F + "n8n-skills_top.png"} iw={1800} ih={5000}
        keys={[{at: 0, cx: 470, cy: 380, w: 900}, {at: t - 6, cx: 470, cy: 380, w: 900}, {at: t + 8, cx: 1430, cy: 620, w: 740},
          {at: r - 10, cx: 1430, cy: 620, w: 740}, {at: r + 6, cx: 470, cy: 4520, w: 780}]}
        marks={[bx({x: 22, y: 338, w: 262, h: 72}, c("na10 skills")), hl({x: 1298, y: 544, w: 444, h: 50}, c("teaches"), c("build")),
          hl({x: 1298, y: 592, w: 414, h: 50}, c("build"), c("workflows") + 8),
          hl({x: 209, y: 4560, w: 372, h: 50}, c("right"), c("way") + 8), hl({x: 209, y: 4672, w: 530, h: 50}, c("node by"), c("by") + 14)]} />
    </Card>
  );
};

// 3 "Second, Playwright, from Microsoft." (split: title, Microsoft logo + owner on "Microsoft") then FULL "Claude opens a real
// browser, clicks, fills in forms, and pulls data from sites with no API.": the README's first paragraph, lit as he says it
const S3Playwright: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "second play write");
  const o = c("clod opens");
  return (
    <Card top={TOP} h={H} d={d} url="github.com/microsoft/playwright-mcp">
      <Shot d={d} src={F + "playwright-mcp_top.png"} iw={1800} ih={5200}
        // FULL crop w 1080 (README column x 92-1172) = glyphs ~28 px; the highlighted words reach x 1156
        keys={[{at: 0, cx: 470, cy: 380, w: 900}, {at: o - 6, cx: 470, cy: 380, w: 900}, {at: o + 8, cx: 632, cy: 3330, w: 1080}]}   // cy 3200 showed file-list rows at the top (frame pass 1)
        marks={[bx({x: 90, y: 340, w: 300, h: 68}, c("play")), bx({x: 24, y: 342, w: 62, h: 62}, c("microsoft")),
          hl({x: 38, y: 144, w: 129, h: 46}, c("microsoft"), c("microsoft") + 8),
          hl({x: 849, y: 3126, w: 297, h: 50}, c("real"), c("browser")), hl({x: 92, y: 3174, w: 169, h: 50}, c("browser"), c("browser") + 8),
          hl({x: 901, y: 3174, w: 255, h: 50}, c("clicks"), c("fields")), hl({x: 92, y: 3222, w: 96, h: 50}, c("fields"), c("forms"))]} />
    </Card>
  );
};

// 4 "Third, Context7. Claude reads the current docs for your tools, so it stops writing code for old versions.": title,
// About "Up-to-date docs" on "current docs", then the README's "Without Context7" list on "writing code" / "old versions"
const S4Context7: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "third context");
  const rd = c("clod reads"), st = c("so it stops");
  return (
    <Card top={TOP} h={H} d={d} url="github.com/upstash/context7">
      <Shot d={d} src={F + "context7_top.png"} iw={1800} ih={5200}
        keys={[{at: 0, cx: 470, cy: 380, w: 900}, {at: rd - 4, cx: 470, cy: 380, w: 900}, {at: rd + 10, cx: 1350, cy: 600, w: 900},
          {at: st - 6, cx: 1350, cy: 600, w: 900}, {at: st + 8, cx: 540, cy: 4700, w: 900}]}
        marks={[bx({x: 24, y: 340, w: 240, h: 68}, c("context")), hl({x: 1597, y: 544, w: 108, h: 50}, c("current"), c("docs")),
          hl({x: 1298, y: 592, w: 339, h: 50}, c("docs"), c("docs") + 10),
          hl({x: 209, y: 4656, w: 418, h: 50}, c("writing"), c("code") + 8), hl({x: 209, y: 4768, w: 593, h: 50}, c("old"), c("versions") + 8)]} />
    </Card>
  );
};

// 5 "Fourth, Superpowers," (split: title) then FULL "with over three hundred thousand stars. Claude brainstorms, writes a plan,
// and tests its own work before it says done.": the 321k Star button, then the README's Basic Workflow, each step on its word
const S5Superpowers: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "fourth superpowers");
  const w = c("with over"), b = c("brainstorms"), ts = c("tests");
  return (
    <Card top={TOP} h={H} d={d} url="github.com/obra/superpowers">
      {d < b - 4
        ? <Shot d={d} src={F + "superpowers_top.png"} iw={1800} ih={2600}
            keys={[{at: 0, cx: 470, cy: 380, w: 900}, {at: w - 4, cx: 470, cy: 380, w: 900}, {at: w + 10, cx: 1420, cy: 540, w: 740}]}   // cy 400 put GitHub's black top bar in a third of the card
            marks={[bx({x: 24, y: 338, w: 316, h: 72}, c("superpowers")), bx({x: 1560, y: 342, w: 212, h: 64}, c("300"))]} />
        : <Shot d={d} src={F + "superpowers_wf.png"} iw={1800} ih={2100}
            keys={[{at: b - 4, cx: 470, cy: 640, w: 780}, {at: ts - 8, cx: 470, cy: 640, w: 780}, {at: ts + 6, cx: 470, cy: 1060, w: 780}]}
            marks={[hl({x: 156, y: 395, w: 220, h: 50}, b, b + 12), hl({x: 156, y: 843, w: 210, h: 50}, c("writes"), c("plan") + 6),
              hl({x: 156, y: 1291, w: 380, h: 50}, ts, ts + 12)]} />}
    </Card>
  );
};

// 6 FULL "Fifth, Skill Creator, by Anthropic. You describe a process once, and it writes a skill Claude can follow every time.":
// Anthropic's plugin folder, "skill-creator" boxed, "anthropics" lit, then its README "Create new skills" on "writes a skill"
const S6SkillCreator: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "fifth skill creator");
  const y = c("you describe");
  return (
    <Card top={TOP} h={H} d={d} url="github.com/anthropics/claude-plugins-official">
      <Shot d={d} src={F + "skillcreator_top.png"} iw={1800} ih={2376}
        // README view ends at the README box (y ~1560): cy 1320 w 1100 left the card's lower half blank (frame pass 1)
        // cx 560: the lit "anthropics" breadcrumb starts at x 38 (cx 640 cut it to "ropics", spot frames loop 1)
        keys={[{at: 0, cx: 560, cy: 564, w: 1100}, {at: y - 4, cx: 560, cy: 564, w: 1100}, {at: y + 10, cx: 570, cy: 1100, w: 1000}]}   // cx - w/2 = 70: the title box (x 86) clipped at cx 590
        marks={[bx({x: 860, y: 334, w: 196, h: 64}, c("skill creator")), hl({x: 38, y: 144, w: 142, h: 46}, c("anthropic"), c("anthropic") + 10),
          bx({x: 86, y: 1226, w: 360, h: 80}, y + 4), hl({x: 92, y: 1353, w: 250, h: 50}, c("writes a skill"), c("skill cloud") + 4)]} />
    </Card>
  );
};

// 7 "All five are on GitHub and free to install. Links are in the description.": the five logos on "All five", Free on its word,
// then the link line (our repo folder) on "Links"
const LOGOS = ["n8n-icon.svg", "playwright.svg", "upstash-icon.svg", "", "anthropic-icon.svg"];
const S7End: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "all five");
  const l = c("links");
  return (
    <Card top={TOP} h={H} d={d} url={REPO}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40, height: 610, whiteSpace: "nowrap"}}>
        <div style={{display: "flex", gap: 26}}>
          {LOGOS.map((x, i) => {
            const k = pop(d, i * 3);
            return <div key={i} style={{width: 120, height: 120, borderRadius: 28, background: "#fff", boxShadow: "0 6px 24px rgba(0,0,0,.12)", display: "flex",
              alignItems: "center", justifyContent: "center", opacity: k, transform: `scale(${0.7 + 0.3 * k})`}}>
              {x ? <Logo src={x} size={78} /> : <Icon src="high_voltage_flat.svg" color="#F5A300" size={82} />}</div>;
          })}
        </div>
        <Chip d={d} at={c("free") - 2} text="Free" size={120} />
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 60, color: INK, letterSpacing: -1, display: "flex", alignItems: "center", gap: 16,
          opacity: pop(d, l - 2), transform: `scale(${0.88 + 0.12 * pop(d, l - 2)})`}}>
          <Icon src="pin_flat.svg" color={BLUE} size={64} />Links in the description</div>
        <div style={{display: "flex", alignItems: "center", gap: 14, fontFamily: SANS, fontWeight: 600, fontSize: 34, color: "#59636E", opacity: pop(d, l)}}>
          <Logo src="github-icon.svg" size={44} />FindingLand/youtube-skills/five-claude-plugins</div>
      </div>
    </Card>
  );
};

export const fiveplugins = makeShort({
  slug: "five-plugins",
  words: WS,
  // from the CUT transcript (shorts-guide 3e); keys with a space are fixes in context (kit makeShort)
  fix: {"five clod": "Five Claude", clod: "Claude", cloud: "Claude", clot: "Claude", na10: "n8n", "play write": "Playwright", fields: "fills",
    "context seven": "Context7", superpowers: "Superpowers", brainstorms: "brainstorms", "300 ,000": "300,000",
    "skill creator": "Skill Creator", github: "GitHub"},
  key: ["real", "current", "old", "stars", "tests", "once", "free"],
  noun: ["claude", "n8n", "skills", "playwright", "microsoft", "context7", "superpowers", "creator", "anthropic", "github"],
  anchors: [
    ["five claude plugins", S1Hook], ["first n8n", S2N8n], ["second playwright", S3Playwright], ["third context7", S4Context7],
    ["fourth superpowers", S5Superpowers], ["fifth skill creator", S6SkillCreator], ["all five", S7End],
  ],
  // FULL (no face): the three hard sentences + every look-away on the 5 fps sheets (Nov 19): n8n "It teaches ... node by node"
  // (eyes off 10.0-10.8 s), Playwright "Claude opens ... no API", and one span from "with over" through Skill Creator (eyes
  // down 33.4-33.8 s and 44.2-47.2 s, hands at the face 44.2-44.4 s). The opening wave and the end gestures stay on camera.
  full: [["it teaches", 5.6], ["claude opens", 7.5], ["with over", 20.9]],
  hookEnd: 1,
  hook: {brand: "5 Claude", rest: "Plugins Every", box: "Automation Builder Needs", brandColor: "#D97757", size: 80, boxSize: 70},
  faceSrcTop: 655,   // wide take (Nov 18): hair top at source y 690-704
});
