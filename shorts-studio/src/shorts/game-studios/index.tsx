// Game Studios Short (Nov 18 2026): "Claude Code builds you a playable game from one sentence". Scenes anchored to scripts/game-studios.txt.
// Repo facts verified Nov 18 2026 (GitHub API + README): Donchitos/Claude-Code-Game-Studios, 40,054 stars, 5,228 forks, MIT, 49 agents, 75 skills.
// The paper-boat game, the brief lines, the question options and the checkpoint labels are OUR illustrative example, not a real run.
// Engines: README says the Godot/Unity/Unreal route is built but "Not yet shown" in their tests, so the card says "supported", never "proven".
import React from "react";
import {interpolate} from "remotion";
import {Card, Mono, Pill, Sweep, Icon, Logo, Cursor, typed, pop, makeShort, SANS, SERIF, MONO, BLUE, INK, OK, TOP, H, HOOK_TOP, HOOK_H, REPO, W} from "../../kit";
import words from "./words.json";

const GH = "github.com/Donchitos/Claude-Code-Game-Studios";
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const count = (d: number, to: number, from = 0, len = 24) => Math.round(interpolate(d, [from, from + len], [0, to], clamp));
const commas = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// Logo or icon in a white rounded square (same tile look as ai-agency)
const Tile: React.FC<{size: number; k?: number; children: React.ReactNode}> = ({size, k = 1, children}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.24, background: "#fff", boxShadow: "0 6px 22px rgba(0,0,0,.12)", display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, opacity: k, transform: `scale(${0.7 + 0.3 * k})`}}>{children}</div>
);

// ---------- the example game: paper boats racing down a rainy street (SVG, drawn, deterministic) ----------
const Boat: React.FC<{x: number; y: number; c: string; bob: number}> = ({x, y, c, bob}) => (
  <g transform={`translate(${x} ${y + Math.sin(bob) * 3}) rotate(${Math.sin(bob * 0.8) * 3})`}>
    <ellipse cx={-58} cy={24} rx={30} ry={5} fill="rgba(255,255,255,.35)" />
    <ellipse cx={0} cy={24} rx={50} ry={8} fill="rgba(0,0,0,.22)" />
    <polygon points="-50,2 50,2 32,22 -32,22" fill={c} stroke="#6B7684" strokeWidth={3} strokeLinejoin="round" />
    <polygon points="-28,2 0,-42 28,2" fill="#FFFFFF" stroke="#6B7684" strokeWidth={3} strokeLinejoin="round" />
    <line x1={0} y1={-42} x2={0} y2={2} stroke="#6B7684" strokeWidth={2.5} />
  </g>
);
const DROPS = Array.from({length: 70}, (_, i) => [((i * 137) % 100) / 100, ((i * 61) % 100) / 100, 0.8 + ((i * 29) % 40) / 100]);
const BOATS: [number, string, number][] = [[3.1, "#FFF4D6", 0], [2.6, "#DDEBFF", 1.7], [2.85, "#FFE1D6", 3.1]];
const Game: React.FC<{d: number; h: number; rain?: number; speed?: number}> = ({d, h, rain = 30, speed = 1}) => {
  const Wd = 892;
  const sky = Math.round(h * 0.3), curb = sky + 14;
  const lanes = [0.5, 0.68, 0.86].map((f) => Math.round(h * f));
  return (
    <svg viewBox={`0 0 ${Wd} ${h}`} width={Wd} height={h} style={{display: "block", borderRadius: 18}}>
      <rect x={0} y={0} width={Wd} height={h} fill="#5B6571" />
      {[[30, 60, 120], [170, 30, 150], [340, 70, 110], [470, 20, 170], [660, 50, 130], [800, 40, 120]].map(([x, top, w]) => (
        <g key={x}>
          <rect x={x} y={top} width={w} height={sky - top} fill="#47505B" />
          {[0, 1].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={x + 16 + c * (w - 32) / 3} y={top + 18 + r * 34} width={(w - 32) / 3 - 10} height={18} fill="#6E7B8A" />))}
        </g>
      ))}
      <rect x={0} y={sky} width={Wd} height={14} fill="#9AA2AB" />
      <rect x={0} y={curb} width={Wd} height={h - curb} fill="#707982" />
      {[0.59, 0.77].map((f) => Array.from({length: 7}, (_, i) => (
        <rect key={`${f}${i}`} x={((i * 150 - d * 4 * speed) % 1050 + 1050) % 1050 - 100} y={Math.round(h * f)} width={80} height={6} rx={3} fill="#C9CED3" opacity={0.8} />
      )))}
      {[[180, 0.62, 70], [520, 0.8, 90], [760, 0.55, 60]].map(([x, f, r]) => (
        <ellipse key={x} cx={((x - d * 4 * speed) % 1000 + 1000) % 1000 - 60} cy={h * f} rx={r} ry={r * 0.22} fill="#5F6873" />
      ))}
      {BOATS.map(([v, c, ph], i) => <Boat key={i} x={Math.min(Wd - 70, 110 + i * 40 + d * v * speed)} y={lanes[i]} c={c} bob={d / 7 + ph} />)}
      {DROPS.slice(0, rain).map(([x, y, sp], i) => {
        const yy = ((y * (h + 60) + d * 24 * sp) % (h + 60)) - 40;
        const xx = ((x * (Wd + 40) - d * 3) % (Wd + 40) + Wd + 40) % (Wd + 40);
        return <line key={i} x1={xx} y1={yy} x2={xx - 6} y2={yy + 30} stroke="#D6E4F2" strokeWidth={3} strokeLinecap="round" opacity={0.75} />;
      })}
      <text x={22} y={42} fontFamily={MONO} fontSize={30} fill="#fff" fontWeight={700}>LAP 1/3</text>
      <text x={Wd - 22} y={42} fontFamily={MONO} fontSize={30} fill="#FFD479" fontWeight={700} textAnchor="end">1st</text>
    </svg>
  );
};

