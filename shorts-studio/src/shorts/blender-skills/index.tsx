// Blender Skills Short v2 (Nov 18 2026): "Claude Code can now build 3D models in Blender" (arjun988/blender-skills, MIT).
// Built to the Short 04 v3 standard (shorts-guide 3-ter / 3g / 3h): REAL screenshots (shoot.py, Playwright 2x, Nov 18 2026) of the
// GitHub repo + README, panned and highlighted ON the spoken word (kit cues()); FULL spans for the name + stars, the Blender MCP
// connection, and the director routing chain (the hard parts); on-screen text only repeats what is said; no drawn mocks, no music.
// The README's code blocks were wrapped at shot time (shoot.py --css) so the whole routing chain is on the image.
// Facts re-verified Nov 18 2026 (GitHub API): 4,282 stars, 387 forks, MIT, 94 skills; the README says "The blender-director skill
// analyzes your request and routes automatically" with the rifle chain hard-surface > uv-workflow > materials > ... > export-pipeline,
// "Attach a photo or concept art and the agent matches it", and "Blender (running) <- BlenderMCP addon <- ... Claude Code".
// Script line 10 ("One catch: ... a paid Claude plan") was CUT from the Short: our own AI subscription is never a catch (3-ter rule 7).
// The earlier draft (drawn mocks on placeholder timing) is kept at D:/Shorts/blender-skills/index_draft_placeholder.tsx.
import React from "react";
import {Card, Shot, Chip, EndCard, makeShort, cues, TOP, H, HOOK_TOP, HOOK_H, W} from "../../kit";
import words from "./words.json";

const WS = words as W[];
const URL = "github.com/arjun988/blender-skills";
const R = "blender-skills/blender_repo_full.png";   // 1800x17382, whole repo page, code blocks wrapped
const IW = 1800, IH = 17382;
type B = {x: number; y: number; w: number; h: number};
const hl = (b: B, from: number, to: number) => ({...b, from, to});
const bx = (b: B, at: number) => ({...b, from: at, to: at + 8, box: true});

// 1 (hook, under the title) "Claude Code can now build 3D models in Blender for you": the README's own 3D render, slow push-in
const S1Hook: React.FC<{d: number}> = ({d}) => (
  <Card top={HOOK_TOP} h={HOOK_H} d={d} url={URL}>
    <Shot d={d} src={R} iw={IW} ih={IH} boxH={316}
      keys={[{at: 0, cx: 636, cy: 2463, w: 1000}, {at: 130, cx: 690, cy: 2450, w: 800}]} />
  </Card>
);

// 2 FULL "It's called Blender Skills, a free pack of 94 skills with more than 4,000 stars on GitHub": the name, the README's
// "94 Specialized Skills", then the Star button
const S2Repo: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "it's called");
  const n = c("94"), st = c("stars");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 520, cy: 380, w: 900}, {at: n - 12, cx: 520, cy: 380, w: 900}, {at: n, cx: 620, cy: 2850, w: 1040},
          {at: st - 22, cx: 620, cy: 2850, w: 1040}, {at: st - 8, cx: 1420, cy: 380, w: 700}]}
        marks={[hl({x: 90, y: 344, w: 252, h: 60}, c("blender"), c("pack")), hl({x: 113, y: 2837, w: 582, h: 50}, n, n + 14),
          bx({x: 1564, y: 340, w: 206, h: 64}, st - 4)]} />
    </Card>
  );
};

// 3 "Each skill teaches Claude one job a 3D artist does": the Modeling row of the skill table, each "-artist" skill on "artist"
const S3Job: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "each skill");
  const a = c("artist");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 640, cy: 7210, w: 1090}]}
        marks={[bx({x: 114, y: 7184, w: 164, h: 64}, c("one job")),
          hl({x: 828, y: 7143, w: 163, h: 50}, a, a + 6), hl({x: 466, y: 7191, w: 274, h: 50}, a + 4, a + 10), hl({x: 466, y: 7239, w: 211, h: 50}, a + 8, a + 14)]} />
    </Card>
  );
};

// 4 "Modeling, materials, lighting, rigging, animation, and even export to Unity, Unreal and Godot": a box on each skill as it is said
const S4List: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "modeling");
  const ri = c("rigging"), u = c("unity");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        // w 1090 = the whole table width (category names + skills); glyphs ~33 px on the frame (3h floor ~28)
        keys={[{at: 0, cx: 640, cy: 7330, w: 1090}, {at: u - 12, cx: 640, cy: 7330, w: 1090}, {at: u, cx: 640, cy: 7560, w: 1090}]}
        marks={[bx({x: 114, y: 7184, w: 164, h: 64}, 0), bx({x: 880, y: 7306, w: 152, h: 64}, c("materials")),
          bx({x: 625, y: 7428, w: 132, h: 64}, c("lightning")), bx({x: 875, y: 7476, w: 125, h: 64}, ri), bx({x: 718, y: 7476, w: 165, h: 64}, c("animation")),
          bx({x: 606, y: 7694, w: 198, h: 64}, u), bx({x: 796, y: 7694, w: 216, h: 64}, c("reel")),
          hl({x: 1009, y: 7701, w: 111, h: 50}, c("godot"), c("godot") + 4), hl({x: 380, y: 7749, w: 103, h: 50}, c("godot") + 4, c("godot") + 8)]} />
    </Card>
  );
};

