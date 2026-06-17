import { group, pattern } from "./types.ts"

export const miscSafe = group("misc:safe", {
  description: "Navigation utilities, env tools, and other broadly safe commands",
  defaultScope: "persistent",
  patterns: [
    pattern(/^curl\b(?![\s\S]*-X\s*(POST|PUT|PATCH|DELETE))/i, { description: "GET-only curl" }),
    pattern(/^(z\b|ghq\s+(list|look|ls)|branchyard)\b/),
    pattern(/^(direnv\s+(allow|status|show))\b/),
    pattern(/^(gwt|gws)\s+(list|ls|prune|status|-h)\b/),
    pattern(/^(omp|claude|codex)\s*(-h|--help|list|resume|agents|-v|--version)\b/),
    pattern(/^(loadAlinaEnv|source\s|exec\s+scripts\/load-env)\b/),
    pattern(/^secretspec\s+check\b/),
    pattern(/^op\s+read\b/),
    pattern(/^ssh-add\s+-l\b/),
    pattern(/^(glab\s+(issue|mr|project|repo)\s+(list|view|get))\b/),
    pattern(/^nix(-build)?\s+.*--dry-run\b/),
    pattern(/^nix\s+(develop|--help|--version)\b/),
    pattern(/^(cabal|ghci|ghc)\b/),
    pattern(/^STACK_ID=/),
    pattern(/^npx\s+(skills\s+(find|list|search))\b/),
  ],
})
