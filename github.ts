import { group, pattern } from "./types.ts"

export const githubRead = group("github:read", {
  description: "Read-only GitHub CLI operations",
  defaultScope: "persistent",
  patterns: [
    pattern(/^gh\s+pr\s+(list|view|status|diff|checkout)\b/),
    pattern(/^gh\s+repo\s+(list|view|clone)\b/),
    pattern(/^gh\s+run\s+(list|view)\b/),
    pattern(/^gh\s+issue\s+(list|view)\b/),
    pattern(/^gh\s+api\s+repos\b/),
    pattern(/^gh\s+search\s+prs?\b/, { description: "PR search (includes --author, --review-requested)" }),
  ],
})
