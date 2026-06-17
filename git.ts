import { group, pattern } from "./types.ts"

export const gitReadonly = group("git:readonly", {
  description: "Read-only git operations — no state changes, no network writes",
  defaultScope: "persistent",
  patterns: [
    pattern(/^git\s+(status|diff|log|show|branch|remote|tag|describe|shortlog|blame)\b/),
    pattern(/^git\s+(stash\s+(list|show)|worktree\s+list|ls-tree|ls-files|rev-parse)\b/),
    pattern(/^git\s+fetch\b/, { description: "Download only, does not integrate" }),
    pattern(/^(gs|gd|glgga|glo|glog|gst)\b/, { description: "Common git aliases" }),
    pattern(/^git-crypt\s+(status|unlock|lock)\b/),
  ],
})

export const gitLocalCommit = group("git:localCommit", {
  description: "Local state mutations: add, commit, stash, checkout, merge, rebase. No upstream writes.",
  defaultScope: "persistent",
  extends: [gitReadonly],
  patterns: [
    pattern(/^git\s+(add|commit|stash|checkout|switch|restore|merge|rebase|cherry-pick)\b/),
    pattern(/^git\s+reset\b(?!.*--hard)/, { description: "Soft and mixed reset only" }),
    pattern(/^git\s+worktree\s+(add|prune|remove)\b(?!.*--force)/),
    pattern(/^(ga\b|gc\b|gco\b|gcm\b|gcd\b|gl\b|gb\b)/),
  ],
})

export const gitRemoteRead = group("git:remoteRead", {
  description: "Pull from remote (fetch + integrate). Read from upstream, write to local only.",
  defaultScope: "session",
  extends: [gitLocalCommit],
  patterns: [
    pattern(/^git\s+pull\b/),
    pattern(/^(gf\b)/),
  ],
})

export const gitRemoteAuthor = group("git:remoteAuthor", {
  description: "Push to a negotiated remote. Requires allowedRemote binding.",
  defaultScope: "session",
  extends: [gitRemoteRead],
  patterns: [
    pattern(
      /^git\s+push\s+(?<allowedRemote>\S+)/,
      { description: "Push to a specific remote; allowedRemote is a lease variable" },
    ),
  ],
})
