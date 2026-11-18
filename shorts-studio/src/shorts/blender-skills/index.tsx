// Blender Skills Short (Nov 18 2026): "Claude Code + Blender, 94 free 3D skills" (arjun988/blender-skills, MIT, 4,250 stars).
// Scenes anchored to scripts/blender-skills.txt. Facts verified Nov 18 2026: repo README + GitHub API (4,256 stars), and the
// MCP for Blender README (ahujasid/blender-mcp: sidebar N > "MCP for Blender" tab > Connect to Claude; tools execute_blender_code, look).
// The routing chain is the README's own rifle example. The rifle prompt, terminal, viewport and reference photo are ILLUSTRATIVE mocks, tagged EXAMPLE.
import React from "react";
import {interpolate} from "remotion";
import {Card, Mono, Pill, Sweep, Icon, Logo, Cursor, typed, pop, makeShort, SANS, SERIF, MONO, BLUE, INK, OK, GOLDFISH, TOP, H, HOOK_TOP, HOOK_H, REPO, W} from "../../kit";
import words from "./words.json";

const FILE = "github.com/arjun988/blender-skills";
const ORANGE = "#E87D0D"; // Blender's logo orange
const ramp = (d: number, a: number, b: number) => interpolate(d, [a, b], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

// Full-colour logo or flat icon in a white rounded square (Nick's logo tiles)
const Tile: React.FC<{src: string; size: number; k?: number}> = ({src, size, k = 1}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.24, background: "#fff", boxShadow: "0 6px 22px rgba(0,0,0,.12)", display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, opacity: k, transform: `scale(${0.7 + 0.3 * k})`}}><Logo src={src} size={size * 0.66} /></div>
);
const Tag: React.FC<{text: string; dark?: boolean}> = ({text, dark}) => (
  <span style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: "#fff", background: dark ? "#4A4F55" : "#6B7480", borderRadius: 8, padding: "3px 10px"}}>{text}</span>
);
const Chip: React.FC<{text: string; k: number}> = ({text, k}) => (
  <span style={{display: "inline-block", padding: "8px 18px", border: "2px solid #D1D9E0", borderRadius: 12, background: "#F4F6F9", color: "#59636E", fontFamily: SANS, fontWeight: 700, fontSize: 34,
    opacity: k, transform: `scale(${0.85 + 0.15 * k})`}}>{text}</span>
);

// 1 "Claude Code can now build 3D models in Blender for you." the real repo page (hook zone, under the hook title)
const S1Repo: React.FC<{d: number}> = ({d}) => (
  <Card top={HOOK_TOP} h={HOOK_H} d={d} fill={1.1} url={FILE}>
    <div style={{fontFamily: SANS}}>
      <div style={{display: "flex", alignItems: "center", gap: 16}}>
        <Logo src="github-icon.svg" size={52} />
        <div style={{fontSize: 42, color: "#1F2328"}}><span style={{color: "#0969DA"}}>arjun988</span> / <b style={{color: "#0969DA"}}>blender-skills</b></div>
      </div>
      <div style={{marginTop: 22, fontSize: 34, color: "#3B434C", lineHeight: 1.35}}><Sweep d={d} from={8} to={34}>94 specialist Blender skills for Cursor, Claude Code, Kiro & Codex</Sweep></div>
      <div style={{marginTop: 24, display: "flex", alignItems: "center", gap: 14, fontSize: 34, fontWeight: 600, color: "#1F2328"}}>
        {["★ 4,250", "MIT", "94 skills"].map((x, i) => (
          <span key={x} style={{padding: "6px 16px", border: "2px solid #D1D9E0", borderRadius: 10, opacity: pop(d, 34 + i * 8)}}>{x}</span>
        ))}
        <span style={{marginLeft: "auto", display: "flex", gap: 12, opacity: pop(d, 60)}}><Logo src="blender.svg" size={50} /><Logo src="claude-icon.svg" size={50} /></span>
      </div>
    </div>
  </Card>
);

