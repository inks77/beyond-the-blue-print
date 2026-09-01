#!/usr/bin/env node
/* Verifies the image database in `lib/images.ts` against what is actually in
   `public/`. Runs before every build (see the `prebuild` script), so a picture
   that is referenced but missing -- the thing that ships as a broken frame --
   stops the build here instead.
 
   Checks, for every entry:
     - a 'ready' local file exists in public/
     - its declared width/height match the file's real intrinsic size
     - a 'pending' entry whose file has since arrived is reported, so the
       status can be flipped and the placeholder replaced by the picture
 
   Reads the intrinsic size straight from the PNG/JPEG/GIF/WebP header, so it
   needs no dependencies and runs anywhere node does. */

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const registryPath = join(root, 'lib/images.ts')
const publicDir = join(root, 'public')

/* The registry is TypeScript, and this script deliberately has no build step,
   so the entries are read out of the source text. The shape it expects is the
   one the file is written in: object literals with `id:` ... `status:` keys. */
function parseRegistry(source) {
  const entries = []
  const objectPattern = /\{\s*id:\s*'([^']+)',([\s\S]*?)\n {2}\},/g
  let match
  while ((match = objectPattern.exec(source)) !== null) {
    const [, id, body] = match
    const field = (name) => {
      const found = body.match(new RegExp(`\\n\\s*${name}:\\s*(?:'([^']*)'|(\\d+))`))
      if (!found) return undefined
      return found[1] !== undefined ? found[1] : Number(found[2])
    }
    entries.push({
      id,
      src: field('src'),
      status: field('status'),
      width: field('width'),
      height: field('height'),
      awaiting: field('awaiting'),
    })
  }
  return entries
}

function intrinsicSize(buffer) {
  if (buffer.length > 24 && buffer.readUInt32BE(0) === 0x89504e47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
  }
  if (buffer.length > 10 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1
        continue
      }
      const marker = buffer[offset + 1]
      // Start-of-frame markers carry the dimensions; DNL/RST/padding carry none.
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) }
      }
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
        offset += 2
        continue
      }
      offset += 2 + buffer.readUInt16BE(offset + 2)
    }
    return null
  }
  if (buffer.length > 10 && buffer.subarray(0, 3).toString('latin1') === 'GIF') {
    return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) }
  }
  if (buffer.length > 30 && buffer.subarray(8, 12).toString('latin1') === 'WEBP') {
    const format = buffer.subarray(12, 16).toString('latin1')
    if (format === 'VP8X') return { width: (buffer.readUIntLE(24, 3) & 0xffffff) + 1, height: (buffer.readUIntLE(27, 3) & 0xffffff) + 1 }
    if (format === 'VP8 ') return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff }
  }
  return null
}

const source = readFileSync(registryPath, 'utf8')
const entries = parseRegistry(source)

if (entries.length === 0) {
  console.error('check-images: found no entries in lib/images.ts -- has the file been restructured?')
  process.exit(1)
}

const problems = []
const notes = []
let verified = 0

for (const entry of entries) {
  const remote = entry.src.startsWith('http://') || entry.src.startsWith('https://')
  if (remote) continue

  const filePath = join(publicDir, entry.src.replace(/^\//, ''))
  const present = existsSync(filePath)

  if (entry.status === 'pending') {
    if (present) {
      notes.push(
        `${entry.id}: public${entry.src} has arrived -- set status: 'ready' in lib/images.ts so the page renders the picture instead of the placeholder.`,
      )
    } else {
      notes.push(`${entry.id}: waiting on public${entry.src}${entry.awaiting ? ` -- ${entry.awaiting}` : ''}`)
    }
    continue
  }

  if (!present) {
    problems.push(`${entry.id}: public${entry.src} is missing. Add the file, or mark the entry status: 'pending' until it exists.`)
    continue
  }

  // Videos and other non-image assets are checked for existence only.
  if (entry.width === undefined || entry.height === undefined) {
    verified += 1
    continue
  }

  const size = intrinsicSize(readFileSync(filePath))
  if (!size) {
    notes.push(`${entry.id}: could not read the dimensions of public${entry.src}; existence checked only.`)
    verified += 1
    continue
  }
  if (size.width !== entry.width || size.height !== entry.height) {
    problems.push(
      `${entry.id}: lib/images.ts says ${entry.width}x${entry.height}, but public${entry.src} is ${size.width}x${size.height}. Correct the entry so the layout reserves the right space and the picture is not stretched.`,
    )
    continue
  }
  verified += 1
}

for (const note of notes) console.log(`  note  ${note}`)

if (problems.length > 0) {
  console.error(`\ncheck-images: ${problems.length} problem${problems.length === 1 ? '' : 's'} in the image database\n`)
  for (const problem of problems) console.error(`  error  ${problem}`)
  console.error('')
  process.exit(1)
}

console.log(`check-images: ${verified} local asset${verified === 1 ? '' : 's'} verified against public/.`)
