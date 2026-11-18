// Five Claude plugins Short (Nov 17 2026): "5 Claude Plugins For Automation Builders". Script: scripts/five-plugins.txt.
// Facts (stars, licenses, install commands) from client-memories/finding-land-internal/youtube/shorts/03-five-claude-plugins/plan.md,
// all read Nov 17 2026. Stars rounded the way GitHub shows them.
import React from "react";
import {interpolate} from "remotion";
import {Card, Mono, Pill, Sweep, Icon, Logo, Cursor, typed, pop, EndCard, makeShort, SANS, SERIF, MONO, BLUE, INK, OK, BAD, TOP, H, HOOK_TOP, HOOK_H, W} from "../../kit";
import words from "./words.json";

const AMBER = "#F5A300", N8N = "#EA4B71", PW = "#2EAD33";
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;

// the 5 plugins, in script order
const P = [
  {n: 1, name: "n8n Skills", logo: "n8n-icon.svg", job: "Build"},
  {n: 2, name: "Playwright", logo: "playwright.svg", job: "Browse"},
  {n: 3, name: "Context7", logo: "upstash-icon.svg", job: "Docs"},
  {n: 4, name: "Superpowers", icon: "high_voltage_flat.svg", job: "Plan"},
  {n: 5, name: "Skill Creator", logo: "anthropic-icon.svg", job: "Memory"},
] as {n: number; name: string; logo?: string; icon?: string; job: string}[];

const Mark: React.FC<{p: typeof P[number]; size: number}> = ({p, size}) =>
  p.logo ? <Logo src={p.logo} size={size} /> : <Icon src={p.icon!} color={AMBER} size={size} />;

const Num: React.FC<{n: number; size?: number; k?: number}> = ({n, size = 84, k = 1}) => (
  <div style={{width: size, height: size, borderRadius: size / 2, background: BLUE, color: "#fff", fontFamily: SANS, fontWeight: 900, fontSize: size * 0.58,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transform: `scale(${0.6 + 0.4 * k})`, opacity: k}}>{n}</div>
);

// small dark terminal inside a light card: the real install command, typed
const Term: React.FC<{cmd: string; d: number; at: number}> = ({cmd, d, at}) => {
  const k = pop(d, at - 4);
  const t = typed(cmd, d, at, 42);
  return (
    <div style={{marginTop: 26, background: "#1A1A1A", borderRadius: 16, padding: "18px 24px", opacity: k, transform: `translateY(${(1 - k) * 20}px)`}}>
      <div style={{fontFamily: MONO, fontSize: 24, color: "#8A8A8A", marginBottom: 4}}>Claude Code</div>
      <div style={{fontFamily: MONO, fontSize: 36, color: "#fff", lineHeight: 1.35}}>
        {/* lines may break only at a space or "@", never inside "n8n-skills" (a hyphen break read as "n8n- / skills") */}
        {/* <wbr/> between the nowrap chunks: without it there was NO break point and "...@claude-plugins-official" ran off the card (Nov 18 checker) */}
        <span style={{color: "#E37E55", whiteSpace: "nowrap"}}>{"> "}</span>{t.split(/(?<=[\s@])/).map((p, i) => <React.Fragment key={i}>{i > 0 && <wbr />}<span style={{whiteSpace: "nowrap"}}>{p}</span></React.Fragment>)}{t.length < cmd.length && <Cursor d={d} />}
      </div>
    </div>
  );
};

