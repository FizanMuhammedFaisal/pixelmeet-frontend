import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

export interface AssetCategory {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

interface AssetStatsProps {
  assets: Asset[]
}

export function AssetStats({ assets }: AssetStatsProps) {
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
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden'>
      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-medium'>Total Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{activeAssets.length}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-medium'>Total Size</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{formatSize(totalSize)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-medium'>Favorites</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{favoriteCount}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='pb-2'>
          <CardTitle className='text-sm font-medium'>Total Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{totalUsage}</div>
        </CardContent>
      </Card>
    </div>
  )
}
