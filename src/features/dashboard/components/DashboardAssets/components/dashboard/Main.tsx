import { useNavigate } from 'react-router'
import { AssetCategoryCard } from './AssetCategoryCard'
import { AssetSearchBar } from './AssetSearch'
import { OverviewStats } from './OverviewStats'

import { type AssetDashboardTabs } from '../../DashboardAssets'
import { cn } from '@/shared/lib/utils'
import { useMemo, useState } from 'react'
import { AssetPreview } from './AssetPreview'
type Props = {
  viewMode: 'grid' | 'list'
  currentTab: AssetDashboardTabs
}
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
  status: 'active' | 'deleted'
}

export interface AssetCategory {
  id: string
  name: string
  description: string
  icon: string
  count: number
}
export const assetCategories: AssetCategory[] = [
  {
    id: 'tilesets',
    name: 'Tilesets',
    description: 'Tile graphics used in maps',
    icon: 'Grid3X3',
    count: 24
  },
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
    usageCount: 5,
    status: 'active'
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
    usageCount: 3,
    status: 'active'
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
    usageCount: 2,
    status: 'active'
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
    usageCount: 8,
    status: 'active'
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
    usageCount: 12,
    status: 'active'
  },
  {
    id: '6',
    name: 'old-wall-tileset.png',
    type: 'tileset',
    category: 'Architecture',
    fileSize: '300 KB',
    uploadDate: 'Jan 10, 2024',
    uploadedBy: 'John Doe',
    isFavorite: false,
    previewUrl: '/placeholder.svg?height=100&width=100',
    fileUrl: '/assets/old-wall-tileset.png',
    tags: ['wall', 'tiles', 'dungeon'],
    usageCount: 1,
    status: 'deleted' // Example of a deleted asset
  },
  {
    id: '7',
    name: 'enemy-idle.gif',
    type: 'sprite',
    category: 'Enemies',
    fileSize: '90 KB',
    uploadDate: 'Jan 9, 2024',
    uploadedBy: 'Jane Smith',
    isFavorite: false,
    previewUrl: '/placeholder.svg?height=100&width=100',
    fileUrl: '/assets/enemy-idle.gif',
    tags: ['enemy', 'animation', 'idle'],
    usageCount: 4,
    status: 'active'
  },
  {
    id: '8',
    name: 'space-background.png',
    type: 'background',
    category: 'Sci-Fi',
    fileSize: '700 KB',
    uploadDate: 'Jan 8, 2024',
    uploadedBy: 'Mike Johnson',
    isFavorite: false,
    previewUrl: '/placeholder.svg?height=100&width=100',
    fileUrl: '/assets/space-bg.png',
    tags: ['space', 'galaxy', 'stars'],
    usageCount: 0,
    status: 'active'
  },
  {
    id: '9',
    name: 'player-emote-happy.png',
    type: 'avatar',
    category: 'Players',
    fileSize: '30 KB',
    uploadDate: 'Jan 7, 2024',
    uploadedBy: 'Sarah Wilson',
    isFavorite: true,
    previewUrl: '/placeholder.svg?height=100&width=100',
    fileUrl: '/assets/emote-happy.png',
    tags: ['emote', 'happy', 'player'],
    usageCount: 6,
    status: 'active'
  },
  {
    id: '10',
    name: 'door-open.mp3',
    type: 'sound',
    category: 'SFX',
    fileSize: '20 KB',
    uploadDate: 'Jan 6, 2024',
    uploadedBy: 'Tom Brown',
    isFavorite: false,
    previewUrl: '/placeholder.svg?height=100&width=100',
    fileUrl: '/assets/door-open.mp3',
    tags: ['door', 'sfx', 'interaction'],
    usageCount: 9,
    status: 'active'
  }
]
function MainTab({ viewMode, currentTab }: Props) {
  const router = useNavigate()
  const [assets, setAssets] = useState<Asset[]>(mockAssets)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([]) // Not fully implemented, but kept for structure
  const recentAssets = useMemo(() => {
    // For demonstration, let's pick the 5 most recently uploaded active assets
    return assets
      .filter(asset => asset.status === 'active')
      .sort(
        (a, b) =>
          new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      )
      .slice(0, 5)
  }, [assets])

  const handleToggleFavorite = (id: string) => {
    setAssets(prev =>
      prev.map(asset =>
        asset.id === id ? { ...asset, isFavorite: !asset.isFavorite } : asset
      )
    )
  }

  const handleDeleteAsset = (id: string) => {
    setAssets(prev =>
      prev.map(asset =>
        asset.id === id ? { ...asset, status: 'deleted' } : asset
      )
    )
  }

  const handleRestoreAsset = (id: string) => {
    setAssets(prev =>
      prev.map(asset =>
        asset.id === id ? { ...asset, status: 'active' } : asset
      )
    )
  }

  const handleUpload = () => {
    // Placeholder for file upload logic
    console.log('Upload files')
  }
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch =
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )

      let matchesTab = true
      if (currentTab === 'favorites') {
        matchesTab = asset.isFavorite && asset.status === 'active'
      } else if (currentTab === 'deleted') {
        matchesTab = asset.status === 'deleted'
      } else if (currentTab === 'all') {
        matchesTab = asset.status === 'active'
      }
      // 'upload' tab doesn't filter assets, it shows the upload zone

      return matchesSearch && matchesTab
    })
  }, [assets, searchQuery, currentTab])

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter))
  }
  return (
    <main className='flex-1 flex flex-col p-6 overflow-auto container mx-auto '>
      {/* Header */}
      <div className='flex items-center justify-between flex-wrap gap-4 mb-6'>
        <div>
          <h1 className='text-3xl font-bold'>Assets Dashboard</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className='mb-6'>
        <AssetSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onToggleFilter={() => {}} // Placeholder for filter toggle
        />
      </div>

      {/* Overview Section (replacing just stats) */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Overview</h2>
        <OverviewStats assets={assets} />
      </section>

      {/* <section className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Browse Categories</h2>

        <div className='overflow-x-auto w-full'>
          <div className='flex gap-4 pb-4 w-max px-4'>
            {assetCategories.map(category => (
              <AssetCategoryCard
                key={category.id}
                category={category}
                onClick={() => router(`/assets/${category.id}`)}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* Recent Assets */}
      <section className='mb-8'>
        <h2 className='text-xl font-semibold mb-4'>Recent Assets</h2>
        {recentAssets.length === 0 ? (
          <div className='text-center py-8 text-muted-foreground'>
            <p>No recent assets to display.</p>
          </div>
        ) : (
          <div
            className={cn(
              'grid gap-4 overflow-x-auto pb-4 scrollbar-hide',
              viewMode === 'grid'
                ? 'grid-cols-[repeat(auto-fill,minmax(200px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]'
                : 'grid-cols-1'
            )}
          >
            {recentAssets.map(asset => (
              <AssetPreview
                key={asset.id}
                asset={asset}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDeleteAsset}
                onRestore={handleRestoreAsset}
              />
            ))}
          </div>
        )}
      </section>

      {/* <section className='flex-1 flex flex-col'>
          <h2 className='text-xl font-semibold mb-4'>
            {currentTab === 'all' && 'All Active Assets'}
            {currentTab === 'favorites' && 'Your Favorite Assets'}
            {currentTab === 'deleted' && 'Deleted Assets'}
            {currentTab === 'upload' && 'Upload New Assets'}
          </h2>
          {currentTab === 'upload' ? (
            <div className='max-w-2xl mx-auto w-full'>
              <AssetUploadZone onUpload={handleUpload} />
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className='text-center py-12 text-muted-foreground'>
              <p>No assets found in this section matching your criteria.</p>
            </div>
          ) : (
            <div
              className={cn(
                'grid gap-4 flex-1',
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
                  : 'grid-cols-1'
              )}
            >
              {filteredAssets.map(asset => (
                <AssetPreview
                  key={asset.id}
                  asset={asset}
                  onToggleFavorite={handleToggleFavorite}
                  onDelete={handleDeleteAsset}
                  onRestore={handleRestoreAsset}
                />
              ))}
            </div>
          )}
        </section> */}
    </main>
  )
}

export default MainTab
