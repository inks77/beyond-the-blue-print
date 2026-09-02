#!/usr/bin/env node
/* Advisory linter for the mechanical tells in `../references/ai-tells.md`.
   It catches the ones a regex can see -- gradient clichés, transition-all,
   emoji-as-icon, marketing copy, raw hex, double boundary treatments. It cannot
   see hierarchy, rhythm, or measure, which is where most of the work is; the
   critique pass in ../SKILL.md is not optional because this passed.

   Usage:
     node .claude/skills/taste/scripts/design-lint.mjs [paths...]
     node .claude/skills/taste/scripts/design-lint.mjs --strict   # exit 1 on any tell

   Comments are not scanned -- prose about a tell is not a tell -- and a line
   carrying `design-lint-disable`, on itself or on the line above it, is
   skipped, so a deliberate exception can stay in the file with its reason
   written next to it.                                                      */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve, extname } from 'node:path'

const ROOT = process.cwd()
const args = process.argv.slice(2)
const STRICT = args.includes('--strict')
const TARGETS = args.filter((a) => !a.startsWith('--'))
const ROOTS = TARGETS.length ? TARGETS : ['app', 'components', 'lib']
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build', 'out', '.claude'])
const EXTS = new Set(['.tsx', '.ts', '.jsx', '.js', '.css'])

/* level: 'tell'  -- almost always wrong; fix it
   level: 'warn'  -- usually wrong, sometimes justified; look and decide       */
