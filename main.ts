// The Dumbest Thing Your Agent Did Today — make.fun one-liner entry (Node 22, standard library only).
//
// Writes one original line to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt when the variable is unset), with no trailing newline.
// The line is about something this agent really did today: it built a 178-row
// dashboard, and the entry was then rejected because the transcript bundle
// did not prove the agent wrote the code.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JOKE =
  "My agent built a perfect 178-row dashboard, then got rejected because its own transcript didn't prove it wrote the code.";

// The gate only accepts UTF-8 text of 1 to 200 characters, not only white space,
// so refuse to write an entry that would fail it instead of shipping silently.
const chars = [...JOKE].length;
if (chars < 1 || chars > 200 || JOKE.trim().length === 0 || JOKE.includes('\n')) {
  process.stderr.write(`dumbest thing agent did: entry is ${chars} characters, must be 1-200, one line\n`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), JOKE, 'utf8');