// 1 "Claude Code can now build you a playable game from one sentence." The real repo, under the hook title
const S1Repo: React.FC<{d: number}> = ({d}) => (
  <Card top={HOOK_TOP} h={HOOK_H} d={d} fill={1.08} url={GH}>
    <div style={{fontFamily: SANS}}>
      <div style={{display: "flex", alignItems: "center", gap: 16}}>
        <Logo src="github-icon.svg" size={50} />
        <div style={{fontSize: 36, color: "#1F2328"}}><span style={{color: "#0969DA"}}>Donchitos</span> / <b style={{color: "#0969DA"}}>Claude-Code-Game-Studios</b></div>
      </div>
      <div style={{marginTop: 18, fontSize: 30, color: "#3B434C", lineHeight: 1.3}}>
        Describe a game. Claude Code asks a few questions, writes a one-page brief, and <Sweep d={d} from={12} to={36}>builds a playable browser game from it.</Sweep>
      </div>
      <div style={{marginTop: 20, display: "flex", gap: 14, fontSize: 30, fontWeight: 600, color: "#1F2328"}}>
        {["★ 40,054", "5,228 forks", "MIT"].map((x, i) => (
          <span key={x} style={{padding: "6px 16px", border: "2px solid #D1D9E0", borderRadius: 10, opacity: pop(d, 34 + i * 8)}}>{x}</span>
        ))}
      </div>
    </div>
  </Card>
);

