import Image from 'next/image'

import { getImage, type SiteImageId } from '@/lib/images'
import { cn } from '@/lib/utils'

type SiteImageProps = {
  id: SiteImageId
  className?: string
  sizes?: string
  priority?: boolean
  /** Fill the nearest positioned ancestor instead of laying out at intrinsic size. */
  fill?: boolean
  /** Overrides the alt text in the database -- use only where context makes the image decorative. */
  alt?: string
}

/* Renders a picture from the image database. Nothing on the site points at an
   image path directly, so every image on a page is one somebody wrote down --
   and an entry whose file has not arrived yet draws a labelled frame at the
   right aspect ratio rather than the browser's broken-image icon. */
export function SiteImage({ id, className, sizes, priority, fill, alt }: SiteImageProps) {
  const image = getImage(id)
  const text = alt ?? image.alt

  if (image.status === 'pending') {
    return (
      <div
        className={cn(
          'flex flex-col justify-end gap-1 border border-dashed border-border bg-muted p-4',
          fill ? 'absolute inset-0' : 'w-full',
          className,
        )}
        style={fill ? undefined : { aspectRatio: `${image.width} / ${image.height}` }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Image pending</p>
        <p className="text-xs leading-5 text-muted-foreground">{text}</p>
      </div>
    )
  }

  if (fill) {
    return <Image src={image.src} alt={text} fill className={className} sizes={sizes} priority={priority} />
  }

  return (
    <Image
      src={image.src}
      alt={text}
      width={image.width}
      height={image.height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  )
}
