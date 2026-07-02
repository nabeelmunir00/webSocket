import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
const arcjetKey = process.env.ARCJET_KEY;
const arjectMode = process.env.ARCJET_MODE === "DRY_RUN" ? "DRY_RUN" : "LIVE";

if (!arcjetKey) throw new Error("ARCJET_KEY enviroment variable is missing");

const httpArcjet = arcjetKey
  ? arcjet({
      key: arcjetKey,
      rules: [
        shield({ mode: arjectMode }),
        detectBot({
          mode: arjectMode,
          allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
        }),
        slidingWindow({ mode: arjectMode, interval: "10s", max: 50 }),
      ],
    })
  : null;

const wsArcjet = arcjetKey
  ? arcjet({
      key: arcjetKey,
      rules: [
        shield({ mode: arjectMode }),
        detectBot({
          mode: arjectMode,
          allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
        }),
        slidingWindow({ mode: arjectMode, interval: "2s", max: 5 }),
      ],
    })
  : null;
