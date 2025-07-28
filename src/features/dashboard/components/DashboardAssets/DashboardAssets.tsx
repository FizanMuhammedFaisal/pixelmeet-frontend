import { useState } from 'react'

export const assetCategories: AssetCategory[] = [
  {
    id: 'tilesets',
    name: 'Tilesets',
    description: 'Tile graphics used in maps',
    icon: 'Grid3X3',
    count: 24
  },
  {
    id: 'sprites',
    name: 'Sprites',
    description: 'Character sprites and animations',
    icon: 'User',
    count: 18
  },
  {
    id: 'avatars',
    name: 'Avatars',
    description: 'Player avatars and emotes',
    icon: 'UserCircle',
    count: 12
  },
  {
    id: 'backgrounds',
    name: 'Backgrounds',
    description: 'Scene backgrounds and parallax layers',
    icon: 'Image',
    count: 8
  },
  {
    id: 'sounds',
    name: 'Sounds',
    description: 'Audio clips for SFX and music',
    icon: 'Volume2',
    count: 15
  }
]

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'grass-tileset.png',
    type: 'tileset',
    category: 'Nature',
    fileSize: '256 KB',
    uploadDate: 'Jan 15, 2024',
    uploadedBy: 'John Doe',
    isFavorite: true,
    previewUrl: '/placeholder.svg?height=100&width=100',
    fileUrl: '/assets/grass-tileset.png',
    tags: ['grass', 'nature', 'outdoor'],
    usageCount: 5
  },
  {
    id: '2',
    name: 'hero-walk-cycle.gif',
    type: 'sprite',
    category: 'Characters',
    fileSize: '128 KB',
    uploadDate: 'Jan 14, 2024',
    uploadedBy: 'Jane Smith',
    isFavorite: false,
    previewUrl: '/placeholder.svg?height=100&width=100',
    fileUrl: '/assets/hero-walk.gif',
    tags: ['hero', 'animation', 'walk'],
    usageCount: 3
  },
  {
    id: '3',
    name: 'forest-background.jpg',
    type: 'background',
    category: 'Environments',
    fileSize: '512 KB',
    uploadDate: 'Jan 13, 2024',
    uploadedBy: 'Mike Johnson',
    isFavorite: true,
    previewUrl: '/placeholder.svg?height=100&width=100',
    fileUrl: '/assets/forest-bg.jpg',
    tags: ['forest', 'trees', 'nature'],
    usageCount: 2
  },
  {
    id: '4',
    name: 'player-avatar-1.png',
    type: 'avatar',
    category: 'Players',
    fileSize: '64 KB',
    uploadDate: 'Jan 12, 2024',
    uploadedBy: 'Sarah Wilson',
    isFavorite: false,
    previewUrl: '/placeholder.svg?height=100&width=100',
    fileUrl: '/assets/avatar-1.png',
    tags: ['player', 'avatar', 'character'],
    usageCount: 8
  },
  {
    id: '5',
    name: 'footsteps.mp3',
    type: 'sound',
    category: 'SFX',
    fileSize: '32 KB',
    uploadDate: 'Jan 11, 2024',
    uploadedBy: 'Tom Brown',
    isFavorite: true,
    previewUrl: '/placeholder.svg?height=100&width=100',
    fileUrl: '/assets/footsteps.mp3',
    tags: ['footsteps', 'sfx', 'walking'],
    usageCount: 12
  }
]

import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LayoutGrid, List } from 'lucide-react'
import { AssetStats } from './components/AssetStats'
import { AssetSearchBar } from './components/AssetSearch'
import { AssetCategoryCard } from './components/AssetCategoryCard'
import { AssetPreview } from './components/AssetPreview'
import { AssetUploadZone } from './components/AssetUploadZone'
export interface Asset {
  id: string
  name: string
  type: 'tileset' | 'sprite' | 'avatar' | 'background' | 'sound'
  category: string
  fileSize: string
  uploadDate: string
  uploadedBy: string
  isFavorite: boolean
  previewUrl: string
  fileUrl: string
  tags: string[]
  usageCount?: number
}

export default function AdminDashboardAssetsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [assets, setAssets] = useState<Asset[]>(mockAssets)

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = !selectedCategory || asset.type === selectedCategory
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some(tag =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    return matchesCategory && matchesSearch
  })

  const handleToggleFavorite = (id: string) => {
    setAssets(prev =>
      prev.map(asset =>
        asset.id === id ? { ...asset, isFavorite: !asset.isFavorite } : asset
      )
    )
  }

  const handleUpload = () => {
    // Handle file upload logic
    console.log('Upload files')
  }

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter))
  }

  return (
    <div className='flex flex-1 flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Assets Dashboard</h1>
          <p className='text-muted-foreground'>
            Manage your game assets including tilesets, sprites, avatars,
            backgrounds, and sounds
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className='h-4 w-4' />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size='sm'
            onClick={() => setViewMode('list')}
          >
            <List className='h-4 w-4' />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <AssetStats assets={filteredAssets} />

      {/* Search and Filters */}
      <AssetSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
        onToggleFilter={() => {}}
      />

      {/* Categories */}
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        {assetCategories.map(category => (
          <AssetCategoryCard
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )
            }
          />
        ))}
      </div>

      {/* Content */}
      <Tabs defaultValue='assets' className='flex-1'>
        <TabsList>
          <TabsTrigger value='assets'>Assets</TabsTrigger>
          <TabsTrigger value='upload'>Upload</TabsTrigger>
        </TabsList>

        <TabsContent value='assets' className='mt-6'>
          {filteredAssets.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-muted-foreground'>
                No assets found matching your criteria.
              </p>
            </div>
          ) : (
            <div
              className={`grid gap-4 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
                  : 'grid-cols-1'
              }`}
            >
              {filteredAssets.map(asset => (
                <AssetPreview
                  key={asset.id}
                  asset={asset}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value='upload' className='mt-6'>
          <div className='max-w-2xl mx-auto'>
            <AssetUploadZone onUpload={handleUpload} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
