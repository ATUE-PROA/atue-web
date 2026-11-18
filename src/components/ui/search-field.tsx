import { useId } from 'react'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface SearchFieldProps {
  label: string
  placeholder?: string
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export function SearchField({
  label,
  placeholder,
  value,
  onValueChange,
  className,
}: SearchFieldProps) {
  const inputId = useId()

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          id={inputId}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onValueChange(event.currentTarget.value)}
          className="h-10 pl-9"
        />
      </div>
    </div>
  )
}