// 2 "It's called Blender Skills, a free pack of 94 skills with over four thousand stars on GitHub."
const S2Name: React.FC<{d: number}> = ({d}) => {
  const stars = Math.round(interpolate(d, [110, 150], [0, 4250], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}));
  const kStar = pop(d, 105);
  return (
    <Card top={HOOK_TOP} h={HOOK_H} d={d} title="Blender Skills">
      <div style={{fontFamily: SANS, color: INK, textAlign: "center"}}>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 92, color: BLUE, lineHeight: 1.05, letterSpacing: -1, opacity: pop(d, 12)}}>Blender Skills</div>
        <div style={{marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, fontSize: 44, fontWeight: 800, letterSpacing: -1}}>
          <Tile src="blender.svg" size={90} k={pop(d, 24)} /><span style={{opacity: pop(d, 24)}}>Blender</span>
          <span style={{color: "#9A9E9F", opacity: pop(d, 30)}}>+</span>
          <Tile src="claude-icon.svg" size={90} k={pop(d, 34)} /><span style={{opacity: pop(d, 34)}}>Claude Code</span>
        </div>
        <div style={{marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", gap: 14}}>
          <Chip text="Free" k={pop(d, 50)} />
          <Chip text="94 skills" k={pop(d, 76)} />
          <span style={{display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 18px", border: `3px solid ${BLUE}`, borderRadius: 12, background: "#E7F1FF", color: "#0B3D91",
            fontWeight: 800, fontSize: 34, opacity: kStar, transform: `scale(${0.85 + 0.15 * kStar})`}}>
            <Logo src="github-icon.svg" size={36} />★ {stars.toLocaleString("en-US")} stars</span>
        </div>
      </div>
    </Card>
  );
};

// 3 "Each skill teaches Claude one job a 3D artist does." the skills folder, one folder per job
const FOLDERS = ["hard-surface", "uv-workflow", "materials", "lighting", "rigging"];
const S3OneJob: React.FC<{d: number}> = ({d}) => {
  const k1 = pop(d, 4), k2 = pop(d, 40);
  return (
    <Card top={TOP} h={H} d={d} url={FILE + "/.claude/skills"}>
      <div style={{fontFamily: SANS}}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 28, fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 104, lineHeight: 1}}>
          <span style={{color: INK, opacity: k1, transform: `scale(${0.85 + 0.15 * k1})`}}>1 skill</span>
          <span style={{color: "#9A9E9F", opacity: k2}}>=</span>
          <span style={{color: BLUE, opacity: k2, transform: `scale(${0.85 + 0.15 * k2})`}}>1 job</span>
        </div>
        <div style={{marginTop: 30, borderRadius: 18, border: "2px solid #E1E5EA", background: "#F8FAFC", padding: "14px 22px"}}>
          {FOLDERS.map((f, i) => {
            const k = pop(d, 10 + i * 6);
            return (
              <div key={f} style={{display: "flex", alignItems: "center", gap: 18, height: 70, borderBottom: "1px solid #E1E5EA", opacity: k, transform: `translateX(${(1 - k) * -30}px)`}}>
                <Logo src="file_folder_flat.svg" size={48} />
                <span style={{fontFamily: MONO, fontSize: 40, color: INK}}>{f}/</span>
                <span style={{marginLeft: "auto", fontFamily: MONO, fontSize: 30, color: "#8A9199"}}>SKILL.md</span>
              </div>
            );
          })}
          <div style={{height: 64, display: "flex", alignItems: "center", fontSize: 36, fontWeight: 800, color: BLUE, opacity: pop(d, 46)}}>+ 89 more skills</div>
        </div>
      </div>
    </Card>
  );
};

// 4 "Modeling, materials, lighting, rigging, animation," one row pops per spoken word (sub = the real skill folder)
const JOBS: [string, string, string, number][] = [["hammer_and_wrench_flat.svg", "Modeling", "blender-modeler", 0], ["artist_palette_flat.svg", "Materials", "materials", 14],
  ["light_bulb_flat.svg", "Lighting", "lighting", 28], ["bone_flat.svg", "Rigging", "rigging", 42], ["film_flat.svg", "Animation", "animation", 55]];
