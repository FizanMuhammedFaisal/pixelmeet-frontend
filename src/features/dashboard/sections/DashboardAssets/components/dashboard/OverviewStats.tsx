import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { BarChart, Heart, FolderOpen, TrendingUp } from 'lucide-react'
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

interface OverviewStatsProps {
  assets: Asset[]
}

export function OverviewStats({ assets }: OverviewStatsProps) {
  const activeAssets = assets.filter(asset => asset.status === 'active')

  const totalSize = activeAssets.reduce((acc, asset) => {
    const size = Number.parseFloat(asset.fileSize.split(' ')[0])
    const unit = asset.fileSize.split(' ')[1]
    const sizeInKB = unit === 'MB' ? size * 1024 : size
    return acc + sizeInKB
  }, 0)

  const formatSize = (sizeInKB: number) => {
    if (sizeInKB > 1024) {
      return `${(sizeInKB / 1024).toFixed(1)} MB`
    }
    return `${sizeInKB.toFixed(0)} KB`
  }

  const favoriteCount = activeAssets.filter(asset => asset.isFavorite).length
  const totalUsage = activeAssets.reduce(
    (acc, asset) => acc + (asset.usageCount || 0),
    0
  )

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Assets</CardTitle>
          <FolderOpen className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{activeAssets.length}</div>
          <p className='text-xs text-muted-foreground'>All active files</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Size</CardTitle>
          <BarChart className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{formatSize(totalSize)}</div>
          <p className='text-xs text-muted-foreground'>
            Combined size of all assets
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Favorites</CardTitle>
          <Heart className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{favoriteCount}</div>
          <p className='text-xs text-muted-foreground'>
            Your most loved assets
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Usage</CardTitle>
          <TrendingUp className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalUsage}</div>
          <p className='text-xs text-muted-foreground'>Across all projects</p>
        </CardContent>
      </Card>
    </div>
  )
}
