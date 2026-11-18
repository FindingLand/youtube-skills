// Fast check: bundle once, ONE browser for all stills, 1 frame per second.
//   node frames.mjs <slug> out/frames_<name> [seconds,comma,list]
import {bundle} from "@remotion/bundler";
import {renderStill, selectComposition, openBrowser} from "@remotion/renderer";
import path from "node:path";
const [slug, out, only] = process.argv.slice(2);
if (!slug || !out) { console.error("usage: node frames.mjs <slug> <outdir> [1,5,9]"); process.exit(2); }
// Nov 18 2026: stale remotion-* temp folders (each render leaves ~92 MB) had filled 67 GB of C:; drop the ones over 30 min old
{
  const fs = await import("node:fs"), os = await import("node:os");
  for (const n of fs.readdirSync(os.tmpdir()).filter((n) => n.startsWith("remotion-"))) {
    const p = path.join(os.tmpdir(), n);
    try { if (Date.now() - fs.statSync(p).mtimeMs > 1800e3) fs.rmSync(p, {recursive: true, force: true}); } catch {}
  }
}
const serveUrl = await bundle({entryPoint: path.resolve("src/index.ts")});
const puppeteerInstance = await openBrowser("chrome");
const composition = await selectComposition({serveUrl, id: slug, puppeteerInstance});
const list = only ? only.split(",").map(Number) : null;
for (let f = 15; f < composition.durationInFrames; f += 30) {
  if (list && !list.includes(Math.floor(f / 30) + 1)) continue;
  await renderStill({composition, serveUrl, frame: f, puppeteerInstance, output: `${out}/s_${String(Math.floor(f / 30) + 1).padStart(3, "0")}.png`});
}
await puppeteerInstance.close({silent: true});
console.log("frames done");