// 2 "It's called Claude Code Game Studios, and it has over 40 thousand stars on GitHub."
const S2Name: React.FC<{d: number}> = ({d}) => {
  const n = count(d, 40054, 30, 34);
  const k = pop(d, 26);
  return (
    <Card top={HOOK_TOP} h={HOOK_H} d={d} title="Claude Code Game Studios">
      <div style={{fontFamily: SANS, display: "flex", alignItems: "center", gap: 34}}>
        <Tile size={160} k={pop(d, 2)}><Logo src="claude-icon.svg" size={108} /></Tile>
        <div>
          <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 84, color: BLUE, lineHeight: 1.02, letterSpacing: -1}}>Claude Code<br />Game Studios</div>
          <div style={{display: "inline-flex", alignItems: "center", gap: 12, marginTop: 18, padding: "8px 22px", border: `3px solid ${BLUE}`, borderRadius: 12, background: "#E7F1FF",
            color: "#0B3D91", fontSize: 46, fontWeight: 800, opacity: k, transform: `scale(${0.85 + 0.15 * k})`, transformOrigin: "left center"}}>
            <Logo src="github-icon.svg" size={44} />★ {commas(n)} stars</div>
        </div>
      </div>
    </Card>
  );
};

// 3 "It gives Claude 49 AI agents and 75 skills, like a whole game studio."
const Big: React.FC<{k: number; bg: string; line: string; c: string; icon: string; n: number; label: string}> = ({k, bg, line, c, icon, n, label}) => (
  <div style={{height: 230, boxSizing: "border-box", borderRadius: 22, background: bg, border: `2px solid ${line}`, padding: "20px 34px", display: "flex", alignItems: "center", gap: 30,
    opacity: k, transform: `scale(${0.9 + 0.1 * k})`, filter: `blur(${(1 - k) * 8}px)`}}>
    <Icon src={icon} color={c} size={130} />
    <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 190, color: c, lineHeight: 1, width: 230, textAlign: "center"}}>{n}</div>
    <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 64, color: INK, letterSpacing: -1.5}}>{label}</div>
  </div>
);
const S3Count: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} url={GH + "#readme"}>
    <div style={{display: "flex", flexDirection: "column", gap: 24}}>
      <Big k={pop(d, 6)} bg="#E7F1FF" line="#C7DDFB" c="#126EFA" icon="robot_flat.svg" n={count(d, 49, 8, 18)} label="AI agents" />
      <Big k={pop(d, 34)} bg="#FFF1E4" line="#FBD9B8" c="#F57300" icon="hammer_and_wrench_flat.svg" n={count(d, 75, 36, 18)} label="skills" />
      <div style={{marginTop: 10, textAlign: "center", fontFamily: SANS, fontWeight: 800, fontSize: 60, color: INK, letterSpacing: -1.5, opacity: pop(d, 70)}}>
        like a whole <Sweep d={d} from={80} to={100}><span style={{fontFamily: SERIF, fontStyle: "italic", color: BLUE}}>game studio</span></Sweep>
      </div>
    </div>
  </Card>
);

// 4 "You type slash prototype and describe your game. Say, paper boats racing down a rainy street."
const S4Prompt: React.FC<{d: number}> = ({d}) => {
  const idea = "\n  paper boats racing\n  down a rainy street";
  const IDEA_AT = 78, CPS = 32;
  const doneAt = IDEA_AT + Math.ceil((idea.length / CPS) * 30);
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.45} title="Claude Code · ~/game-studios">
      <div style={{display: "flex", alignItems: "center", gap: 14, marginBottom: 8}}><Logo src="claude-icon.svg" size={40} /><Mono c="#8A8A8A" size={30}>Claude Code Game Studios</Mono></div>
      <Mono c="#7AB8FF" size={46}>{"> " + typed("/prototype", d, 4, 30)}<span style={{color: "#fff"}}>{typed(idea, d, IDEA_AT, CPS)}</span>{d < doneAt + 6 && <Cursor d={d} />}</Mono>
      {d > doneAt + 10 && <Mono c="#5BD68A" size={36}>● Genre: racing</Mono>}
      {d > doneAt + 22 && <Mono c="#5BD68A" size={36}>● Picking a few questions</Mono>}
    </Card>
  );
};

