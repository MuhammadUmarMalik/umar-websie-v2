import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const tsconfigPath = resolve(
  "node_modules",
  "@vercel",
  "analytics",
  "tsconfig.json",
);

try {
  const source = await readFile(tsconfigPath, "utf8");
  const config = JSON.parse(source);

  if (config.extends === "../../tsconfig.json") {
    config.extends = "../../../tsconfig.json";
    await writeFile(tsconfigPath, `${JSON.stringify(config, null, 2)}\n`);
    console.log("Patched @vercel/analytics tsconfig extends path.");
  }
} catch (error) {
  if (error?.code !== "ENOENT") {
    console.warn(
      "Could not patch @vercel/analytics tsconfig:",
      error instanceof Error ? error.message : error,
    );
  }
}
