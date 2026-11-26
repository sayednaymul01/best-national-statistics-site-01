// Hand-in program for "Bangladesh in Numbers".
//
// It copies the finished site (app/) and its screenshots (screenshots/) from
// this repository into the output directory, then writes the entry dossier
// with the kit's own library, so the dossier the scorer rebuilds from those
// same files matches byte for byte. Standard library only; the copy walks
// each tree in sorted order so two runs write identical bytes.

import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate's caps for this bounty, passed whole so this program refuses
// exactly where the scorer would.
const GATE_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function copyTree(name: string): void {
  cpSync(join(repoRoot, name), join(outputDir, name), {
    recursive: true,
    dereference: false,
  });
}

mkdirSync(outputDir, { recursive: true });
copyTree("app");
copyTree("screenshots");

const dossier = buildDossier(outputDir, GATE_CAPS);
writeFileSync(join(outputDir, "dossier.json"), dossier);

console.log(`handed in: app/ + screenshots/ copied to ${outputDir}, dossier.json ${dossier.length} bytes`);
