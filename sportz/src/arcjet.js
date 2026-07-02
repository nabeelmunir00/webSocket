const arcjetKey = process.env.ARCJET_KEY;
const arjectMode = process.env.ARCJET_MODE === "DRY_RUN" ? "DRY_RUN" : "LIVE";

if (!arcjetKey) throw new Error("ARCJET_KEY enviroment variable is missing");
