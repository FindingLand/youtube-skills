// AI Agency Short v2 (Nov 18 2026): "283 free AI specialists, all within Claude Code" (msitarzewski/agency-agents, MIT).
// Rebuilt to the Short 04 v3 standard (shorts-guide 3-ter): REAL GitHub screenshots (shoot.py, Playwright 2x, Nov 18 2026) panned
// and highlighted ON the spoken word (kit cues() reads the times from words.json); FULL shots for the name + the install/how-to part;
// on-screen text only repeats what is said; no drawn mocks, no EXAMPLE content, no music.
// Facts re-verified Nov 18 2026 (GitHub API): 169,181 stars, 27,475 forks, MIT; plan: client-memories/.../05-ai-agency-in-claude-code/plan.md
import React from "react";
import {interpolate} from "remotion";
import {Card, Shot, Chip, EndCard, makeShort, cues, SANS, INK, BAD, TOP, H, HOOK_TOP, HOOK_H, W} from "../../kit";
import words from "./words.json";

const WS = words as W[];
const REPO_URL = "github.com/msitarzewski/agency-agents";
const TOPPNG = "ai-agency/msitarzewski_agency-agents_top.png";      // 1800x2200: header, folder list, About
const FILES = "agency-agents/blob/main/";
// folder rows in TOPPNG (image px): a box per spoken role
const row = (cy: number) => ({x: 50, y: cy - 36, w: 430, h: 72});
const DESIGN = row(900), ENGINEERING = row(982), FINANCE = row(1146), MARKETING = row(1555), SALES = row(1966);

// 1 (hook, under the title) "283 free AI specialists, all within Claude Code": the real folder list, slow pan
const S1Hook: React.FC<{d: number}> = ({d}) => (
  <Card top={HOOK_TOP} h={HOOK_H} d={d} url={REPO_URL}>
    <Shot d={d} src={TOPPNG} iw={1800} ih={2200} boxH={316}
      keys={[{at: 0, cx: 580, cy: 950, w: 1150}, {at: 180, cx: 580, cy: 1450, w: 1150}]} />
  </Card>
);

// 2 FULL "It's called Agency Agents, and it has almost 169 thousand stars on GitHub": the name, then the Star button on "169"
const S2Repo: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "it's called");
  const n = c("agentsy agents"), k = c("169");
  return (
    <Card top={TOP} h={H} d={d} url={REPO_URL}>
      <Shot d={d} src={TOPPNG} iw={1800} ih={2200}
        keys={[{at: 0, cx: 560, cy: 560, w: 1050}, {at: n - 4, cx: 420, cy: 470, w: 800}, {at: k - 14, cx: 420, cy: 470, w: 800}, {at: k, cx: 1400, cy: 500, w: 760}]}
        marks={[{x: 88, y: 342, w: 290, h: 62, from: n, to: n + 14}, {x: 1556, y: 336, w: 220, h: 72, from: k, to: k + 8, box: true}]} />
    </Card>
  );
};

// 3 "Each agent has one job": the repo's own About line, then the spoken words as a chip
const S3One: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "each agent");
  return (
    <Card top={TOP} h={H} d={d} url={REPO_URL}>
      <Shot d={d} src={TOPPNG} iw={1800} ih={2200} boxH={400}
        keys={[{at: 0, cx: 1480, cy: 690, w: 640}]}
        marks={[{x: 1530, y: 736, w: 222, h: 50, from: 2, to: 14}, {x: 1298, y: 784, w: 263, h: 50, from: 14, to: c("one")}]} />
      <div style={{display: "flex", justifyContent: "center", marginTop: 34}}><Chip d={d} at={c("one")} text="One job" /></div>
    </Card>
  );
};

