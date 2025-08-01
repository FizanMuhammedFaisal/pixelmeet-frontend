import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, X } from 'lucide-react'

interface AssetSearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  activeFilters: string[]
  onRemoveFilter: (filter: string) => void
  onToggleFilter: () => void
}

export function AssetSearchBar({
  searchQuery,
  onSearchChange,
  activeFilters,
  onRemoveFilter,
  onToggleFilter
}: AssetSearchBarProps) {
  return (
    <div className='space-y-3 overflow-hidden'>
      <div className='flex gap-2'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search assets...'
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className='pl-10'
          />
        </div>
        <Button
          variant='outline'
          onClick={onToggleFilter}
          className='gap-2 bg-transparent'
        >
          <Filter className='h-4 w-4' />
          Filter
        </Button>
      </div>

      {activeFilters.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {activeFilters.map(filter => (
            <Badge key={filter} variant='secondary' className='gap-1'>
              {filter}
              <Button
                variant='ghost'
                size='sm'
                className='h-3 w-3 p-0 hover:bg-transparent'
                onClick={() => onRemoveFilter(filter)}
              >
                <X className='h-2 w-2' />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