// one plugin = one repo card: number + logo + name, owner/repo, a verified one-liner, badges, the install command typing
const PluginRepo: React.FC<{d: number; i: number; owner: string; repo: string; desc: string; badges: string[]; cmd: string; sub?: React.ReactNode; fill?: number}> =
  ({d, i, owner, repo, desc, badges, cmd, sub, fill = 1}) => {
    const p = P[i];
    return (
      <Card top={TOP} h={H} d={d} fill={fill} url={`github.com/${owner}/${repo}`}>
        <div style={{fontFamily: SANS}}>
          <div style={{display: "flex", alignItems: "center", gap: 24}}>
            <Num n={p.n} k={pop(d, 2)} />
            <div style={{width: 120, height: 120, borderRadius: 28, background: "#fff", boxShadow: "0 6px 24px rgba(0,0,0,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0}}>
              <Mark p={p} size={84} />
            </div>
            <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 84, color: INK, lineHeight: 1, letterSpacing: -1}}>{p.name}</div>
          </div>
          <div style={{marginTop: 26, display: "flex", alignItems: "center", gap: 14}}>
            <Logo src="github-icon.svg" size={44} />
            <div style={{fontSize: 38, color: "#0969DA"}}>{owner} / <b>{repo}</b></div>
          </div>
          {sub}
          <div style={{marginTop: 16, fontSize: 40, color: "#3B434C", fontWeight: 500, lineHeight: 1.3}}><Sweep d={d} from={8} to={30}>{desc}</Sweep></div>
          <div style={{marginTop: 20, display: "flex", flexWrap: "wrap", gap: 16, fontSize: 34, fontWeight: 700, color: "#1F2328"}}>
            {badges.map((x, j) => <span key={x} style={{padding: "8px 20px", border: "2px solid #D1D9E0", borderRadius: 12, opacity: pop(d, 6 + j * 5), background: j === 0 ? "#FFF8E1" : "#fff"}}>{x}</span>)}
          </div>
          <Term cmd={cmd} d={d} at={18} />
        </div>
      </Card>
    );
  };

// ---------- scenes ----------
const S1Five: React.FC<{d: number}> = ({d}) => {
  const n = Math.min(5, 1 + Math.floor(d / 7));
  return (
    <Card top={HOOK_TOP} h={HOOK_H} d={d} title="Claude Code · plugins">
      <div style={{display: "flex", alignItems: "center", gap: 34, fontFamily: SANS}}>
        <div style={{width: 170, height: 170, borderRadius: 38, background: "#fff", boxShadow: "0 8px 30px rgba(0,0,0,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0}}>
          <Logo src="claude-icon.svg" size={120} />
        </div>
        <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 200, color: BLUE, lineHeight: 0.9, width: 130, textAlign: "center",
          transform: `scale(${1 + 0.12 * Math.max(0, 1 - ((d % 7) / 7)) * (d < 35 ? 1 : 0)})`}}>{n}</div>
        <div style={{fontWeight: 800, fontSize: 68, color: INK, lineHeight: 1.05, letterSpacing: -1.5}}>Claude<br />plugins</div>
      </div>
      <div style={{marginTop: 24, display: "flex", justifyContent: "space-between"}}>
        {P.map((p, i) => {
          const k = pop(d, 34 + i * 6);
          return <div key={p.n} style={{width: 140, height: 76, borderRadius: 18, background: "#F4F6F9", border: "2px solid #E1E5EA", display: "flex", alignItems: "center", justifyContent: "center",
            opacity: k, transform: `scale(${0.7 + 0.3 * k})`}}><Mark p={p} size={52} /></div>;
        })}
      </div>
    </Card>
  );
};

const S2Slots: React.FC<{d: number}> = ({d}) => (
  <Card top={HOOK_TOP} h={HOOK_H} d={d} title="5 plugins · 5 headaches">
    <div style={{display: "flex", justifyContent: "space-between", fontFamily: SANS}}>
      {P.map((p, i) => {
        const k = pop(d, 2 + i * 5);
        const hot = d > 30 + i * 6;
        return (
          <div key={p.n} style={{width: 150, height: 290, borderRadius: 22, background: hot ? "#FDEDEC" : "#E7F1FF", border: `2px solid ${hot ? "#F5C2BE" : "#C7DDFB"}`,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, opacity: k, transform: `translateY(${(1 - k) * 40}px)`}}>
            <Num n={p.n} size={92} />
            <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 96, color: hot ? BAD : "#9DB8DE", lineHeight: 1}}>{hot ? "!" : "?"}</div>
          </div>
        );
      })}
    </div>
  </Card>
);

