/* The image database.
 *
 * Every picture and video on the site is declared here once, by id, together
 * with the alt text and the intrinsic size it was exported at. Components ask
 * for an id -- they never type a path -- so a file can only be referenced if
 * somebody first wrote it down here.
 *
 * `pnpm check:images` (which `pnpm build` runs first) then walks this file and
 * checks every local asset actually exists in `public/` at the size claimed.
 * That is the point of the whole arrangement: a picture that is referenced but
 * missing stops the build with the filename to add, instead of shipping and
 * rendering as a broken frame in somebody's browser.
 *
 * Adding a picture:
 *   1. Drop the file in `public/`.
 *   2. Add an entry below (`pnpm check:images` prints the real width/height if
 *      you get them wrong).
 *   3. Render it with `<SiteImage id="your-id" />`.
 *
 * If the entry has to go in before the file does, mark it `status: 'pending'`
 * and say what is missing in `awaiting`. The build stays green, and the page
 * draws a labelled placeholder frame rather than a broken image, until the file
 * lands and the status flips to 'ready'.
 */

export type ImageStatus = 'ready' | 'pending'

export type SiteImageRecord = {
  /** Stable key components render by. */
  id: string
  /** Path under `public/`, or an absolute URL for a remote image. */
  src: string
  /** Describes the picture for anyone who cannot see it. Empty only when the image is decorative and the meaning sits in adjacent text. */
  alt: string
  /** Intrinsic pixel size of the exported file -- what keeps the aspect ratio honest and reserves layout space. */
  width: number
  height: number
  /** Shown as a caption where the layout has room for one. */
  credit?: string
  /** 'pending' means the entry is written but the file is not in the repo yet. */
  status: ImageStatus
  /** Why a pending entry is pending, and what has to be supplied. */
  awaiting?: string
}

function isRemote(src: string) {
  return src.startsWith('http://') || src.startsWith('https://')
}

const records = {
  'logo-mark': {
    id: 'logo-mark',
    src: '/logo-mark.png',
    alt: '',
    width: 512,
    height: 512,
    status: 'ready',
  },
  'logo-full': {
    id: 'logo-full',
    src: '/logo-full.png',
    alt: 'Beyond the Blue Print Uganda',
    width: 1200,
    height: 410,
    status: 'ready',
  },
  'og-card': {
    id: 'og-card',
    src: '/og-image.png',
    alt: 'Beyond the Blue Print Uganda',
    width: 1200,
    height: 630,
    status: 'ready',
  },
  'icon-32': {
    id: 'icon-32',
    src: '/icon-light-32x32.png',
    alt: '',
    width: 32,
    height: 32,
    status: 'ready',
  },
  'icon-192': {
    id: 'icon-192',
    src: '/icon-192.png',
    alt: '',
    width: 192,
    height: 192,
    status: 'ready',
  },
  'icon-512': {
    id: 'icon-512',
    src: '/icon-512.png',
    alt: '',
    width: 512,
    height: 512,
    status: 'ready',
  },
  'apple-icon': {
    id: 'apple-icon',
    src: '/apple-icon.png',
    alt: '',
    width: 180,
    height: 180,
    status: 'ready',
  },
  'hero-poster': {
    id: 'hero-poster',
    src: '/btb-logo-poster.png',
    alt: '',
    width: 1280,
    height: 720,
    status: 'ready',
  },
  'film-poster': {
    id: 'film-poster',
    src: '/santina-poster.jpg',
    alt: '',
    width: 720,
    height: 1280,
    status: 'ready',
  },
  'panel-dr-ian-clarke': {
    id: 'panel-dr-ian-clarke',
    src: '/panel-dr-ian-clarke.jpg',
    alt: 'Dr Ian Clarke, Founder and CEO of Clarke Group, in conversation on stage at Beyond the Blue Print Uganda',
    width: 1333,
    height: 2000,
    credit: 'Dr Ian Clarke / Clarke Group — on stage in Kampala',
    status: 'pending',
    awaiting: 'Add the stage photograph to public/panel-dr-ian-clarke.jpg, then set status to "ready".',
  },
  'room-audience': {
    id: 'room-audience',
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85',
    alt: 'Audience gathered at a conference',
    width: 1200,
    height: 800,
    status: 'ready',
  },
  'on-ground-team': {
    id: 'on-ground-team',
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85',
    alt: 'Team collaborating around a table',
    width: 900,
    height: 600,
    status: 'ready',
  },
  'main-stage-speaker': {
    id: 'main-stage-speaker',
    src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=85',
    alt: 'Speaker addressing a business audience',
    width: 900,
    height: 600,
    status: 'ready',
  },
  'ideas-in-motion': {
    id: 'ideas-in-motion',
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=85',
    alt: 'Conference audience listening to a speaker',
    width: 1200,
    height: 800,
    status: 'ready',
  },
} as const satisfies Record<string, SiteImageRecord>

export type SiteImageId = keyof typeof records

export const siteImages: Record<SiteImageId, SiteImageRecord> = records

/* Videos live in the same database for the same reason: a missing .mp4 fails
   the same silent way a missing .jpg does. */
export type SiteVideoRecord = {
  id: string
  src: string
  /** Id of the still frame shown before playback. */
  poster: SiteImageId
  status: ImageStatus
  awaiting?: string
}

const videoRecords = {
  'hero-logo': {
    id: 'hero-logo',
    src: '/btb-logo.mp4',
    poster: 'hero-poster',
    status: 'ready',
  },
  'santina-film': {
    id: 'santina-film',
    src: '/santina-web.mp4',
    poster: 'film-poster',
    status: 'ready',
  },
} as const satisfies Record<string, SiteVideoRecord>

export type SiteVideoId = keyof typeof videoRecords

export const siteVideos: Record<SiteVideoId, SiteVideoRecord> = videoRecords

/** The record for `id`. Unknown ids are a type error, so this always resolves. */
export function getImage(id: SiteImageId): SiteImageRecord {
  return siteImages[id]
}

export function getVideo(id: SiteVideoId): SiteVideoRecord {
  return videoRecords[id]
}

/** True when the file is expected in `public/` rather than fetched from elsewhere. */
export function isLocalAsset(src: string) {
  return !isRemote(src)
}
