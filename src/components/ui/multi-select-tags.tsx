import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { cn } from '../../shared/lib/utils'
interface SelectableItems {
  id: string
  name: string
}
interface MultiSelectTagsProps<T extends SelectableItems> {
  options: T[]
  selected: T[]
  onChange: (selected: T[]) => void
  placeholder?: string
}

export function MultiSelectTags<T extends SelectableItems>({
  options,
  selected,
  onChange,
  placeholder = 'Select tags...'
}: MultiSelectTagsProps<T>) {
  const [open, setOpen] = React.useState(false)
  const selectedIds = new Set(selected.map(item => item.id))

  const handleSelect = (value: T) => {
    const newSelected = selectedIds.has(value.id)
      ? selected.filter(item => item.id !== value.id)
      : [...selected, value]
    onChange(newSelected)
  }

  const handleRemoveTag = (tagToRemove: T) => {
    onChange(selected.filter(tag => tag.id !== tagToRemove.id))
  }

  return (
    <div className='flex flex-col gap-2'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between min-h-[36px] h-auto bg-transparent'
          >
            <div className='flex flex-wrap gap-1'>
              {selected.length > 0 ? (
                selected.map(tag => (
                  <Badge
                    key={tag.id}
                    variant='secondary'
                    className='flex items-center gap-1'
                  >
                    {tag.name}
                    <button
                      type='button'
                      onClick={e => {
                        e.stopPropagation()
                        handleRemoveTag(tag)
                      }}
                      className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    >
                      <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                    </button>
                  </Badge>
                ))
              ) : (
                <span className='text-muted-foreground'>{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0'>
          <Command>
            <CommandInput placeholder='Search tags...' />
            <CommandList>
              <CommandEmpty>No tag found.</CommandEmpty>
              <CommandGroup>
                {options.map(tag => (
                  <CommandItem
                    key={tag.id}
                    onSelect={() => handleSelect(tag)}
                    className='cursor-pointer'
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selected.includes(tag) ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {tag.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
