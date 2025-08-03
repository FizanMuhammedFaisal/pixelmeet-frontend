import { useState, useMemo } from 'react'
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

TagMatchMode
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { TagMatchMode } from './TagMatchMode'
import { MultiSelectTags } from '../../../../../../components/ui/multi-select-tags'
import { AssetPreview } from '../dashboard/AssetPreview'
import type { Asset, AssetType } from '../../../../types'

export default function AllAssetsTab() {
  const initialAssets: Asset[] = [
    {
      id: '1',
      name: 'Forest Background',
      file: null,
      type: 'image',
      size: 250000,
      metadata: { urlKey: '/placeholder.svg?height=96&width=96' },
      favourite: false,
      deleted: false,
      tags: ['nature', 'landscape', 'background']
    },
    {
      id: '2',
      name: 'Epic Battle Music',
      file: null,
      type: 'audio',
      size: 1200000,
      metadata: null,
      favourite: true,
      deleted: false,
      tags: ['music', 'fantasy', 'soundtrack']
    },
    {
      id: '3',
      name: 'Player Character Sprites',
      file: null,
      type: 'spritesheet',
      size: 80000,
      metadata: { urlKey: '/placeholder.svg?height=96&width=96' },
      favourite: false,
      deleted: false,
      tags: ['character', 'animation', 'pixel-art']
    },
    {
      id: '4',
      name: 'Dungeon Tilemap',
      file: null,
      type: 'tilemapTiledJSON',
      size: 45000,
      metadata: { urlKey: '/placeholder.svg?height=96&width=96' },
      favourite: true,
      deleted: false,
      tags: ['level-design', 'tiles', 'environment']
    },
    {
      id: '5',
      name: 'Deleted Asset Image',
      file: null,
      type: 'image',
      size: 150000,
      metadata: { urlKey: '/placeholder.svg?height=96&width=96' },
      favourite: false,
      deleted: true,
      tags: ['trash', 'old']
    },
    {
      id: '6',
      name: 'Another Image',
      file: null,
      type: 'image',
      size: 90000,
      metadata: { urlKey: '/placeholder.svg?height=96&width=96' },
      favourite: false,
      deleted: false,
      tags: ['abstract', 'design']
    },
    {
      id: '7',
      name: 'Sound Effect',
      file: null,
      type: 'audio',
      size: 30000,
      metadata: null,
      favourite: false,
      deleted: false,
      tags: ['sfx', 'game-audio']
    },
    {
      id: '8',
      name: 'UI Spritesheet',
      file: null,
      type: 'spritesheet',
      size: 60000,
      metadata: { urlKey: '/placeholder.svg?height=96&width=96' },
      favourite: false,
      deleted: false,
      tags: ['ui', 'interface']
    },
    {
      id: '9',
      name: 'City Background',
      file: null,
      type: 'image',
      size: 300000,
      metadata: { urlKey: '/placeholder.svg?height=96&width=96' },
      favourite: false,
      deleted: false,
      tags: ['city', 'urban', 'background']
    },
    {
      id: '10',
      name: 'Ambient Soundscape',
      file: null,
      type: 'audio',
      size: 900000,
      metadata: null,
      favourite: false,
      deleted: false,
      tags: ['ambient', 'soundscape']
    },
    {
      id: '11',
      name: 'Fantasy Character',
      file: null,
      type: 'image',
      size: 180000,
      metadata: { urlKey: '/placeholder.svg?height=96&width=96' },
      favourite: false,
      deleted: false,
      tags: ['character', 'fantasy']
    },
    {
      id: '12',
      name: 'Sci-Fi UI Elements',
      file: null,
      type: 'spritesheet',
      size: 75000,
      metadata: { urlKey: '/placeholder.svg?height=96&width=96' },
      favourite: false,
      deleted: false,
      tags: ['ui', 'sci-fi']
    }
  ]

  const [assets, setAssets] = useState<Asset[]>(initialAssets)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<AssetType | 'all'>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagMatchMode, setTagMatchMode] = useState<'all' | 'any'>('any')
  const [currentPage, setCurrentPage] = useState(1)
  const assetsPerPage = 8

  const uniqueTags = useMemo(() => {
    const tags = new Set<string>()
    initialAssets.forEach(asset => {
      asset.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [initialAssets])

  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch = asset.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      const matchesType = selectedType === 'all' || asset.type === selectedType

      let matchesTags = true
      if (selectedTags.length > 0) {
        if (tagMatchMode === 'all') {
          matchesTags = selectedTags.every(tag => asset.tags?.includes(tag))
        } else {
          matchesTags = selectedTags.some(tag => asset.tags?.includes(tag))
        }
      }

      return matchesSearch && matchesType && matchesTags
    })
  }, [assets, searchQuery, selectedType, selectedTags, tagMatchMode])

  const totalPages = Math.ceil(filteredAssets.length / assetsPerPage)
  const paginatedAssets = useMemo(() => {
    const startIndex = (currentPage - 1) * assetsPerPage
    const endIndex = startIndex + assetsPerPage
    return filteredAssets.slice(startIndex, endIndex)
  }, [filteredAssets, currentPage, assetsPerPage])

  const handleToggleFavorite = (id: string) => {
    setAssets(prevAssets =>
      prevAssets.map(asset =>
        asset.id === id ? { ...asset, favourite: !asset.favourite } : asset
      )
    )
  }

  const handleDelete = (id: string) => {
    setAssets(prevAssets =>
      prevAssets.map(asset =>
        asset.id === id ? { ...asset, deleted: true } : asset
      )
    )
  }

  const handleRestore = (id: string) => {
    setAssets(prevAssets =>
      prevAssets.map(asset =>
        asset.id === id ? { ...asset, deleted: false } : asset
      )
    )
  }

  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  return (
    <div className='bg-background text-foreground min-h-screen p-4 sm:p-6 lg:p-8'>
      {/* Removed h1 "All Assets" as per request */}

      <div className='mb-8 flex flex-col md:flex-row md:items-end gap-4'>
        {/* Search Input */}
        <div className='flex-1 min-w-[200px]'>
          <Label
            htmlFor='search-input'
            className='text-sm font-medium leading-none mb-2 block text-foreground'
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
        <div className='w-full md:w-[180px]'>
          <Label
            htmlFor='type-select'
            className='text-sm font-medium leading-none mb-2 block text-foreground'
          >
            Filter by Type
          </Label>
          <Select
            value={selectedType}
            onValueChange={(value: AssetType | 'all') => {
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
              <SelectItem
                value='unknown'
                className='hover:bg-accent hover:text-accent-foreground'
              >
                Unknown
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter by Tags */}
        <div className='flex-1 min-w-[250px]'>
          <Card className='bg-card border-border text-card-foreground h-full'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm font-medium'>
                Filter by Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MultiSelectTags
                options={uniqueTags}
                selected={selectedTags}
                onChange={newSelected => {
                  setSelectedTags(newSelected)
                  handleFilterChange()
                }}
                placeholder='Select tags...'
              />
            </CardContent>
          </Card>
        </div>

        {/* Tag Match Mode */}
        {selectedTags.length > 0 && ( // Show only if any tag is selected
          <div className='w-full md:w-[200px]'>
            <TagMatchMode
              tagMatchMode={tagMatchMode}
              onValueChange={value => {
                setTagMatchMode(value)
                handleFilterChange()
              }}
            />
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {paginatedAssets.length > 0 ? (
          paginatedAssets.map(asset => (
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
                className={
                  currentPage === 1
                    ? 'pointer-events-none opacity-50'
                    : 'text-foreground hover:bg-accent'
                }
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
                  className={
                    page === currentPage
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  }
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
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'text-foreground hover:bg-accent'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
