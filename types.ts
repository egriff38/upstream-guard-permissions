// ── Core types ────────────────────────────────────────────────────────────────

export interface Pattern {
  readonly regex: RegExp
  readonly description?: string
  readonly source?: string
}

export interface Group {
  readonly name: string
  readonly description?: string
  readonly defaultScope?: "task" | "session" | "persistent"
  readonly extends?: ReadonlyArray<Group>
  readonly patterns: ReadonlyArray<Pattern>
}

// ── Constructors ──────────────────────────────────────────────────────────────

export const pattern = (
  regex: RegExp,
  opts?: { description?: string; source?: string },
): Pattern => ({ regex, ...opts })

export const group = (
  name: string,
  opts: {
    description?: string
    defaultScope?: "task" | "session" | "persistent"
    extends?: ReadonlyArray<Group>
    patterns: ReadonlyArray<Pattern>
  },
): Group => ({ name, ...opts })

// ── Traversal ─────────────────────────────────────────────────────────────────
//
// Flattens a group's full pattern set following extends chains depth-first.
// Duplicate groups (diamond inheritance) are visited once only.

export const flattenPatterns = (
  g: Group,
  seen = new Set<string>(),
): ReadonlyArray<Pattern> => {
  if (seen.has(g.name)) return []
  seen.add(g.name)
  const inherited = (g.extends ?? []).flatMap(p => flattenPatterns(p, seen))
  return [...inherited, ...g.patterns]
}

// Returns every group in the extends chain, ancestors first, self last.
export const flattenGroups = (
  g: Group,
  seen = new Set<string>(),
): ReadonlyArray<Group> => {
  if (seen.has(g.name)) return []
  seen.add(g.name)
  const parents = (g.extends ?? []).flatMap(p => flattenGroups(p, seen))
  return [...parents, g]
}

// ── Match result ──────────────────────────────────────────────────────────────

export interface MatchResult {
  readonly group: Group
  readonly pattern: Pattern
  /** Named captures from the regex match, keyed by capture name. */
  readonly captures: Readonly<Record<string, string>>
}

export const matchCommand = (
  cmd: string,
  groups: ReadonlyArray<Group>,
): MatchResult | null => {
  for (const g of groups) {
    for (const p of flattenPatterns(g)) {
      const m = cmd.match(p.regex)
      if (m) return { group: g, pattern: p, captures: m.groups ?? {} }
    }
  }
  return null
}
