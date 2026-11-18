// Registry: add one line per Short (make_short.py checks the slug is listed here before rendering)
import {egm} from "./egm";
import {claudeedits} from "./claude-edits";
import {fiveplugins} from "./five-plugins";
import {webtoapi} from "./web-to-api";
import {aiagency} from "./ai-agency";
import {blenderskills} from "./blender-skills";
import {gamestudios} from "./game-studios";

export const SHORTS: Record<string, {Short: React.FC; DURATION: number}> = {
  egm,
  "claude-edits": claudeedits,
  "five-plugins": fiveplugins,
  "web-to-api": webtoapi,
  "ai-agency": aiagency,
  "blender-skills": blenderskills,
  "game-studios": gamestudios,
};
