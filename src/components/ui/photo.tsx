import { cn } from '@/lib/utils'

interface PhotoProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

/** Fotografia editorial. O tamanho vem do quadro que a contém. */
export function Photo({ src, alt, width, height, className, priority = false }: PhotoProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={cn('h-full w-full object-cover', className)}
    />
  )
}

interface PhotoFrameProps extends PhotoProps {
  /** Proporção do quadro, que reserva o espaço mesmo antes da imagem carregar. */
  frameClassName?: string
}

/** Quadro com o tratamento visual único das fotografias do site. */
export function PhotoFrame({ frameClassName, className, ...photo }: PhotoFrameProps) {
  return (
    <figure>
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-muted ring-1 ring-black/5 dark:ring-white/10',
          frameClassName,
        )}
      >
        <Photo {...photo} className={cn('absolute inset-0', className)} />
      </div>
    </figure>
  )
}
