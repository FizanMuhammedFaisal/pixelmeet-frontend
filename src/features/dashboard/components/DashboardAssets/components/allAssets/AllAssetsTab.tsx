import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Label } from '@/components/ui/label'

import { AssetPreview } from '../dashboard/AssetPreview'
import type { Asset, AssetType } from '../../../../types'
import { TagMultiSelect } from '../../../../../../shared/layout/common/TagMultiSelect'
import type { Tag } from '../../../../../../app/store/admin/tagsTab.store'
import { cn } from '../../../../../../shared/lib/utils'
import { TagMatchMode } from './TagMatchMode'
import { useGetAssets } from '../../../../hooks/assets/useGetAssets'

export default function AllAssetsTab() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<AssetType | 'all'>('all')
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [tagMatchMode, setTagMatchMode] = useState<'all' | 'any'>('any')
  const [currentPage, setCurrentPage] = useState(1)

  const limit = 8

  const totalPages = Math.ceil(assets.length / limit)

  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  const { data, isLoading } = useGetAssets({
    limit,
    page: currentPage,
    type: selectedType,
    tags: selectedTags.map(c => c.id),
    matchmode: tagMatchMode,
    q: searchQuery
  })
  useEffect(() => {
    if (data && !isLoading) {
      console.log('settingd ta')
      setAssets(data.data.data.assets)
    }
  }, [data, isLoading])
  const handleToggleFavorite = () => {
    console.log('toglg fav')
  }
  const handleDelete = () => {
    console.log('toglg del')
  }
  const handleRestore = () => {
    console.log('toglg res')
  }
  return (
    <div className='bg-background text-foreground min-h-screen p-4 sm:p-6 lg:p-8'>
      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {/* Search Input */}
        <div className='space-y-2'>
          <Label
            htmlFor='search-input'
            className='text-sm font-medium leading-none text-foreground'
          >
            Search assets
          </Label>
          <Input
            id='search-input'
            placeholder='Search assets...'
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value)
              handleFilterChange()
            }}
            className='bg-input border-input text-foreground placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-background'
          />
        </div>

        {/* Filter by Type */}
        <div className='space-y-2'>
          <Label
            htmlFor='type-select'
            className='text-sm font-medium leading-none text-foreground'
          >
            Filter by Type
          </Label>
          <Select
            value={selectedType}
            onValueChange={(value: AssetType) => {
              setSelectedType(value)
              handleFilterChange()
            }}
          >
            <SelectTrigger
              id='type-select'
              className='bg-input border-input text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:ring-offset-background'
            >
              <SelectValue placeholder='All Types' />
            </SelectTrigger>
            <SelectContent className='bg-popover border-border text-popover-foreground'>
              <SelectItem
                value='all'
                className='hover:bg-accent hover:text-accent-foreground'
              >
                All Types
              </SelectItem>
              <SelectItem
                value='image'
                className='hover:bg-accent hover:text-accent-foreground'
              >
                Image
              </SelectItem>
              <SelectItem
                value='audio'
                className='hover:bg-accent hover:text-accent-foreground'
              >
                Audio
              </SelectItem>
              <SelectItem
                value='spritesheet'
                className='hover:bg-accent hover:text-accent-foreground'
              >
                Spritesheet
              </SelectItem>
              <SelectItem
                value='tilemapTiledJSON'
                className='hover:bg-accent hover:text-accent-foreground'
              >
                Tilemap
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label
            htmlFor='tag-multi-select'
            className='text-sm font-medium leading-none text-foreground'
          >
            Filter by Tags
          </Label>
          <TagMultiSelect
            key='tag-multi-select'
            selected={selectedTags}
            onChange={newTags => {
              setSelectedTags(newTags)
              handleFilterChange()
            }}
          />
        </div>

        {selectedTags.length > 0 && (
          <TagMatchMode
            tagMatchMode={tagMatchMode}
            onValueChange={value => {
              setTagMatchMode(value)
              handleFilterChange()
            }}
          />
        )}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {assets.length > 0 ? (
          assets.map(asset => (
            <AssetPreview
              key={asset.id}
              asset={asset}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
              onRestore={handleRestore}
            />
          ))
        ) : (
          <div className='col-span-full text-center text-muted-foreground py-8'>
            No assets found matching your criteria.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination className='mt-8'>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={e => {
                  e.preventDefault()
                  setCurrentPage(prev => Math.max(1, prev - 1))
                }}
                aria-disabled={currentPage === 1}
                tabIndex={currentPage === 1 ? -1 : undefined}
                className={cn(
                  currentPage === 1 ? 'pointer-events-none opacity-50' : '',
                  'text-foreground hover:bg-accent'
                )}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  href='#'
                  isActive={page === currentPage}
                  onClick={e => {
                    e.preventDefault()
                    setCurrentPage(page)
                  }}
                  className={cn(
                    page === currentPage
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : '',
                    'text-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={e => {
                  e.preventDefault()
                  setCurrentPage(prev => Math.min(totalPages, prev + 1))
                }}
                aria-disabled={currentPage === totalPages}
                tabIndex={currentPage === totalPages ? -1 : undefined}
                className={cn(
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : '',
                  'text-foreground hover:bg-accent'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
