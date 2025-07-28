import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Download, Edit, Copy, Play, Volume2 } from 'lucide-react'
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
interface AssetPreviewProps {
  asset: Asset
  onToggleFavorite: (id: string) => void
}

export function AssetPreview({ asset, onToggleFavorite }: AssetPreviewProps) {
  const renderPreview = () => {
    switch (asset.type) {
      case 'sound':
        return (
          <div className='flex items-center justify-center h-24 bg-muted rounded-lg'>
            <Volume2 className='h-8 w-8 text-muted-foreground' />
          </div>
        )
      default:
        return (
          <div className='relative h-24 bg-muted rounded-lg overflow-hidden'>
            <img
              src={asset.previewUrl || '/placeholder.svg'}
              alt={asset.name}
              className='object-cover'
            />
          </div>
        )
    }
  }

  return (
    <Card className='group hover:shadow-md transition-all'>
      <CardContent className='p-4'>
        {renderPreview()}

        <div className='mt-3 space-y-2'>
          <div className='flex items-start justify-between'>
            <h3 className='font-medium text-sm truncate flex-1'>
              {asset.name}
            </h3>
            <Button
              variant='ghost'
              size='sm'
              className='h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity'
              onClick={() => onToggleFavorite(asset.id)}
            >
              <Heart
                className={`h-3 w-3 ${
                  asset.isFavorite ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </Button>
          </div>

          <div className='flex items-center justify-between text-xs text-muted-foreground'>
            <span>{asset.fileSize}</span>
            {asset.usageCount && <span>{asset.usageCount} uses</span>}
          </div>

          <div className='flex flex-wrap gap-1'>
            {asset.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant='outline' className='text-xs'>
                {tag}
              </Badge>
            ))}
          </div>

          <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
            {asset.type === 'sound' && (
              <Button variant='ghost' size='sm' className='h-6 px-2'>
                <Play className='h-3 w-3' />
              </Button>
            )}
            <Button variant='ghost' size='sm' className='h-6 px-2'>
              <Edit className='h-3 w-3' />
            </Button>
            <Button variant='ghost' size='sm' className='h-6 px-2'>
              <Download className='h-3 w-3' />
            </Button>
            <Button variant='ghost' size='sm' className='h-6 px-2'>
              <Copy className='h-3 w-3' />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