// 5 "Claude asks a few questions," one round, each with a usual answer, so "you pick" works
const QS: [string, string[]][] = [["How should it feel?", ["Calm", "Fast", "Chaotic"]], ["How does it look?", ["Paper craft", "Pixel", "Ink"]], ["How hard is it?", ["Easy", "Medium", "Hard"]]];
const S5Questions: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} title="Claude Code · one round of questions">
    <div style={{fontFamily: SANS, display: "flex", flexDirection: "column", gap: 18}}>
      {QS.map(([q, opts], i) => {
        const k = pop(d, i * 7);
        return (
          <div key={q} style={{height: 150, boxSizing: "border-box", borderRadius: 20, border: "2px solid #D1D9E0", background: "#F8FAFC", padding: "16px 24px", opacity: k,
            transform: `scale(${0.85 + 0.15 * k})`, filter: `blur(${(1 - k) * 6}px)`}}>
            <div style={{fontSize: 42, fontWeight: 800, color: INK, letterSpacing: -1}}>{q}</div>
            <div style={{marginTop: 12, display: "flex", gap: 14}}>
              {opts.map((o, j) => (
                <span key={o} style={{padding: "6px 20px", borderRadius: 12, fontSize: 32, fontWeight: 700, border: `2px solid ${j === 1 ? BLUE : "#C9D1DA"}`,
                  background: j === 1 ? "#E7F1FF" : "#fff", color: j === 1 ? "#0B3D91" : "#3B434C", opacity: pop(d, i * 7 + 4 + j * 2)}}>{o}</span>
              ))}
            </div>
          </div>
        );
      })}
      <div><Pill ok text={'Or just say "you pick"'} d={d} at={26} /></div>
    </div>
  </Card>
);

// 6 "then writes a one-page brief for you to approve." design/game-brief.md + the Build it button
const BRIEF: [string, string][] = [["Your words", "paper boats racing down a rainy street"], ["Look", "folded paper on a wet grey street"], ["First minute", "steer past puddles and drains"], ["Goal", "first boat to the corner wins"]];
const S6Brief: React.FC<{d: number}> = ({d}) => {
  const PRESS = 62;
  const press = interpolate(d, [PRESS, PRESS + 4, PRESS + 9], [1, 0.92, 1], clamp);
  const kb = pop(d, 30);
  return (
    <Card top={TOP} h={H} d={d} url="design/game-brief.md">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{display: "flex", alignItems: "center", gap: 18}}>
          <Icon src="memo_flat.svg" color={BLUE} size={60} />
          <div style={{fontSize: 56, fontWeight: 800, letterSpacing: -1.5}}>Game brief</div>
          <span style={{marginLeft: "auto", fontWeight: 800, fontSize: 24, letterSpacing: 2, color: "#fff", background: "#6B7480", borderRadius: 8, padding: "4px 12px"}}>EXAMPLE</span>
        </div>
        <div style={{marginTop: 20, display: "flex", flexDirection: "column", gap: 16}}>
          {BRIEF.map(([l, v], i) => {
            const k = pop(d, 4 + i * 5);
            return (
              <div key={l} style={{opacity: k, transform: `translateX(${(1 - k) * -30}px)`, borderLeft: `5px solid ${i === 0 ? BLUE : "#D1D9E0"}`, paddingLeft: 18}}>
                <div style={{fontSize: 26, fontWeight: 700, color: "#6B7480", letterSpacing: 2, textTransform: "uppercase"}}>{l}</div>
                <div style={{fontSize: 38, fontWeight: 600, lineHeight: 1.25}}>{i === 0 ? <Sweep d={d} from={10} to={26}>{v}</Sweep> : v}</div>
              </div>
            );
          })}
        </div>
        <div style={{marginTop: 30, display: "flex", alignItems: "center", gap: 26}}>
          <div style={{padding: "18px 54px", borderRadius: 18, background: d > PRESS + 4 ? OK : BLUE, color: "#fff", fontWeight: 800, fontSize: 52, letterSpacing: -1,
            boxShadow: "0 8px 24px rgba(0,133,255,.35)", opacity: kb, transform: `scale(${(0.85 + 0.15 * kb) * press})`}}>{d > PRESS + 4 ? "✓ Build it" : "Build it"}</div>
          <div style={{fontSize: 36, fontWeight: 700, color: "#59636E", opacity: pop(d, 40)}}>or change something first</div>
        </div>
      </div>
    </Card>
  );
};

