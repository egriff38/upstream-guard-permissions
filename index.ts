export * from "./types.ts"
export * from "./shell.ts"
export * from "./git.ts"
export * from "./node.ts"
export * from "./github.ts"
export * from "./aws.ts"
export * from "./misc.ts"
export * from "./legacy.ts"

import type { Group } from "./types.ts"
import { shellRead, shellSafe } from "./shell.ts"
import { gitReadonly, gitLocalCommit, gitRemoteRead, gitRemoteAuthor } from "./git.ts"
import { nodeBuild } from "./node.ts"
import { githubRead } from "./github.ts"
import { awsRead } from "./aws.ts"
import { miscSafe } from "./misc.ts"
import { legacyAllowed } from "./legacy.ts"

// Ordered: more specific groups first so the most precise match wins.
export const ALL_GROUPS: ReadonlyArray<Group> = [
  gitRemoteAuthor,
  gitRemoteRead,
  gitLocalCommit,
  gitReadonly,
  githubRead,
  awsRead,
  nodeBuild,
  shellSafe,
  shellRead,
  miscSafe,
  legacyAllowed,
]
