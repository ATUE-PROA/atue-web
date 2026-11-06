import { useEffect, useRef, useState, type ChangeEvent } from 'react'

import { Button } from '@/components/ui/button'
import { FormAlert } from '@/components/ui/form-alert'
import { PROFILE_CONTENT } from '@/content/profile'
import { getProfileInitials } from '@/lib/profile'

const MAX_PHOTO_SIZE = 2 * 1024 * 1024
const ACCEPTED_PHOTO_TYPES = ['image/png', 'image/jpeg', 'image/webp']

interface ProfileAvatarProps {
  name: string
}

type PhotoFeedback = 'idle' | 'success' | 'error'

const { personal } = PROFILE_CONTENT

export function ProfileAvatar({ name }: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<PhotoFeedback>('idle')

  useEffect(() => {
    return () => {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl)
      }
    }
  }, [photoUrl])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    if (!ACCEPTED_PHOTO_TYPES.includes(file.type) || file.size > MAX_PHOTO_SIZE) {
      setFeedback('error')
      return
    }

    setPhotoUrl(URL.createObjectURL(file))
    setFeedback('success')
  }

  const handlePhotoError = () => {
    if (photoUrl) {
      URL.revokeObjectURL(photoUrl)
    }

    setPhotoUrl(null)
    setFeedback('error')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600 text-lg font-semibold text-white">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`Prévia da foto de perfil de ${name}`}
              className="size-full object-cover"
              onError={handlePhotoError}
            />
          ) : (
            <span aria-hidden="true">{getProfileInitials(name)}</span>
          )}
        </span>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => {
            inputRef.current?.click()
          }}
        >
          {personal.avatarButton}
        </Button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_PHOTO_TYPES.join(',')}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {feedback === 'success' ? (
        <FormAlert
          tone="info"
          title={personal.avatarSuccessTitle}
          description={personal.avatarSuccessDescription}
        />
      ) : null}

      {feedback === 'error' ? (
        <FormAlert
          tone="error"
          title={personal.avatarErrorTitle}
          description={personal.avatarErrorDescription}
        />
      ) : null}
    </div>
  )
}
