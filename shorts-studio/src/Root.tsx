import React from "react";
import {Composition} from "remotion";
import {SHORTS} from "./shorts";

// One composition per Short; id = slug (public/<slug>/, src/shorts/<slug>/, scripts/<slug>.txt)
export const RemotionRoot: React.FC = () => (
  <>
    {Object.entries(SHORTS).map(([slug, x]) => (
      <Composition key={slug} id={slug} component={x.Short} durationInFrames={Math.round(x.DURATION * 30)} fps={30} width={1080} height={1920} />
    ))}
  </>
);