// 5 FULL "You connect Blender to Claude once with a free add-on called Blender MCP": the README's Blender MCP section,
// "Connect to Claude" on "connect", the "Blender (running) <- BlenderMCP addon <- ... Claude Code" line on its words
const S5Mcp: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "you connect");
  const ad = c("item");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 590, cy: 9480, w: 980}, {at: ad - 10, cx: 590, cy: 9480, w: 980}, {at: ad, cx: 590, cy: 9330, w: 980}]}
        marks={[bx({x: 684, y: 9605, w: 294, h: 64}, c("connect")), hl({x: 124, y: 9277, w: 266, h: 40}, ad, ad + 6),
          hl({x: 842, y: 9277, w: 177, h: 40}, ad + 4, ad + 10), bx({x: 416, y: 9270, w: 265, h: 54}, c("called"))]} />
    </Card>
  );
};

// 6 "Then you just describe what you want. Say, a low poly sci-fi rifle for a game": the README's own rifle request
const S6Ask: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "then you just");
  const r = c("sci");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 520, cy: 5720, w: 860}]}
        marks={[hl({x: 124, y: 5727, w: 300, h: 40}, c("describe"), c("want") + 8), bx({x: 417, y: 5720, w: 204, h: 54}, r),
          hl({x: 230, y: 5727, w: 190, h: 40}, c("game"), c("game") + 8)]} />
    </Card>
  );
};

// 7 FULL "A director skill reads your request and picks the right skills in order": the README sentence, word for word
const S7Director: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "skill reads");
  const p = c("picks");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 600, cy: 5700, w: 1000}]}
        marks={[bx({x: 146, y: 5569, w: 260, h: 64}, 0), hl({x: 464, y: 5576, w: 316, h: 50}, c("reads"), c("request") + 8),
          hl({x: 846, y: 5576, w: 294, h: 50}, p, c("order")), hl({x: 152, y: 5806, w: 248, h: 40}, c("order"), c("order") + 10)]} />
    </Card>
  );
};

// 8 FULL "Model, then UVs, then materials, then export": the rifle's routing chain, a box per step as it is said
const S8Chain: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "model then");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 600, cy: 5700, w: 1000}]}   // same view as scene 7: only the boxes change
        marks={[bx({x: 432, y: 5800, w: 204, h: 52}, 0), bx({x: 656, y: 5800, w: 189, h: 52}, c("uvs")),
          bx({x: 866, y: 5800, w: 159, h: 52}, c("materials")), bx({x: 432, y: 5839, w: 248, h: 52}, c("export"))]} />
    </Card>
  );
};

// 9 "Claude does the work inside Blender": the README, "Every skill executes directly in Blender"
const S9Inside: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "claude does");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 590, cy: 9200, w: 980}]}
        marks={[hl({x: 92, y: 9117, w: 279, h: 50}, 2, c("inside")), bx({x: 362, y: 9110, w: 288, h: 64}, c("inside"))]} />
    </Card>
  );
};

// 10 "You can even attach a photo, and it builds a match": the README's Reference Image Matching line
const S10Photo: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "you can even");
  const m = c("much");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <Shot d={d} src={R} iw={IW} ih={IH}
        keys={[{at: 0, cx: 590, cy: 6480, w: 980}]}
        marks={[hl({x: 92, y: 6510, w: 228, h: 50}, c("attach"), c("photo") + 8), bx({x: 726, y: 6503, w: 172, h: 64}, m)]} />
    </Card>
  );
};

// 11 "But the skills are open source and free": each word lands as it is said
const S11Free: React.FC<{d: number}> = ({d}) => {
  const c = cues(WS, "but the skills");
  return (
    <Card top={TOP} h={H} d={d} url={URL}>
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 60, height: 548, whiteSpace: "nowrap"}}>
        <Chip d={d} at={c("open")} text="Open source" size={120} />
        <Chip d={d} at={c("free")} text="Free" size={150} />
      </div>
    </Card>
  );
};

// 12 "Link's in the description."
const S12End: React.FC<{d: number}> = ({d}) => <EndCard d={d} big="Free" />;

export const blenderskills = makeShort({
  slug: "blender-skills",
  words: WS,
  // from the CUT transcript (shorts-guide 3e: never the raw one)
  fix: {cloud: "Claude", links: "Link's", "4 ,000": "4,000", lightning: "lighting", "and reel": "Unreal",
    item: "add-on", mcp: "MCP", "director's": "director", "does much": "builds a match", blender: "Blender", "sci -fi": "sci-fi"},
  key: ["3d", "free", "94", "one", "job", "once", "describe", "director", "order", "inside", "photo", "match", "open"],
  noun: ["claude", "code", "blender", "skills", "github", "unity", "unreal", "godot", "mcp", "add-on"],
  anchors: [
    ["cloud code can", S1Hook], ["it's called", S2Repo], ["each skill", S3Job], ["modeling", S4List], ["you connect", S5Mcp],
    ["then you just", S6Ask], ["a director skill", S7Director], ["model then", S8Chain], ["claude does", S9Inside], ["you can even", S10Photo],
    ["but the skills", S11Free], ["link's in the", S12End],
  ],
  // FULL (no face): the name + stars, the Blender MCP connection, and the director routing chain (the hard parts). Spans
  // stretched over look-aways the checker found (Nov 18): a hand at the face on "Each skill" (12.5 s), eyes off-lens in the
  // pauses around "You connect ... Blender MCP" (24.5 s, 30.5 s); the chain span covers two hand moments (39.6-41.2 s, 47 s)
  full: [["it's called", 9.0], ["godot", 7.3], ["a director skill", 11.6]],
  hookEnd: 1,
  hook: {brand: "Claude Code", rest: "Now Builds", box: "3D Models In Blender", size: 80, boxSize: 86},
  faceSrcTop: 776,   // hair top at source y ~850 on 2 frames (5 s, 30 s)
  faceFit: "zoom",   // close take: chin at source y ~1670 (shorts-guide 3h), full width would cut the chin and show no shoulders
});