// 4 "Engineers, designers, marketers, sales reps, even a bookkeeper": a box on each folder as it is said (bookkeeper = finance)
const S4Roles: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "engineers");
  const m = c("marketers"), b = c("bookkeeper");
  const mk = (r: {x: number; y: number; w: number; h: number}, at: number) => ({...r, from: at, to: at + 8, box: true});
  return (
    <Card top={TOP} h={H} d={d} url={REPO_URL}>
      <Shot d={d} src={TOPPNG} iw={1800} ih={2200}
        keys={[{at: 0, cx: 560, cy: 1000, w: 1000}, {at: m - 14, cx: 560, cy: 1000, w: 1000}, {at: m - 2, cx: 560, cy: 1680, w: 1000},
          {at: b - 14, cx: 560, cy: 1680, w: 1000}, {at: b - 2, cx: 560, cy: 1100, w: 1000}]}
        marks={[mk(ENGINEERING, 0), mk(DESIGN, c("designers")), mk(MARKETING, m), mk(SALES, c("sales")), mk(FINANCE, b)]} />
    </Card>
  );
};

// 5 FULL "You install them once, and you can ask Claude for any of them by name": the README's Claude Code install block
const S5Install: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "you install");
  const a = c("ask");
  return (
    <Card top={TOP} h={H} d={d} url={REPO_URL}>
      <Shot d={d} src="ai-agency/agency-agents_readme_install.png" iw={1800} ih={1400}
        keys={[{at: 0, cx: 520, cy: 560, w: 820}, {at: a - 10, cx: 520, cy: 560, w: 820}, {at: a + 2, cx: 640, cy: 640, w: 1060}]}
        marks={[{x: 120, y: 512, w: 604, h: 46, from: c("install"), to: c("once") + 6},
          {x: 120, y: 710, w: 830, h: 44, from: a, to: c("any")},
          {x: 120, y: 750, w: 720, h: 44, from: c("any"), to: c("by name")},
          {x: 482, y: 746, w: 276, h: 50, from: c("by name"), to: c("by name") + 8, box: true}]} />
    </Card>
  );
};

// 6 "Here are the three a small business would actually use": the spoken words, big
const S6Three: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "here are");
  return (
    <Card top={TOP} h={H} d={d} title="Agency Agents">
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 50, paddingTop: 170}}>
        {/* "Here are the three": the chip lands on "Here" (the card must not sit blank ~2 s until "three") */}
        <Chip d={d} at={2} text="The three" size={130} />
        <div style={{whiteSpace: "nowrap"}}><Chip d={d} at={c("small business")} text="Small business" size={84} /></div>
      </div>
    </Card>
  );
};

// 7 "The Outbound Strategist picks who to target and your cold email sequence": the real agent file, name -> ICP -> cold emails
const OUT = "ai-agency/agency-agents_outbound-strategist.png";   // 1800x7200, page from 300 css px
const S7Outbound: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "the outbound");
  const p = c("picks"), e = c("call email");
  return (
    <Card top={TOP} h={H} d={d} url={FILES + "sales/sales-outbound-strategist.md"}>
      <Shot d={d} src={OUT} iw={1800} ih={7200}
        keys={[{at: 0, cx: 740, cy: 330, w: 900}, {at: p - 14, cx: 740, cy: 330, w: 900}, {at: p - 2, cx: 540, cy: 3250, w: 1000},
          {at: e - 14, cx: 540, cy: 3250, w: 1000}, {at: e - 2, cx: 540, cy: 6900, w: 1000}]}
        marks={[{x: 335, y: 164, w: 300, h: 54, from: 2, to: 16}, {x: 92, y: 3104, w: 766, h: 72, from: p, to: p + 8, box: true},
          {x: 92, y: 6847, w: 675, h: 62, from: e, to: e + 8, box: true}]} />
    </Card>
  );
};

// 8 "The Proposal Strategist turns a sales call into a written proposal": name, "transforms ... sales opportunities", "proposals"
const S8Proposal: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "the proposal");
  const t = c("turns"), w = c("written proposal");
  return (
    <Card top={TOP} h={H} d={d} url={FILES + "sales/sales-proposal-strategist.md"}>
      <Shot d={d} src="ai-agency/agency-agents_proposal-strategist.png" iw={1800} ih={3000}
        keys={[{at: 0, cx: 760, cy: 820, w: 900}, {at: t - 12, cx: 760, cy: 820, w: 900}, {at: t, cx: 1230, cy: 830, w: 900},
          {at: w - 12, cx: 1230, cy: 830, w: 900}, {at: w, cx: 760, cy: 860, w: 900}]}
        marks={[{x: 330, y: 724, w: 290, h: 54, from: 2, to: 16}, {x: 800, y: 798, w: 863, h: 50, from: t, to: c("sales call") + 10},
          {x: 336, y: 846, w: 149, h: 50, from: c("sales call") + 10, to: c("into")}, {x: 602, y: 894, w: 353, h: 50, from: w, to: w + 8, box: true}]} />
    </Card>
  );
};