// 7 "Then it builds a browser game you open with a double click."
const S7Game: React.FC<{d: number}> = ({d}) => {
  const CLICK = 64;
  const ring = (t: number) => {
    const p = interpolate(d, [t, t + 14], [0, 1], clamp);
    return <div style={{position: "absolute", left: 55 - 40 - p * 40, top: 55 - 40 - p * 40, width: 80 + p * 80, height: 80 + p * 80, borderRadius: "50%", border: `4px solid ${BLUE}`, opacity: p > 0 && p < 1 ? 1 - p : 0}} />;
  };
  return (
    <Card top={TOP} h={H} d={d} url="prototypes/paper-boats/index.html">
      <div style={{opacity: pop(d, 2), transform: `scale(${0.94 + 0.06 * pop(d, 2)})`}}><Game d={d} h={420} /></div>
      <div style={{marginTop: 22, display: "flex", alignItems: "center", gap: 28, fontFamily: SANS}}>
        <div style={{position: "relative"}}>
          <Tile size={110} k={pop(d, 30)}><Icon src="globe_flat.svg" color={BLUE} size={70} /></Tile>
          {ring(CLICK)}{ring(CLICK + 6)}
        </div>
        <div style={{opacity: pop(d, 36)}}>
          <div style={{fontSize: 54, fontWeight: 800, color: INK, letterSpacing: -1.5}}>Double-click to open</div>
          <div style={{fontFamily: MONO, fontSize: 30, color: "#59636E"}}>prototypes/paper-boats/</div>
        </div>
      </div>
    </Card>
  );
};

// 8 "Before you get it, it tests the game in a hidden browser and fixes what's broken."
const KEYS = ["←", "→", "Space"];
const S8Test: React.FC<{d: number}> = ({d}) => {
  const line = (at: number, node: React.ReactNode) => d > at && <div style={{opacity: pop(d, at), transform: `translateX(${(1 - pop(d, at)) * -20}px)`}}>{node}</div>;
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.1} title="Headless browser · test run">
      <div style={{display: "flex", alignItems: "center", gap: 16}}>
        <Icon src="globe_flat.svg" color="#7AB8FF" size={46} />
        <Mono c="#B8B8B8" size={34}>Hidden browser · paper-boats</Mono>
      </div>
      <div style={{marginTop: 16, display: "flex", gap: 18}}>
        {KEYS.map((x, i) => {
          const on = d >= 8 + i * 14 && d < 16 + i * 14;
          return (
            <div key={x} style={{minWidth: 120, height: 100, padding: "0 26px", boxSizing: "border-box", borderRadius: 16, border: `3px solid ${on ? BLUE : "#4A4A4A"}`, background: on ? BLUE : "#2A2A2A",
              color: "#fff", fontFamily: MONO, fontSize: 46, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
              transform: `translateY(${on ? 5 : 0}px)`, boxShadow: on ? "none" : "0 5px 0 #111", opacity: pop(d, i * 3)}}>{x}</div>
          );
        })}
      </div>
      <div style={{marginTop: 16}}>
        {line(52, <Mono c="#5BD68A" size={40}>✓ Opens with no errors</Mono>)}
        {line(64, <Mono c="#5BD68A" size={40}>✓ Responds to keys</Mono>)}
      </div>
      <div style={{marginTop: 12}}>
        {line(100, <Mono size={40}><span style={{color: "#8A8A8A", textDecoration: "line-through"}}>Text off screen</span><span style={{color: "#5BD68A"}}>{"  → fixed"}</span></Mono>)}
        {line(112, <Mono size={40}><span style={{color: "#8A8A8A", textDecoration: "line-through"}}>Frozen screen</span><span style={{color: "#5BD68A"}}>{"    → fixed"}</span></Mono>)}
      </div>
      {line(126, <div style={{marginTop: 16, display: "inline-block", padding: "10px 20px", borderRadius: 12, border: "2px solid #555", background: "#242424", fontFamily: SANS, fontWeight: 700, fontSize: 32, color: "#FFD479"}}>
        Handover: "Not yet played by a person"</div>)}
    </Card>
  );
};

