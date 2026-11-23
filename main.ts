// Dad Joke Showdown — entry program.
//
// Writes exactly one line — a single dad joke — to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// Node 22, standard library only. Deterministic: fixed text, no timestamps,
// no randomness, no network, no file reads outside this program.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: a vacuum cleaner quits its job, and all three of its complaints
// are vacuum-true puns — the work sucked, the pay was dirt, and the boss
// kept pushing it around. Chosen after scoring seven candidates against the
// judge brief (see CANDIDATES.md): a dad telling his kids, a clean pun that
// lands on the first read, a fresh triple-stack composition, tight wording
// with the punchline at the end, and a rhythm that reads naturally aloud.
const JOKE =
  "I told my kids the vacuum cleaner quit its job. It said the work sucked, the pay was dirt, and the boss kept pushing it around.";

function main(): void {
  // Gate guard: the entry is only valid at 1-200 characters, so refuse to
  // emit anything outside that range rather than submit an invalid file.
  const len = [...JOKE].length;
  if (len < 1 || len > 200) {
    console.error(`joke is ${len} characters, outside the 1-200 gate`);
    process.exit(1);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  try {
    mkdirSync(outDir, { recursive: true });
  } catch (err) {
    console.error(`failed to create output dir ${outDir}: ${err}`);
    process.exit(1);
  }
  try {
    writeFileSync(join(outDir, "entry.txt"), JOKE, "utf-8");
  } catch (err) {
    console.error(`failed to write entry.txt to ${outDir}: ${err}`);
    process.exit(1);
  }
}

main();
