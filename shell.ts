import { group, pattern } from "./types.ts"

export const shellRead = group("shell:read", {
  description: "Read-only shell navigation, inspection, and text processing",
  defaultScope: "persistent",
  patterns: [
    pattern(/^(ls|ll|la|l)\b/, { description: "Directory listing" }),
    pattern(/^(cat|less|more|head|tail|wc|tee)\b/, { description: "File content" }),
    pattern(/^(echo|printf|pwd|cd|pushd|popd|which|type|where|man|help)\b/),
    pattern(/^(clear|reset|exit|fg|bg|jobs)\b/),
    pattern(/^(date|cal|uptime|uname|hostname|id|whoami)\b/),
    pattern(/^(jq|awk|sed|grep|rg|fd|find|sort|uniq|cut|tr|xargs|comm|diff|wc)\b/),
    pattern(/^(kill|lsof|ps)\b/),
    pattern(/^(open\s|code\b|cursor\b)/),
    pattern(/^(afplay|pbpaste|pbcopy)\b/),
    pattern(/^(sqlite3|python3?\s+-[cm]|node\s+-e)\b/),
    pattern(/^export\s+\w+=/),
    pattern(/^unset\s+\w+/),
    pattern(/^(source|\.)\s+/),
  ],
})

export const shellSafe = group("shell:safe", {
  description: "Safe local filesystem mutations: mkdir, touch, cp (non-system paths)",
  defaultScope: "persistent",
  extends: [shellRead],
  patterns: [
    pattern(/^(mkdir|touch|mktemp)\b/),
    pattern(/^cp\b(?!.*\s\/etc\/|\s~\/\.aws\/)/, { description: "Copy, blocked on system paths" }),
  ],
})
