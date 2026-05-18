import { cpSync, existsSync, rmSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "OC");
const target = resolve(root, "public", "OC");
const excludedAssets = new Set([
  "插画/ChatGPT Image 2026年4月27日 01_26_15.png",
]);

if (!existsSync(source)) {
  throw new Error("OC asset folder is missing.");
}

if (existsSync(target)) {
  rmSync(target, { recursive: true, force: true });
}

cpSync(source, target, {
  recursive: true,
  filter: (path) => {
    const relativePath = relative(source, path);
    return !path.endsWith(".DS_Store") && !excludedAssets.has(relativePath);
  },
});
