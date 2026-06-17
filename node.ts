import { group, pattern } from "./types.ts"

export const nodeBuild = group("node:build", {
  description: "Local build, test, lint, and typecheck. No publish or registry writes.",
  defaultScope: "persistent",
  patterns: [
    pattern(/^pnpm\s+(install|i)\b/),
    pattern(/^pnpm\s+(build|typecheck|lint|test|dev|e2e|knip|taze)\b/),
    pattern(/^pnpm\s+(-w|--workspace-root)\s+(turbo:|typecheck|lint|test|build|e2e)\b/),
    pattern(/^pnpm\s+(-r|--recursive)\s+(build|typecheck|lint)\b/),
    pattern(/^pnpm\s+(--filter|-F)\s+\S+\s+(dev|build|typecheck|lint|test|e2e)\b/),
    pattern(/^pnpm\s+exec\s+(tsc|cdk\s+synth|cdk\s+ls|turbo)\b/),
    pattern(/^pnpm\s+(turbo:|ls|list|audit|why|outdated|approve-builds)\b/),
    pattern(/^pnpm\s+(link-plugins)\b/),
    pattern(/pnpm.*--dry-run/),
    pattern(/^(node|tsx|tsc|npx\s+tsc|npx\s+knip|npx\s+taze)\b/),
    pattern(/^bun\s+run\b/),
    pattern(/^bun\s+upgrade\b/),
    pattern(/^npm\s+(list|ls|outdated|audit|info|view|run\s+(build|test|lint))\b/),
    pattern(/^brew\s+(info|search|list|doctor|outdated|deps)\b/),
  ],
})