const S3N8n: React.FC<{d: number}> = ({d}) => (
  <PluginRepo d={d} i={0} owner="czlonkowski" repo="n8n-skills" desc="Expert Claude Code skills for building n8n workflows"
    badges={["★ 6.7k", "MIT", "14 skills"]} cmd="/plugin install czlonkowski/n8n-skills" fill={1.04} />
);

const S4Nodes: React.FC<{d: number}> = ({d}) => {
  const nodes = [{t: "Webhook", c: "#FF6D5A"}, {t: "HTTP Request", c: "#7D6BF2"}, {t: "Set fields", c: "#2A9DD8"}, {t: "Send email", c: "#2EA043"}];
  const shown = Math.min(nodes.length, 1 + Math.floor(Math.max(0, d - 4) / 12));
  return (
    <Card top={TOP} h={H} d={d} fill={1.12} title="n8n · new workflow">
      <div style={{fontFamily: SANS}}>
        <div style={{display: "flex", alignItems: "center", gap: 18}}>
          <Logo src="n8n-icon.svg" size={70} />
          <div style={{fontSize: 54, fontWeight: 800, color: INK, letterSpacing: -1}}>Node by node</div>
          <div style={{marginLeft: "auto", fontSize: 36, fontWeight: 700, color: N8N}}>{shown} / 4</div>
        </div>
        <div style={{marginTop: 30}}>
          {nodes.map((n, i) => {
            const k = pop(d, 4 + i * 12);
            if (i >= shown) return <div key={n.t} style={{marginTop: i > 0 ? 14 : 0, height: 90, borderRadius: 18, border: "3px dashed #D1D9E0"}} />;
            return (
              <div key={n.t} style={{opacity: k, transform: `translateX(${(1 - k) * -60}px)`}}>
                {i > 0 && <div style={{width: 6, height: 14, background: "#C9CED6", marginLeft: 49}} />}
                <div style={{display: "flex", alignItems: "center", gap: 22, height: 90, borderRadius: 18, border: "2px solid #D1D9E0", background: "#fff", padding: "0 20px", boxShadow: "0 4px 14px rgba(0,0,0,.06)"}}>
                  <div style={{width: 64, height: 64, borderRadius: 14, background: n.c, color: "#fff", fontWeight: 900, fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center"}}>{i + 1}</div>
                  <div style={{fontSize: 44, fontWeight: 700, color: INK}}>{n.t}</div>
                  <div style={{marginLeft: "auto", fontSize: 40, fontWeight: 900, color: OK, opacity: pop(d, 10 + i * 12)}}>✓</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

const S5Playwright: React.FC<{d: number}> = ({d}) => (
  <PluginRepo d={d} i={1} owner="microsoft" repo="playwright-mcp" desc="Claude drives a real browser: clicks, forms, screenshots"
    badges={["★ 39.8k", "Apache-2.0", "Microsoft"]} cmd="/plugin install playwright@claude-plugins-official"
    sub={<div style={{marginTop: 14, display: "flex", alignItems: "center", gap: 12, fontSize: 32, color: "#59636E", fontWeight: 600, opacity: pop(d, 4)}}><Logo src="microsoft-icon.svg" size={36} />from Microsoft</div>} fill={0.96} />
);

const Pointer: React.FC<{x: number; y: number; down: boolean}> = ({x, y, down}) => (
  <svg width="54" height="64" viewBox="0 0 54 64" style={{position: "absolute", left: x, top: y, transform: `scale(${down ? 0.85 : 1})`, filter: "drop-shadow(0 3px 4px rgba(0,0,0,.3))"}}>
    <path d="M4 2 L4 50 L16 39 L25 60 L34 56 L25 36 L42 36 Z" fill="#111617" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
  </svg>
);

const S6Browser: React.FC<{d: number}> = ({d}) => {
  const name = typed("Acme Supplies", d, 14, 22), email = typed("orders@example.com", d, 46, 22);
  const clicked = d > 84;
  const rows = [["SKU-1042", "$18.40", "In stock"], ["SKU-1043", "$22.10", "In stock"], ["SKU-1050", "$9.95", "Low"], ["SKU-1057", "$31.00", "In stock"]];
  // pointer path: field 1 -> field 2 -> button
  const px = interpolate(d, [0, 10, 38, 46, 74, 84], [700, 330, 330, 330, 330, 520], clamp);
  const py = interpolate(d, [0, 10, 38, 46, 74, 84], [420, 120, 120, 225, 225, 330], clamp);
  const ban = pop(d, 150);
  return (
    <Card top={TOP} h={H} d={d} fill={1.06} url="portal.example.com/orders">
      <div style={{fontFamily: SANS, position: "relative", height: "100%"}}>
        <div style={{display: "flex", alignItems: "center", gap: 14}}><Logo src="playwright.svg" size={52} /><div style={{fontSize: 34, fontWeight: 700, color: PW}}>Claude is using the browser</div></div>
        {[["Company", name, 14], ["Email", email, 46]].map(([l, v, at]) => (
          <div key={l as string} style={{marginTop: 18, display: "flex", alignItems: "center", gap: 20}}>
            <div style={{width: 170, fontSize: 34, color: "#59636E", fontWeight: 600}}>{l}</div>
            <div style={{flex: 1, height: 74, borderRadius: 12, border: `3px solid ${d > (at as number) - 4 && (v as string).length < 15 ? BLUE : "#D1D9E0"}`, padding: "0 18px", display: "flex", alignItems: "center", fontSize: 38, color: INK}}>{v as string}</div>
          </div>
        ))}
        {/* the payoff banner takes the button's slot (it used to float over the table rows, Nov 18 checker) */}
        {d > 140 ? <div style={{marginTop: 22, height: 74, textAlign: "center", opacity: ban, transform: `scale(${0.85 + 0.15 * ban})`}}>
          <span style={{display: "inline-block", background: BLUE, color: "#fff", borderRadius: 10, padding: "0 28px 6px", fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 60, lineHeight: "74px"}}>No API? No problem</span>
        </div> :
        <div style={{marginTop: 22, marginLeft: 190, width: 260, height: 74, borderRadius: 12, background: clicked ? "#0B63C4" : BLUE, color: "#fff", fontWeight: 800, fontSize: 38, display: "flex", alignItems: "center", justifyContent: "center"}}>Get prices</div>}
        <div style={{marginTop: 22, borderRadius: 12, border: "1px solid #D1D9E0", overflow: "hidden"}}>
          {rows.map((r, i) => d <= 96 + i * 10 ? <div key={r[0]} style={{height: 61, borderTop: i ? "1px solid #EEF1F4" : "none", background: "#FAFBFC"}} /> : (
            <div key={r[0]} style={{display: "flex", fontSize: 34, padding: "10px 18px", background: i % 2 ? "#F6F8FA" : "#fff", fontFamily: MONO, color: INK}}>
              <span style={{flex: 1.2}}>{r[0]}</span><span style={{flex: 1}}>{r[1]}</span><span style={{flex: 1, color: r[2] === "Low" ? BAD : OK}}>{r[2]}</span>
            </div>
          ))}
        </div>
        {d < 140 && <Pointer x={px} y={py + 40} down={(d > 10 && d < 16) || (d > 46 && d < 52) || (d > 84 && d < 90)} />}
      </div>
    </Card>
  );
};

const S7Context7: React.FC<{d: number}> = ({d}) => (
  <PluginRepo d={d} i={2} owner="upstash" repo="context7" desc="Up-to-date docs for AI agents, version-specific"
    badges={["★ 65k", "MIT", "by Upstash"]} cmd="/plugin install context7@claude-plugins-official" fill={1.08} />
);

const S8Docs: React.FC<{d: number}> = ({d}) => {
  const a = pop(d, 2), b = pop(d, 12);
  const strike = interpolate(d, [8, 18], [0, 100], clamp);
  const box = (bg: string, line: string, c: string, t: string, sub: string, mark: string, k: number, struck?: boolean) => (
    <div style={{flex: 1, borderRadius: 22, background: bg, border: `2px solid ${line}`, padding: "34px 16px", textAlign: "center", opacity: k, transform: `scale(${0.9 + 0.1 * k})`, filter: `blur(${(1 - k) * 8}px)`, position: "relative"}}>
      <Icon src="books_flat.svg" color={c} size={150} />
      <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 66, color: c, marginTop: 8}}>{t}</div>
      <div style={{fontFamily: MONO, fontSize: 40, color: "#3B434C", marginTop: 6, position: "relative", display: "inline-block"}}>{sub}
        {struck && <div style={{position: "absolute", left: 0, top: "50%", height: 5, width: `${strike}%`, background: BAD}} />}</div>
      <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 80, color: c, marginTop: 6}}>{mark}</div>
    </div>
  );
  return (
    <Card top={TOP} h={H} d={d} fill={0.92} title="Context7 · docs for your version">
      <div style={{display: "flex", gap: 26}}>
        {box("#FDEDEC", "#F5C2BE", BAD, "Old docs", "v1 API", "✕", a, true)}
        {box("#EAF7EE", "#B9E3C6", OK, "Current docs", "your version", "✓", b)}
      </div>
      <div style={{textAlign: "center"}}><Pill ok text="Code for the version you run" d={d} at={26} /></div>
    </Card>
  );
};

const S9Stars: React.FC<{d: number}> = ({d}) => {
  const n = Math.round(interpolate(d, [4, 30], [0, 319223], {...clamp, easing: (t) => 1 - Math.pow(1 - t, 3)}));
  return (
    <Card top={TOP} h={H} d={d} fill={1.0} url="github.com/obra/superpowers">
      <div style={{fontFamily: SANS}}>
        <div style={{display: "flex", alignItems: "center", gap: 24}}>
          <Num n={4} k={pop(d, 2)} />
          <div style={{width: 120, height: 120, borderRadius: 28, background: "#fff", boxShadow: "0 6px 24px rgba(0,0,0,.12)", display: "flex", alignItems: "center", justifyContent: "center"}}><Icon src="high_voltage_flat.svg" color={AMBER} size={86} /></div>
          <div style={{fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 84, color: INK, letterSpacing: -1}}>Superpowers</div>
        </div>
        <div style={{marginTop: 26, borderRadius: 26, background: "linear-gradient(135deg,#FFF8E1,#FFEFC2)", border: "2px solid #F5D98A", padding: "24px 30px", display: "flex", alignItems: "center", gap: 24}}>
          <Icon src="star_flat.svg" color={AMBER} size={110} />
          <div>
            <div style={{fontWeight: 900, fontSize: 108, color: INK, letterSpacing: -3, lineHeight: 1, fontVariantNumeric: "tabular-nums"}}>{n.toLocaleString("en-US")}</div>
            <div style={{fontWeight: 700, fontSize: 38, color: "#8A6A00", marginTop: 6}}>GitHub stars</div>
          </div>
        </div>
        <div style={{marginTop: 20, display: "flex", gap: 16, fontSize: 34, fontWeight: 700, color: "#1F2328"}}>
          {["MIT", "obra / superpowers"].map((x, j) => <span key={x} style={{padding: "8px 20px", border: "2px solid #D1D9E0", borderRadius: 12, opacity: pop(d, 12 + j * 5)}}>{x}</span>)}
        </div>
        <Term cmd="/plugin install superpowers@claude-plugins-official" d={d} at={18} />
      </div>
    </Card>
  );
};

const S10Steps: React.FC<{d: number}> = ({d}) => {
  const steps = [{t: "Brainstorm", icon: "light_bulb_flat.svg", c: AMBER, at: 6}, {t: "Write a plan", icon: "memo_flat.svg", c: BLUE, at: 34}, {t: "Test its own work", icon: "test_tube_flat.svg", c: "#7D6BF2", at: 64}];
  return (
    <Card top={TOP} h={H} d={d} fill={1.12} title="Superpowers · how Claude works">
      <div style={{fontFamily: SANS}}>
        {steps.map((x, i) => {
          const k = pop(d, x.at);
          const live = d > x.at && (i === steps.length - 1 ? d < 120 : d < steps[i + 1].at);
          return (
            <div key={x.t} style={{display: "flex", alignItems: "center", gap: 26, marginBottom: 20, padding: "16px 24px", borderRadius: 22, background: live ? "#E7F1FF" : "#F6F8FA",
              border: `3px ${d > x.at ? "solid" : "dashed"} ${live ? BLUE : "#D1D9E0"}`, opacity: 0.3 + 0.7 * k}}>
              <Num n={i + 1} size={72} />
              <Icon src={x.icon} color={x.c} size={84} />
              <div style={{fontSize: 52, fontWeight: 800, color: INK, letterSpacing: -1}}>{x.t}</div>
              {d > x.at + 24 && <div style={{marginLeft: "auto", fontSize: 52, fontWeight: 900, color: OK}}>✓</div>}
            </div>
          );
        })}
        <div style={{textAlign: "center", marginTop: 6, opacity: 0.3 + 0.7 * pop(d, 120), transform: `scale(${0.9 + 0.1 * pop(d, 120)})`}}>
          <span style={{display: "inline-block", background: d > 120 ? OK : "#C9CED6", color: "#fff", borderRadius: 12, padding: "6px 34px 12px", fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 76}}>Then it says done</span>
        </div>
      </div>
    </Card>
  );
};

const S11SkillCreator: React.FC<{d: number}> = ({d}) => (
  <PluginRepo d={d} i={4} owner="anthropics" repo="claude-plugins-official" desc="Create new skills and improve existing ones"
    badges={["★ 47.6k", "Apache-2.0", "Anthropic"]} cmd="/plugin install skill-creator@claude-plugins-official" fill={0.94}
    sub={<div style={{marginTop: 14, display: "inline-flex", alignItems: "center", gap: 12, fontFamily: MONO, fontSize: 34, padding: "6px 14px", borderRadius: 10, background: pop(d, 6) > 0.5 ? "#FFF8C5" : "transparent", border: "2px solid #E8D97A", color: "#1F2328"}}>
      <Icon src="file_folder_flat.svg" color="#54AEFF" size={38} />plugins/skill-creator</div>} />
);

const S12Skill: React.FC<{d: number}> = ({d}) => {
  const ask = "Every Monday, pull new leads and email the team";
  const out = ["Write(weekly-leads/SKILL.md)", "  1. Pull new leads", "  2. Draft the email", "  3. Send to the team"];
  return (
    <Card dark top={TOP} h={H} d={d} fill={1.18} title="Claude Code · skill-creator">
      <div style={{display: "flex", alignItems: "center", gap: 14}}><Logo src="claude-icon.svg" size={44} /><Mono c="#8A8A8A" size={32}>Describe your process once</Mono></div>
      <Mono c="#fff" size={40}><span style={{color: "#E37E55"}}>{"> "}</span>{typed(ask, d, 2, 60)}{d < 26 && <Cursor d={d} />}</Mono>
      <div style={{marginTop: 10}}>
        {out.map((l, i) => d > 24 + i * 4 && <Mono key={l} c={i === 0 ? "#FFD479" : "#5BD68A"} size={36}>{(i === 0 ? "● " : "") + l}</Mono>)}
      </div>
      <div style={{marginTop: 14, padding: "12px 20px", borderRadius: 12, background: d > 44 ? BLUE : "#2A2A2A", transform: `scale(${0.96 + 0.04 * pop(d, 44)})`}}><Mono c={d > 44 ? "#fff" : "#8A8A8A"} size={38}>{d > 44 ? "✓ Skill saved. Used every time" : "  Writing the skill..."}</Mono></div>
    </Card>
  );
};

const S13Recap: React.FC<{d: number}> = ({d}) => {
  const ats = [2, 18, 33, 45, 60];
  return (
    <Card top={TOP} h={H} d={d} fill={1.1} title="Your automation toolkit">
      <div style={{fontFamily: SANS}}>
        {P.map((p, i) => {
          const k = pop(d, ats[i]);
          const on = d > ats[i];
          return (
            <div key={p.n} style={{display: "flex", alignItems: "center", gap: 22, height: 90, marginBottom: 10, padding: "0 22px", borderRadius: 20,
              background: on ? "#E7F1FF" : "#F6F8FA", border: `2px solid ${on ? "#C7DDFB" : "#E1E5EA"}`}}>
              <Num n={p.n} size={64} />
              <div style={{width: 72, display: "flex", justifyContent: "center"}}><Mark p={p} size={62} /></div>
              <div style={{fontSize: 42, fontWeight: 700, color: INK}}>{p.name}</div>
              <div style={{marginLeft: "auto", fontFamily: SERIF, fontStyle: "italic", fontWeight: 800, fontSize: 54, color: BLUE, opacity: k, transform: `scale(${0.7 + 0.3 * k})`}}>{p.job}</div>
            </div>
          );
        })}
        <div style={{marginTop: 4, textAlign: "center", fontSize: 44, fontWeight: 800, color: INK, opacity: pop(d, 80)}}><Sweep d={d} from={82} to={100}>Most of an automation job</Sweep></div>
      </div>
    </Card>
  );
};

const S14End: React.FC<{d: number}> = ({d}) => <EndCard d={d} big="All free" />;

export const fiveplugins = makeShort({
  slug: "five-plugins",
  words: words as W[],
  // Whisper -> script spellings, from the Nov 18 2026 take; keys with a space are fixes in context (kit makeShort)
  fix: {cloud: "Claude", clod: "Claude", claud: "Claude", heading: "headache", na10: "n8n", n810: "n8n", playwrite: "Playwright", fields: "fills",
    version: "versions", brainstorms: "brainstorms", creator: "Creator", "4": "Fourth", "context 7": "Context7", "300 ,000": "300,000", "5 cloud": "Five Claude", "5 skill": "Fifth Skill"},
  key: ["headache", "right", "real", "current", "old", "stars", "tests", "once", "free"],
  noun: ["claude", "n8n", "playwright", "microsoft", "context7", "superpowers", "skill", "creator", "anthropic", "github"],
  anchors: [
    ["five claude plugins", S1Five], ["each one fixes", S2Slots], ["first n8n", S3N8n], ["how to build", S4Nodes],
    ["second playwright", S5Playwright], ["claude opens a", S6Browser], ["third context7", S7Context7], ["so it stops", S8Docs],
    ["fourth superpowers", S9Stars], ["claude brainstorms", S10Steps], ["fifth skill creator", S11SkillCreator], ["you describe a", S12Skill],
    ["building browsing", S13Recap], ["all five", S14End],
  ],
  hookEnd: 2,
  hook: {brand: "5 Claude", rest: "Plugins For", box: "Automation Builders", brandColor: "#D97757"},
  faceSrcTop: 655,  // Nov 18 take: hair top at source y 690-704 (2 frames), white wall, framed wide
});