const RULES = [
  {
    id: 'gradient-cliche',
    level: 'tell',
    files: /\.(tsx|jsx|css)$/,
    re: /\b(?:from|via|to)-(?:purple|violet|fuchsia|indigo|pink|cyan)-\d{2,3}\b/,
    why: 'The indigo/violet→pink gradient is the single most recognisable generated-UI signature.',
    fix: 'One flat brand colour. Gradients only where they do physical work (a scrim, an edge fade).',
  },
  {
    id: 'gradient-text',
    level: 'tell',
    files: /\.(tsx|jsx|css)$/,
    re: /bg-clip-text[^"'`]*text-transparent|text-transparent[^"'`]*bg-clip-text/,
    why: 'Gradient headline text.',
    fix: 'Solid colour, larger, tighter tracking.',
  },
  {
    id: 'transition-all',
    level: 'tell',
    files: /\.(tsx|jsx|css)$/,
    re: /\btransition-all\b|transition:\s*all\b/,
    why: 'Animates properties you did not choose, including layout ones.',
    fix: 'Name them: transition-transform, transition-colors, transition-[transform,opacity].',
  },
  {
    id: 'slow-ui-motion',
    level: 'warn',
    files: /\.(tsx|jsx|css)$/,
    re: /\bduration-(?:300|500|700|1000)\b/,
    why: 'UI motion belongs in 150-250ms; 300ms+ reads as lag on small elements.',
    fix: 'duration-150/200. Reserve 300-400ms for large surfaces crossing real distance.',
  },
  {
    id: 'ease-in-out',
    level: 'warn',
    files: /\.(tsx|jsx|css)$/,
    re: /\bease-in-out\b|transition-timing-function:\s*ease-in-out/,
    why: 'The slow start lands after the click, so user-initiated motion feels sluggish.',
    fix: 'ease-out, or a real curve (see .claude/skills/motion/references/easing.md).',
  },
  {
    id: 'hover-scale',
    level: 'tell',
    files: /\.(tsx|jsx|css)$/,
    re: /hover:scale-(?:105|110|125)\b/,
    why: 'The card that grows on hover is template motion.',
    fix: 'Nothing, or a 1px translate and a border-colour change.',
  },
  {
    id: 'glassmorphism',
    level: 'warn',
    files: /\.(tsx|jsx|css)$/,
    re: /\bbackdrop-blur(?:-\w+)?\b|backdrop-filter:\s*blur/,
    why: 'Frosted panels over blurred blobs are ornament pretending to be depth.',
    fix: 'A flat surface with a hairline. If it stays, it must not be animated.',
  },
  {
    id: 'double-boundary',
    level: 'warn',
    files: /\.(tsx|jsx)$/,
    re: /(?=[^"'`]*\bborder\b)(?=[^"'`]*\bshadow-(?:md|lg|xl|2xl)\b)[^"'`]*\brounded-(?:xl|2xl|3xl)\b/,
    why: 'Border + shadow + large radius on one element: three devices marking one boundary.',
    fix: 'Pick one boundary language for the whole project and hold it.',
  },
  {
    id: 'emoji-in-ui',
    level: 'tell',
    files: /\.(tsx|jsx|ts)$/,
    re: /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}]/u,
    why: 'Emoji standing in for icons or decorating headings.',
    fix: 'A real icon set, one metaphor family, one weight.',
  },
  {
    id: 'marketing-copy',
    level: 'tell',
    files: /\.(tsx|jsx|ts)$/,
    re: /\b(?:empower(?:s|ing|ed)?|unlock(?:s|ing)?|seamless(?:ly)?|elevat(?:e|es|ing)\s+your|revolutionis(?:e|ing)|revolutioniz(?:e|ing)|supercharge|game[- ]chang(?:er|ing)|cutting[- ]edge|world[- ]class|best[- ]in[- ]class|next level|effortless(?:ly)?|in seconds)\b/i,
    why: 'Copy that would fit any company in the world.',
    fix: 'Say what it actually does, with this project’s own nouns.',
  },
  {
    id: 'invented-metrics',
    level: 'warn',
    files: /\.(tsx|jsx|ts)$/,
    re: /\b\d+(?:,\d{3})*k?\+\s*(?:users|customers|teams|companies|clients)\b|\b99\.9+%\b|\b24\/7\b/i,
    why: 'Placeholder social proof.',
    fix: 'A real number with a source, or no number.',
  },
  {
    id: 'stock-photography',
    level: 'warn',
    files: /\.(tsx|jsx|ts)$/,
    re: /images\.unsplash\.com|source\.unsplash\.com|images\.pexels\.com|pixabay\.com|\bplaceholder(?:-user|-logo)?\.(?:jpg|png|svg)\b/,
    why: 'Stock or placeholder imagery standing in for pictures of the real thing.',
    fix: 'A real photograph in public/, declared in lib/images.ts. If there is none yet, mark the entry status: \'pending\' so the placeholder is labelled and check:images keeps naming the missing file.',
  },
  {
    id: 'lorem',
    level: 'tell',
    files: /\.(tsx|jsx|ts)$/,
    re: /lorem ipsum|dolor sit amet/i,
    why: 'Placeholder text in a committed file.',
    fix: 'Real content. A layout built on lorem has not been designed yet.',
  },
  {
    id: 'raw-colour',
    level: 'tell',
    files: /\.(tsx|jsx)$/,
    re: /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla|oklch)\(/,
    why: 'A literal colour in a component is outside the token system.',
    fix: 'Use a token from app/globals.css, or derive one with color-mix().',
  },
  {
    id: 'ambient-loop',
    level: 'warn',
    files: /\.(tsx|jsx|css)$/,
    re: /\banimate-(?:pulse|bounce|ping)\b/,
    why: 'Something moves while the user is idle.',
    fix: 'Only for genuine loading or attention states, never as decoration.',
  },
  {
    id: 'straight-typography',
    level: 'warn',
    files: /\.(tsx|jsx|ts)$/,
    re: />[^<>{}\n]*(?:\.\.\.|\s--\s)[^<>{}\n]*</,
    why: 'Three dots or a double hyphen in rendered copy.',
    fix: 'Real typographic characters: … and – / —.',
  },
]

/* Blanks comments while preserving the line count, so a rule cannot fire on a
   comment that discusses it and reported line numbers still point at the file.
   Strings are left intact: copy rules have to see them. `//` is only treated as
   a line comment when it is not preceded by a colon, so URLs survive. */
function stripComments(source) {
  let out = ''
  let inBlock = false
  let inLine = false
  let quote = null
  for (let i = 0; i < source.length; i++) {
    const ch = source[i]
    const next = source[i + 1]
    if (ch === '\n') {
      inLine = false
      quote = null
      out += ch
      continue
    }
    if (inBlock) {
      if (ch === '*' && next === '/') {
        inBlock = false
        i++
      }
      continue
    }
    if (inLine) continue
    if (quote) {
      if (ch === '\\') {
        out += ch + (next ?? '')
        i++
        continue
      }
      if (ch === quote) quote = null
      out += ch
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch
      out += ch
      continue
    }
    if (ch === '/' && next === '*') {
      inBlock = true
      i++
      continue
    }
    if (ch === '/' && next === '/' && source[i - 1] !== ':') {
      inLine = true
      continue
    }
    out += ch
  }
  return out
}

function walk(dir, out = []) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return out
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) walk(full, out)
    else if (EXTS.has(extname(full))) out.push(full)
  }
  return out
}

const files = []
for (const root of ROOTS) {
  const full = resolve(ROOT, root)
  try {
    statSync(full).isDirectory() ? walk(full, files) : files.push(full)
  } catch {
    /* a path that is not there is not an error worth failing on */
  }
}

const findings = []
for (const file of files) {
  const rel = relative(ROOT, file)
  const source = readFileSync(file, 'utf8')
  const raw = source.split('\n')
  const code = stripComments(source).split('\n')
  code.forEach((line, i) => {
    /* The marker is honoured on the offending line or on the one above it, so
       it can sit in a comment that explains itself rather than trailing a
       formatted line. */
    if (raw[i].includes('design-lint-disable')) return
    if (i > 0 && raw[i - 1].includes('design-lint-disable')) return
    for (const rule of RULES) {
      if (!rule.files.test(file)) continue
      if (rule.re.test(line)) {
        findings.push({ rule, file: rel, line: i + 1, text: raw[i].trim().slice(0, 100) })
      }
    }
  })
}

const tells = findings.filter((f) => f.rule.level === 'tell')
const warns = findings.filter((f) => f.rule.level === 'warn')

if (!findings.length) {
  console.log(`design-lint: ${files.length} files, no mechanical tells.`)
  console.log('The tells a regex can see are the easy half. Run the critique pass in')
  console.log('.claude/skills/taste/SKILL.md before calling it done.')
  process.exit(0)
}

const byRule = new Map()
for (const f of findings) {
  if (!byRule.has(f.rule.id)) byRule.set(f.rule.id, [])
  byRule.get(f.rule.id).push(f)
}

for (const [id, group] of byRule) {
  const { level, why, fix } = group[0].rule
  console.log(`\n${level === 'tell' ? 'TELL' : 'WARN'}  ${id}  (${group.length})`)
  console.log(`      ${why}`)
  console.log(`      → ${fix}`)
  for (const f of group.slice(0, 8)) {
    console.log(`      ${f.file}:${f.line}  ${f.text}`)
  }
  if (group.length > 8) console.log(`      … and ${group.length - 8} more`)
}

console.log(
  `\ndesign-lint: ${files.length} files, ${tells.length} tell(s), ${warns.length} warning(s).`,
)
console.log('Append `design-lint-disable` to a line to keep a deliberate exception.')

process.exit(STRICT && tells.length ? 1 : 0)