// 9 "Then you change it just by asking,"
const S9Ask: React.FC<{d: number}> = ({d}) => {
  const rain = Math.round(interpolate(d, [26, 44], [24, 70], clamp));
  const kq = pop(d, 2), ka = pop(d, 40);
  return (
    <Card top={TOP} h={H} d={d} url="prototypes/paper-boats/index.html">
      <div style={{display: "flex", justifyContent: "flex-end", opacity: kq, transform: `translateY(${(1 - kq) * 20}px)`}}>
        <div style={{padding: "16px 26px", borderRadius: 26, background: BLUE, color: "#fff", fontFamily: SANS, fontWeight: 700, fontSize: 44}}>Make the rain heavier</div>
      </div>
      <div style={{marginTop: 18}}><Game d={d} h={360} rain={rain} /></div>
      <div style={{marginTop: 18, display: "flex", alignItems: "center", gap: 16, opacity: ka, transform: `translateY(${(1 - ka) * 20}px)`}}>
        <Logo src="claude-icon.svg" size={50} />
        <div style={{padding: "12px 24px", borderRadius: 24, background: "#EEF1F4", fontFamily: SANS, fontWeight: 700, fontSize: 40, color: INK}}>Done. Rain is heavier.</div>
      </div>
    </Card>
  );
};

// 10 "and every change is a checkpoint." go back to any; "tune it" adds sliders
const CPS_: [string, string][] = [["v1", "First build"], ["v2", "Heavier rain"], ["v3", "Faster boats"]];
const S10Checkpoints: React.FC<{d: number}> = ({d}) => {
  const back = d > 40;
  const slide = (from: number, to: number, at: number) => interpolate(d, [at, at + 20], [from, to], clamp);
  const Slider: React.FC<{label: string; v: number}> = ({label, v}) => (
    <div style={{display: "flex", alignItems: "center", gap: 20, height: 64}}>
      <div style={{width: 220, fontSize: 34, fontWeight: 700, color: INK}}>{label}</div>
      <div style={{position: "relative", flex: 1, height: 12, borderRadius: 6, background: "#D9DEE3"}}>
        <div style={{position: "absolute", left: 0, top: 0, bottom: 0, width: `${v}%`, borderRadius: 6, background: BLUE}} />
        <div style={{position: "absolute", left: `calc(${v}% - 18px)`, top: -12, width: 36, height: 36, borderRadius: 18, background: "#fff", border: `4px solid ${BLUE}`, boxSizing: "border-box"}} />
      </div>
    </div>
  );
  return (
    <Card top={TOP} h={H} d={d} title="paper-boats · checkpoints">
      <div style={{fontFamily: SANS, color: INK}}>
        <div style={{fontSize: 54, fontWeight: 800, letterSpacing: -1.5}}>Every change, a <span style={{fontFamily: SERIF, fontStyle: "italic", color: BLUE}}>checkpoint</span></div>
        <div style={{position: "relative", marginTop: 34, display: "flex", justifyContent: "space-between", padding: "0 40px"}}>
          <div style={{position: "absolute", left: 100, right: 100, top: 39, height: 6, borderRadius: 3, background: "#C7DDFB"}} />
          {CPS_.map(([v, l], i) => {
            const k = pop(d, 4 + i * 10);
            const sel = back && i === 1;
            return (
              <div key={v} style={{position: "relative", width: 240, textAlign: "center", opacity: k, transform: `scale(${0.7 + 0.3 * k})`}}>
                <div style={{margin: "0 auto", width: 84, height: 84, borderRadius: 42, background: sel ? OK : BLUE, color: "#fff", fontWeight: 800, fontSize: 36, display: "flex", alignItems: "center",
                  justifyContent: "center", boxShadow: sel ? `0 0 0 10px #CDEBD5` : "0 6px 18px rgba(0,133,255,.3)"}}>{v}</div>
                <div style={{marginTop: 12, fontSize: 32, fontWeight: 700, color: sel ? OK : "#3B434C"}}>{l}</div>
              </div>
            );
          })}
        </div>
        <div style={{textAlign: "center"}}><Pill ok text="Go back to any of them" d={d} at={40} /></div>
        <div style={{marginTop: 26, borderRadius: 20, border: "2px solid #D1D9E0", background: "#F8FAFC", padding: "16px 26px", opacity: pop(d, 16)}}>
          <div style={{fontSize: 30, fontWeight: 700, color: "#6B7480"}}>Say "tune it": a tweak panel</div>
          <Slider label="Rain" v={slide(35, 80, 22)} />
          <Slider label="Boat speed" v={slide(60, 40, 34)} />
        </div>
      </div>
    </Card>
  );
};