// 9 "And the Customer Service agent handles questions and complaints, and knows when to hand it to a human"
const S9Support: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "and the customer");
  const q = c("questions"), k = c("complaints"), h = c("hand it");
  return (
    <Card top={TOP} h={H} d={d} url={FILES + "specialized/customer-service.md"}>
      <Shot d={d} src="ai-agency/agency-agents_customer-service.png" iw={1800} ih={3000}
        keys={[{at: 0, cx: 760, cy: 850, w: 900}, {at: q - 12, cx: 760, cy: 850, w: 900}, {at: q, cx: 1230, cy: 900, w: 900},
          {at: k - 8, cx: 1230, cy: 900, w: 900}, {at: k + 4, cx: 760, cy: 940, w: 900}]}
        marks={[{x: 330, y: 724, w: 270, h: 54, from: 2, to: 16}, {x: 1296, y: 872, w: 271, h: 50, from: q, to: q + 14},
          {x: 336, y: 920, w: 166, h: 50, from: k, to: k + 10}, {x: 902, y: 920, w: 287, h: 50, from: h, to: h + 8, box: true},
          {x: 524, y: 1164, w: 200, h: 50, from: c("human"), to: c("human") + 12}]} />
    </Card>
  );
};

// 10 "That's prospecting, closing, and support, without three new hires": each word lands, then the hires are struck out
const S10Recap: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "that's prospecting");
  const strike = interpolate(d, [c("hires"), c("hires") + 10], [0, 100], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return (
    <Card top={TOP} h={H} d={d} title="Agency Agents">
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 18}}>
        <Chip d={d} at={c("prospecting")} text="Prospecting" size={72} />
        <Chip d={d} at={c("closing")} text="Closing" size={72} />
        <Chip d={d} at={c("support")} text="Support" size={72} />
        <div style={{position: "relative", marginTop: 4, fontFamily: SANS, fontWeight: 800, fontSize: 64, color: INK, letterSpacing: -1.5, opacity: d >= c("three") ? 1 : 0}}>
          Three new hires
          <div style={{position: "absolute", left: 0, top: "52%", height: 9, width: `${strike}%`, background: BAD, borderRadius: 4}} />
        </div>
      </div>
    </Card>
  );
};

// 11 "And it's free. Link's in the description."
const S11End: React.FC<{d: number}> = ({d}) => <EndCard d={d} />;

export const aiagency = makeShort({
  slug: "ai-agency",
  words: WS,
  // from the CUT transcript (shorts-guide 3e): "Agentsy", "169 ,000", "call email" (he said "cold"), "Cloud"
  fix: {cloud: "Claude", agentsy: "Agency", "169 ,000": "169 thousand", rep: "reps", "call email": "cold email", links: "Link's"},
  key: ["free", "169", "one", "once", "name", "three", "target", "proposal", "human", "prospecting", "closing", "support", "hires"],
  noun: ["claude", "agency", "agents", "github", "outbound", "strategist", "customer", "service"],
  anchors: [
    ["283 free", S1Hook], ["it's called", S2Repo], ["each agent", S3One], ["engineers", S4Roles], ["you install", S5Install],
    ["here are", S6Three], ["the outbound", S7Outbound], ["the proposal", S8Proposal], ["and the customer", S9Support],
    ["that's prospecting", S10Recap], ["and it's free", S11End],
  ],
  // FULL (no face): the name + stars on the real repo page, the how-to (install + ask by name), and "Here are the three"
  // (covers a hand-to-face moment in the take at ~26-27 s of the cut)
  full: [["it's called", 7.4], ["you install", 3.9], ["here are", 4.4]],
  hookEnd: 1,
  hook: {brand: "283 Free", rest: "AI Specialists", box: "Within Claude Code", brandColor: "#0085FF", size: 76},
  faceSrcTop: 625,
});
