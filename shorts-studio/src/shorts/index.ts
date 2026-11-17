// Registry: add one line per Short (make_short.py checks the slug is listed here before rendering)
import {egm} from "./egm";
import {claudeedits} from "./claude-edits";
import {fiveplugins} from "./five-plugins";
import {webtoapi} from "./web-to-api";
import {aiagency} from "./ai-agency";

export const SHORTS: Record<string, {Short: React.FC; DURATION: number}> = {
  egm,
  "claude-edits": claudeedits,
  "five-plugins": fiveplugins,
  "web-to-api": webtoapi,
  "ai-agency": aiagency,
};