// 11 "When you like it, it grows into a real project,"
const S11Grow: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} fill={1.15} title="paper-boats · grow it">
    <div style={{fontFamily: SANS, color: INK, textAlign: "center"}}>
      <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 96, color: BLUE, lineHeight: 1.05, opacity: pop(d, 0)}}>A real project</div>
      <div style={{marginTop: 30, display: "flex", alignItems: "center", justifyContent: "center", gap: 36}}>
        {[["vite-icon.svg", "Vite", 10], ["typescript-icon.svg", "TypeScript", 20]].map(([src, n, at], i) => (
          <React.Fragment key={n as string}>
            {i === 1 && <div style={{fontSize: 80, fontWeight: 800, color: "#9AA3AD", opacity: pop(d, 16)}}>+</div>}
            <div style={{opacity: pop(d, at as number)}}>
              <Tile size={150} k={pop(d, at as number)}><Logo src={src as string} size={100} /></Tile>
              <div style={{marginTop: 12, fontSize: 44, fontWeight: 800, letterSpacing: -1}}>{n}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{marginTop: 30, display: "flex", justifyContent: "center", gap: 18}}>
        {["data files", "tests", "a build"].map((x, i) => (
          <span key={x} style={{padding: "10px 24px", borderRadius: 14, border: `3px solid ${OK}`, background: "#EAF7EE", color: OK, fontWeight: 800, fontSize: 36,
            opacity: pop(d, 34 + i * 7), transform: `scale(${0.85 + 0.15 * pop(d, 34 + i * 7)})`}}>✓ {x}</span>
        ))}
      </div>
    </div>
  </Card>
);

// 12 "with Godot, Unity and Unreal supported too." Web is the default; the engine route is "supported" (README: not yet shown in their tests)
const ENGINES: [string, string, boolean, number][] = [["", "Web", true, 0], ["godot-icon.svg", "Godot 4", false, 6], ["unity.svg", "Unity", false, 14], ["unrealengine.svg", "Unreal Engine 5", false, 22]];
const S12Engines: React.FC<{d: number}> = ({d}) => (
  <Card top={TOP} h={H} d={d} fill={1.1} title="Engines">
    <div style={{fontFamily: SANS, display: "flex", flexDirection: "column", gap: 16}}>
      {ENGINES.map(([src, n, def, at]) => {
        const k = pop(d, at);
        return (
          <div key={n} style={{display: "flex", alignItems: "center", gap: 24, height: 118, opacity: k, transform: `translateX(${(1 - k) * -40}px)`}}>
            <Tile size={96} k={k}>{src ? <Logo src={src} size={66} /> : <Icon src="globe_flat.svg" color={BLUE} size={66} />}</Tile>
            <span style={{fontSize: 50, fontWeight: 800, color: INK, letterSpacing: -1.5}}>{n}</span>
            <span style={{marginLeft: "auto", padding: "6px 18px", borderRadius: 12, fontSize: 30, fontWeight: 800, border: `3px solid ${def ? BLUE : OK}`,
              background: def ? "#E7F1FF" : "#EAF7EE", color: def ? "#0B3D91" : OK, opacity: pop(d, at + 4)}}>{def ? "default" : "supported"}</span>
          </div>
        );
      })}
    </div>
  </Card>
);

// 13 "It's open source and free. Link's in the description." Same look as kit EndCard, sized so "Open source" stays one line (as web-to-api)
const S13End: React.FC<{d: number}> = ({d}) => {
  const k = pop(d, 3);
  return (
    <Card top={TOP} h={H} d={d} fill={1.12} url={REPO}>
      <div style={{textAlign: "center", paddingTop: 30, opacity: k, transform: `scale(${0.88 + 0.12 * k})`}}>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 130, color: BLUE, lineHeight: 1, whiteSpace: "nowrap"}}>Open source</div>
        <div style={{marginTop: 34, display: "flex", justifyContent: "center", gap: 18}}>
          {["MIT", "Free"].map((x, i) => (
            <span key={x} style={{padding: "8px 30px", borderRadius: 14, border: `3px solid ${BLUE}`, background: "#E7F1FF", color: "#0B3D91", fontFamily: SANS, fontWeight: 800, fontSize: 48,
              opacity: pop(d, 10 + i * 6), transform: `scale(${0.85 + 0.15 * pop(d, 10 + i * 6)})`}}>{x}</span>
          ))}
        </div>
        <div style={{marginTop: 50, fontFamily: SANS, fontWeight: 800, fontSize: 64, color: INK, letterSpacing: -1, display: "flex", alignItems: "center", justifyContent: "center", gap: 16}}>
          <Icon src="pin_flat.svg" color={BLUE} size={70} />Link in the description</div>
        <div style={{marginTop: 50, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: SANS, fontWeight: 600, fontSize: 38, color: "#59636E"}}>
          <Logo src="github-icon.svg" size={44} />FindingLand/youtube-skills</div>
      </div>
    </Card>
  );
};

export const gamestudios = makeShort({
  slug: "game-studios",
  words: words as W[],
  fix: {cloud: "Claude", claud: "Claude", links: "Link's", "40,000": "40 thousand", "40 ,000": "40 thousand", "one page": "one-page",
    godo: "Godot", "go dot": "Godot", gado: "Godot", "check point": "checkpoint"},
  key: ["playable", "sentence", "40", "49", "75", "prototype", "questions", "brief", "double", "hidden", "broken", "asking", "checkpoint", "real", "free"],
  noun: ["claude", "code", "studios", "github", "godot", "unity", "unreal"],
  anchors: [
    ["claude code can", S1Repo], ["it's called", S2Name], ["it gives claude", S3Count], ["you type slash", S4Prompt], ["claude asks", S5Questions],
    ["then writes", S6Brief], ["then it builds", S7Game], ["before you get", S8Test], ["then you change", S9Ask], ["and every change", S10Checkpoints],
    ["when you like", S11Grow], ["with godot", S12Engines], ["it's open source", S13End],
  ],
  hookEnd: 2,
  hook: {brand: "Claude Code", rest: "Game Studios", box: "A Game From One Sentence", brandColor: "#D97757"},
  faceSrcTop: 640,
});
