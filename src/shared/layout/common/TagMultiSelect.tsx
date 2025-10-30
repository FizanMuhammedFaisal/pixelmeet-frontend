import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { cn } from '../../lib/utils'

import type { Tag } from '../../../app/store/admin/tagsTab.store'
import { Spinner } from '../../../components/ui/spinner'
import { useIncrementalTags } from '@/features/dashboard/sections/DashboardAssets/hooks'
export type sTags = {
   id: string
   __tagType: 'sTag'
}
interface TagMultiSelectProps {
   selected: Tag[] | sTags[]
   onChange: (selected: Tag[] | sTags[]) => void
   placeholder?: string
}
export function isIds(id: Tag[] | sTags[]): id is sTags[] {
   const first = id[0]
   return typeof first === 'object' && 'id' in first && !('name' in first)
}

export function TagMultiSelect({
   selected,
   onChange,
   placeholder = 'Select tags...',
}: TagMultiSelectProps) {
   const [open, setOpen] = React.useState(false)
   let selectedIds
   if (isIds(selected)) {
      selectedIds = new Set(selected.map((curr) => curr.id))
   } else {
      selectedIds = new Set(selected.map((item) => item.id))
   }
   const { isLoading, loadMore, setSearchTerm, tags, totalTags, hasMore } = useIncrementalTags()

   const commandListRef = React.useRef<HTMLDivElement>(null)

   const handleSelect = (value: Tag) => {
      console.log(value)
      if (isIds(selected)) {
         const tag = value.id
         const exists = selectedIds.has(value.id)
         const newSelected = exists
            ? selected.filter((curr) => curr.id !== tag)
            : ([...selected, { id: tag, __tagType: 'sTag' }] as unknown as sTags[])
         console.log(newSelected)
         onChange(newSelected)
      } else {
         const exists = selectedIds.has(value.id)

         const newSelected = exists
            ? selected.filter((item) => item.id !== value.id)
            : [...selected, value]

         onChange(newSelected)
      }
   }

   const handleRemoveTag = (tagToRemove: Tag) => {
      const removed = isIds(selected)
         ? selected.filter((curr) => curr.id !== tagToRemove.id)
         : selected.filter((tag) => tag.id !== tagToRemove.id)
      onChange(removed)
   }

   const handleScroll = React.useCallback(() => {
      const list = commandListRef.current
      if (list && !isLoading && hasMore) {
         const { scrollTop, scrollHeight, clientHeight } = list
         // Check if scrolled to the bottom (with a small threshold)
         if (scrollTop + clientHeight >= scrollHeight - 50) {
            loadMore()
         }
      }
   }, [isLoading, loadMore, hasMore])
   const selectedTags = isIds(selected) ? tags.filter((curr) => selectedIds.has(curr.id)) : selected
   return (
      <div className="flex flex-col gap-2" key="tagmultiselect">
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between min-h-[36px] h-auto bg-transparent"
               >
                  <div className="flex flex-wrap gap-1">
                     {selectedTags.length > 0 ? (
                        selectedTags.map((tag) => (
                           <Badge
                              key={tag.id}
                              variant="secondary"
                              className="flex items-center gap-1"
                           >
                              {tag.name}
                              <button
                                 type="button"
                                 onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveTag(tag)
                                 }}
                                 className="ml-1 rounded-full outline-none focus:outline-none focus:ring-0 focus:ring-offset-0"
                              >
                                 <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                           </Badge>
                        ))
                     ) : (
                        <span className="text-muted-foreground">{placeholder}</span>
                     )}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
               <Command>
                  <div className="flex">
                     <CommandInput placeholder="Search tags..." onValueChange={setSearchTerm} />
                     {isLoading && (
                        <div className="inset-0 p-2 ">
                           <Spinner size="sm" />
                        </div>
                     )}
                  </div>
                  <CommandList
                     ref={commandListRef}
                     onScroll={handleScroll}
                     className="max-h-[200px]"
                  >
                     <CommandEmpty>No tag found.</CommandEmpty>
                     <CommandGroup>
                        {tags.map((tag) => (
                           <CommandItem
                              key={tag.id}
                              onSelect={() => handleSelect(tag)}
                              className="cursor-pointer"
                           >
                              <Check
                                 className={cn(
                                    'mr-2 h-4 w-4',
                                    selectedIds.has(tag.id) ? 'opacity-100' : 'opacity-0',
                                 )}
                              />
                              {tag.name}
                           </CommandItem>
                        ))}
                     </CommandGroup>

                     {!hasMore && tags.length > 0 && (
                        <div className="text-center text-sm text-muted-foreground py-2">
                           No more tags to load
                        </div>
                     )}
                  </CommandList>
               </Command>
            </PopoverContent>
         </Popover>
      </div>
   )
}
