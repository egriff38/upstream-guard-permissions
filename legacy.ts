// ── Legacy entries migrated from allowed.json ─────────────────────────────────
//
// These were exact-string "always allow" entries added via the old dialog.
// Migrate them to typed groups over time — ask the negotiation agent to
// suggest the right group, or just delete entries that are now covered by
// a group in this repo.

import { group, pattern } from "./types.ts"

export const legacyAllowed = group("legacy:allowed", {
  description: "Exact-string entries migrated from allowed.json. Migrate to typed groups.",
  defaultScope: "persistent",
  patterns: [
    pattern(
      /^gh search prs --author=@me --state=open --json number,title,url,repository 2>&1$/,
      { source: "user", description: "Daily standup: own open PRs" },
    ),
    pattern(
      /^gh search prs --review-requested=@me --state=open --json number,title,url,repository 2>&1$/,
      { source: "user", description: "Daily standup: PRs awaiting review" },
    ),
    pattern(
      /^python3 ~\/.cursor\/skills\/daily-standup\/scripts\/calendar-today\.py 2>&1$/,
      { source: "user", description: "Daily standup: calendar fetch" },
    ),
  ],
})