const S4Jobs: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} url={FILE}>
    <div style={{fontFamily: SANS, display: "flex", flexDirection: "column", gap: 14}}>
      {JOBS.map(([src, t, sub, at]) => {
        const k = pop(d, at);
        return (
          <div key={t} style={{display: "flex", alignItems: "center", gap: 28, height: 104, opacity: k, transform: `translateX(${(1 - k) * -40}px)`}}>
            <Tile src={src} size={100} k={k} />
            <span style={{fontSize: 64, fontWeight: 800, color: INK, letterSpacing: -1.5}}>{t}</span>
            <span style={{marginLeft: "auto", fontFamily: MONO, fontSize: 30, color: "#59636E"}}>{sub}</span>
          </div>
        );
      })}
    </div>
  </Card>
);

// 5 "even export to Unity, Unreal and Godot." the three real export skills
const ENGINES: [string, string, string, number][] = [["unity.svg", "Unity", "unity-export", 26], ["unrealengine-icon.svg", "Unreal", "unreal-export", 38], ["godot-icon.svg", "Godot", "godot-export", 56]];
const S5Export: React.FC<{d: number}> = ({d}) => {
  const k = pop(d, 0);
  return (
    <Card top={TOP} h={H} d={d} title="Pipeline skills">
      <div style={{fontFamily: SANS}}>
        <div style={{display: "flex", alignItems: "center", gap: 24, opacity: k, transform: `scale(${0.9 + 0.1 * k})`, transformOrigin: "left center"}}>
          <Icon src="package_flat.svg" color={GOLDFISH} size={100} />
          <span style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 84, color: BLUE, letterSpacing: -1}}>Export to</span>
        </div>
        <div style={{marginTop: 26, display: "flex", flexDirection: "column", gap: 20}}>
          {ENGINES.map(([src, n, skill, at]) => {
            const q = pop(d, at);
            return (
              <div key={n} style={{display: "flex", alignItems: "center", gap: 26, padding: "16px 22px", borderRadius: 20, background: "#F6F8FB", border: "2px solid #D1D9E0", opacity: q, transform: `scale(${0.9 + 0.1 * q})`}}>
                <Tile src={src} size={104} />
                <span style={{fontSize: 62, fontWeight: 800, color: INK, letterSpacing: -1.5}}>{n}</span>
                <span style={{marginLeft: "auto", fontFamily: MONO, fontSize: 30, color: "#59636E"}}>{skill}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

// 6 "You connect Blender to Claude once, with a free add-on called Blender MCP." Blender <-> MCP for Blender <-> Claude Code
const Node: React.FC<{src: string; label: string; k: number; icon?: boolean}> = ({src, label, k, icon}) => (
  <div style={{width: 200, textAlign: "center", opacity: k, transform: `scale(${0.8 + 0.2 * k})`, flexShrink: 0}}>
    <div style={{display: "flex", justifyContent: "center"}}>
      {icon ? <div style={{width: 130, height: 130, borderRadius: 32, background: "#E7F1FF", border: `3px solid ${BLUE}`, display: "flex", alignItems: "center", justifyContent: "center"}}><Logo src={src} size={84} /></div>
        : <Tile src={src} size={130} />}
    </div>
    <div style={{marginTop: 12, fontFamily: SANS, fontWeight: 800, fontSize: 32, color: INK, lineHeight: 1.1}}>{label}</div>
  </div>
);
const Wire: React.FC<{p: number}> = ({p}) => (
  <div style={{flex: 1, height: 8, marginTop: -40, borderRadius: 4, background: `linear-gradient(90deg, ${BLUE} ${p * 100}%, #D1D9E0 0)`}} />
);
const S6Connect: React.FC<{d: number}> = ({d}) => {
  const press = d > 112;
  return (
    <Card top={TOP} h={H} d={d} title="Connect once">
      <div style={{fontFamily: SANS}}>
        <div style={{display: "flex", alignItems: "center"}}>
          <Node src="blender.svg" label="Blender" k={pop(d, 14)} />
          <Wire p={ramp(d, 80, 96)} />
          <Node icon src="electric_plug_flat.svg" label="MCP for Blender" k={pop(d, 76)} />
          <Wire p={ramp(d, 96, 112)} />
          <Node src="claude-icon.svg" label="Claude Code" k={pop(d, 34)} />
        </div>
        <div style={{marginTop: 30, borderRadius: 18, background: "#2B2B2B", border: "2px solid #3A3A3A", padding: "18px 24px", opacity: pop(d, 90)}}>
          <div style={{display: "flex", alignItems: "center", gap: 14}}>
            <span style={{fontFamily: MONO, fontSize: 28, color: "#fff", background: "#4A4A4A", borderRadius: 6, padding: "2px 12px"}}>N</span>
            <span style={{fontFamily: SANS, fontWeight: 600, fontSize: 30, color: "#B8B8B8"}}>Blender sidebar › <b style={{color: "#fff"}}>MCP for Blender</b></span>
          </div>
          <div style={{marginTop: 16, height: 78, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 700, fontSize: 38,
            color: "#fff", background: press ? "#4772B3" : "#545454", border: `2px solid ${press ? "#7AA2E0" : "#666"}`, transform: `scale(${d > 112 && d < 118 ? 0.97 : 1})`}}>Connect to Claude</div>
          <div style={{display: "flex", gap: 14}}>
            <Pill ok text="Free add-on" d={d} at={70} />
            <Pill ok text="Connected" d={d} at={118} />
          </div>
        </div>
      </div>
    </Card>
  );
};

// 7 "Then you just describe what you want. Say, a low poly sci-fi rifle for a game." Claude Code typing the ask
const ASK = "Build a low poly sci-fi\n  rifle for a game";
const S7Ask: React.FC<{d: number}> = ({d}) => {
  const doneAt = 56 + Math.ceil((ASK.length / 30) * 30);
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.12} title="Terminal · ~/rifle-game">
      <Mono c="#fff" size={44}>{"$ " + typed("claude", d, 0, 40)}{d < 6 && <Cursor d={d} />}</Mono>
      {d > 6 && <div style={{display: "flex", alignItems: "center", gap: 14}}><Logo src="claude-icon.svg" size={40} /><Mono c="#8A8A8A" size={32}>Claude Code · ~/rifle-game</Mono></div>}
      {d > 14 && <Mono c="#5BD68A" size={34}>● MCP for Blender · connected</Mono>}
      {d > 22 && <Mono c="#8A8A8A" size={34}>  .claude/skills · 94 skills</Mono>}
      <div style={{marginTop: 22, padding: "10px 18px", borderRadius: 12, border: "2px solid #3A3A3A", background: "#232323", minHeight: 150, boxSizing: "border-box"}}>
        <Mono c="#fff" size={46}>{"> " + typed(ASK, d, 56, 30)}{d > 28 && d < doneAt + 20 && <Cursor d={d} />}</Mono>
      </div>
      <div style={{display: "flex", alignItems: "center", gap: 16}}>
        <Pill ok text="Plain English, no code" d={d} at={doneAt + 6} />
        <span style={{marginTop: 14, opacity: pop(d, doneAt + 6)}}><Tag dark text="EXAMPLE" /></span>
      </div>
    </Card>
  );
};

// 8 + 9 "A director skill reads your request and picks the right skills, in order." then "Model, then UVs, then materials, then export."
// Chain = the README's own rifle example: blender-director -> hard-surface -> uv-workflow -> materials -> asset-optimization -> export-pipeline
const CHAIN: [string, string, number][] = [["hard-surface", "Model", 0], ["uv-workflow", "UVs", 20], ["materials", "Materials", 40], ["asset-optimization", "Optimize", 52], ["export-pipeline", "Export", 62]];
const Chain: React.FC<{d: number; run?: boolean}> = ({d, run}) => {
  const read = run ? 1 : ramp(d, 26, 56);
  return (
    <Card top={TOP} h={H} d={run ? 30 : d} url={FILE + "/blender-director"}>
      <div style={{fontFamily: SANS}}>
        <div style={{display: "flex", alignItems: "center", gap: 14}}>
          <span style={{fontFamily: MONO, fontSize: 32, color: INK, padding: "8px 16px", borderRadius: 12, border: "2px solid #D1D9E0",
            background: `linear-gradient(90deg, #B3D7FF ${read * 100}%, #F4F6F9 0)`}}>"low poly sci-fi rifle for a game"</span>
        </div>
        <div style={{marginTop: 18, display: "flex", alignItems: "center", gap: 20, padding: "14px 20px", borderRadius: 18, background: "#E7F1FF", border: `3px solid ${BLUE}`,
          opacity: run ? 1 : pop(d, 6), transform: `scale(${run ? 1 : 0.9 + 0.1 * pop(d, 6)})`}}>
          <Icon src="bullseye_flat.svg" color={BLUE} size={64} />
          <span style={{fontFamily: MONO, fontWeight: 700, fontSize: 44, color: "#0B3D91"}}>blender-director</span>
          <span style={{marginLeft: "auto", fontSize: 30, fontWeight: 700, color: "#59636E"}}>{run ? "routing" : read < 1 ? "reading..." : "picks skills"}</span>
        </div>
        <div style={{marginTop: 14, display: "flex", flexDirection: "column", gap: 10, paddingLeft: 34, borderLeft: "4px solid #D1D9E0", marginLeft: 30}}>
          {CHAIN.map(([skill, word, at], i) => {
            const k = run ? 1 : pop(d, 62 + i * 8);
            const lit = run && d >= at;
            const q = run ? pop(d, at) : 0;
            return (
              <div key={skill} style={{display: "flex", alignItems: "center", gap: 18, height: 66, padding: "0 18px", borderRadius: 14, opacity: k, transform: `translateX(${(1 - k) * -30}px)`,
                background: lit ? "#EAF7EE" : "#F6F8FB", border: `2px solid ${lit ? OK : "#E1E5EA"}`}}>
                <span style={{width: 44, height: 44, borderRadius: 22, background: lit ? OK : "#9AA4AE", color: "#fff", fontWeight: 800, fontSize: 28, display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0, opacity: run ? 1 : pop(d, 100 + i * 4)}}>{lit ? "✓" : i + 1}</span>
                <span style={{fontFamily: MONO, fontSize: 36, color: INK}}>{skill}</span>
                <span style={{marginLeft: "auto", fontSize: 34, fontWeight: 800, color: lit ? OK : "#9AA4AE", opacity: run ? 0.4 + 0.6 * q : 1}}>{word}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
const S8Director: React.FC<{d: number}> = ({d}) => <Chain d={d} />;
const S9Run: React.FC<{d: number}> = ({d}) => <Chain d={d} run />;

// 10 "Claude does the work inside Blender." MCP tool calls + a low-poly rifle assembling in a viewport (illustrative)
const PARTS: [React.CSSProperties, number][] = [
  [{left: 230, top: 140, width: 300, height: 70, background: "#9AA4AE"}, 4],
  [{left: 530, top: 156, width: 230, height: 28, background: "#7D8792"}, 10],
  [{left: 90, top: 146, width: 150, height: 96, background: "#6E7A86", clipPath: "polygon(0 30%, 100% 0, 100% 75%, 0 100%)"}, 16],
  [{left: 390, top: 206, width: 62, height: 92, background: "#5C6874", transform: "skewX(-14deg)"}, 22],
  [{left: 300, top: 96, width: 180, height: 38, background: "#3E4A56", borderRadius: 10}, 28],
  [{left: 756, top: 150, width: 26, height: 40, background: GOLDFISH, borderRadius: 4}, 34],
];
const CALLS: [string, number][] = [["● execute_blender_code  (model)", 2], ["● execute_blender_code  (materials)", 16], ["● look  (viewport)", 30]];
const S10Build: React.FC<{d: number}> = ({d}) => {
  const last = PARTS.reduce((a, [, at], i) => (d >= at ? i : a), -1);
  return (
    <Card dark top={TOP} h={H} d={d} title="Blender · rifle.blend">
      <div style={{display: "flex", alignItems: "center", gap: 14}}><Logo src="blender.svg" size={44} /><Mono c="#8A8A8A" size={30}>Claude via MCP for Blender</Mono><span style={{marginLeft: "auto"}}><Tag dark text="EXAMPLE" /></span></div>
      {CALLS.map(([t, at]) => d > at && <Mono key={t} c="#FFD479" size={32}>{t}</Mono>)}
      <div style={{position: "relative", marginTop: 14, height: 330, borderRadius: 16, overflow: "hidden", background: "#3A3A3A",
        backgroundImage: "linear-gradient(#444 2px, transparent 2px), linear-gradient(90deg, #444 2px, transparent 2px)", backgroundSize: "48px 48px"}}>
        <div style={{position: "absolute", left: 0, right: 0, top: 260, height: 3, background: "#8B3A3A"}} />
        {PARTS.map(([st, at], i) => {
          const k = pop(d, at);
          return <div key={i} style={{position: "absolute", ...st, opacity: k, outline: i === last ? `4px solid ${ORANGE}` : "none", transform: `${st.transform ?? ""} scale(${0.8 + 0.2 * k})`}} />;
        })}
      </div>
      <Pill ok text="Built inside Blender" d={d} at={44} />
    </Card>
  );
};

// 11 "You can even attach a photo, and it builds a match." README: analyze first, then build, compare screenshots in a loop
const STEPS = ["Camera match", "Geometry", "Materials", "Lighting", "Screenshot compare"];
const S11Photo: React.FC<{d: number}> = ({d}) => {
  const box = (bg: string, line: string, k: number, children: React.ReactNode) => (
    <div style={{width: 330, height: 220, borderRadius: 22, background: bg, border: `3px solid ${line}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 12, opacity: k, transform: `scale(${0.85 + 0.15 * k})`}}>{children}</div>
  );
  return (
    <Card top={TOP} h={H} d={d} title="reference-image-match">
      <div style={{fontFamily: SANS}}>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          {box("#FFF1E4", "#FBD9B8", pop(d, 6), <><Logo src="framed_picture_flat.svg" size={110} /><span style={{fontFamily: MONO, fontSize: 30, color: INK}}>reference.jpg</span></>)}
          <span style={{fontSize: 80, fontWeight: 900, color: BLUE, opacity: pop(d, 50)}}>→</span>
          {box("#E7F1FF", "#C7DDFB", pop(d, 62), <><Logo src="blender.svg" size={110} /><span style={{fontSize: 34, fontWeight: 800, color: INK}}>3D match</span></>)}
        </div>
        <div style={{marginTop: 26, display: "flex", flexWrap: "wrap", gap: 14}}>
          {STEPS.map((x, i) => {
            const k = pop(d, 20 + i * 8);
            const last = i === STEPS.length - 1;
            return <span key={x} style={{display: "inline-flex", alignItems: "center", gap: 12, padding: "12px 20px", borderRadius: 14, fontWeight: 700, fontSize: 36,
              border: `3px solid ${last ? BLUE : "#D1D9E0"}`, background: last ? "#E7F1FF" : "#F4F6F9", color: last ? "#0B3D91" : INK, opacity: k, transform: `scale(${0.85 + 0.15 * k})`}}>
              {last && <Icon src="camera_flat.svg" color={BLUE} size={40} />}{i + 1}. {x}</span>;
          })}
        </div>
        <div style={{display: "flex", alignItems: "center", gap: 16}}>
          <Pill ok text="Compares, then repeats" d={d} at={80} />
          <span style={{marginTop: 14, opacity: pop(d, 80)}}><Tag text="EXAMPLE" /></span>
        </div>
      </div>
    </Card>
  );
};

// 12 "One catch: you still need Blender installed, and a paid Claude plan." neutral need + the one real negative
const S12Needs: React.FC<{d: number}> = ({d}) => {
  const k1 = pop(d, 30), k2 = pop(d, 70);
  const row = (bg: string, line: string, k: number, children: React.ReactNode) => (
    <div style={{marginTop: 22, borderRadius: 22, background: bg, border: `2px solid ${line}`, padding: "22px 26px", display: "flex", alignItems: "center", gap: 26,
      opacity: k, transform: `scale(${0.9 + 0.1 * k})`}}>{children}</div>
  );
  return (
    <Card top={TOP} h={H} d={d} fill={1.08} title="Before you start">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{fontSize: 72, fontWeight: 800, letterSpacing: -1.5, opacity: pop(d, 0)}}>Two needs</div>
        {row("#F6F8FB", "#D1D9E0", k1, <>
          <Tile src="blender.svg" size={110} />
          <div>
            <div style={{fontSize: 48, fontWeight: 800, letterSpacing: -1}}>Blender installed</div>
            <div style={{marginTop: 12}}><Chip text="on your computer" k={pop(d, 44)} /></div>
          </div>
        </>)}
        {row("#FDEDEC", "#F5C2BE", k2, <>
          <Tile src="claude-icon.svg" size={110} />
          <div>
            <div style={{fontSize: 48, fontWeight: 800, letterSpacing: -1}}>Claude Code</div>
            <Pill text="Paid Claude plan" d={d} at={86} />
          </div>
        </>)}
      </div>
    </Card>
  );
};

// 13 "But the skills are open source and free. Link's in the description." closing card, links OUR repo (sized like web-to-api's)
const S13End: React.FC<{d: number}> = ({d}) => {
  const k = pop(d, 3), k2 = pop(d, 16);
  return (
    <Card top={TOP} h={H} d={d} fill={1.12} url={REPO}>
      <div style={{textAlign: "center", paddingTop: 20}}>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 120, color: BLUE, lineHeight: 1.05, whiteSpace: "nowrap", opacity: k, transform: `scale(${0.88 + 0.12 * k})`}}>Open source.</div>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 120, color: INK, lineHeight: 1.05, opacity: k2, transform: `scale(${0.88 + 0.12 * k2})`}}>MIT.</div>
        <div style={{marginTop: 46, fontFamily: SANS, fontWeight: 800, fontSize: 60, color: INK, letterSpacing: -1, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: pop(d, 30)}}>
          <Icon src="pin_flat.svg" color={BLUE} size={66} />Link in the description</div>
        <div style={{marginTop: 46, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: SANS, fontWeight: 600, fontSize: 36, color: "#59636E", opacity: pop(d, 36)}}>
          <Logo src="github-icon.svg" size={44} />FindingLand/youtube-skills</div>
      </div>
    </Card>
  );
};

export const blenderskills = makeShort({
  slug: "blender-skills",
  words: words as W[],
  fix: {cloud: "Claude", claud: "Claude", links: "Link's", "4,000": "four thousand", "4 ,000": "four thousand", "uv's": "UVs", uvs: "UVs", ubs: "UVs",
    gadot: "Godot", godo: "Godot", addon: "add-on", "blender's": "Blender"},
  key: ["3d", "free", "94", "one", "once", "describe", "director", "order", "photo", "match", "catch", "paid", "open"],
  noun: ["claude", "code", "blender", "github", "unity", "unreal", "godot", "mcp"],
  anchors: [
    ["claude code can", S1Repo], ["it's called", S2Name], ["each skill", S3OneJob], ["modeling materials", S4Jobs], ["even export", S5Export],
    ["you connect", S6Connect], ["then you just", S7Ask], ["a director skill", S8Director], ["model then", S9Run], ["claude does the", S10Build],
    ["you can even", S11Photo], ["one catch", S12Needs], ["but the skills", S13End],
  ],
  hookEnd: 2,
  hook: {brand: "Claude Code", rest: "+ Blender", box: "94 Free 3D Skills", brandColor: "#D97757"},
});
