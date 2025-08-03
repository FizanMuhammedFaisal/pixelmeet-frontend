import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Heart,
  Download,
  Edit,
  Copy,
  Play,
  Volume2,
  Trash2,
  Undo2
} from 'lucide-react'
import type { Asset } from '../../../../types'

interface AssetPreviewProps {
  asset: Asset
  onToggleFavorite: (id: string) => void
  onDelete: (id: string) => void
  onRestore: (id: string) => void
}

export function AssetPreview({
  asset,
  onToggleFavorite,
  onDelete,
  onRestore
}: AssetPreviewProps) {
  const renderPreview = () => {
    switch (asset.type) {
      case 'audio':
        return (
          <div className='flex items-center justify-center h-24 bg-muted rounded-lg'>
            <Volume2 className='h-8 w-8 text-muted-foreground' />
          </div>
        )
      default:
        return (
          <div className='relative h-24 bg-muted rounded-lg overflow-hidden'>
            <img
              src={
                asset.metadata?.urlKey ||
                '/placeholder.svg?height=96&width=96&query=asset preview'
              }
              alt={asset.name}
              className='object-cover w-full h-full'
            />
          </div>
        )
    }
  }

  return (
    <Card className='group relative hover:shadow-md hover:scale-[1.02] transition-all overflow-hidden'>
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
                  asset.favourite ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </Button>
          </div>
          <div className='flex items-center justify-between text-xs text-muted-foreground'>
            <span>
              {asset.size ? `${(asset.size / 1024).toFixed(2)} KB` : 'N/A'}
            </span>
            {/* {asset.size && <span>{asset.size} uses</span>} */}{' '}
            {/* Assuming 'uses' is a different metric */}
          </div>
          {/* <div className='flex flex-wrap gap-1'>
            {asset.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant='outline' className='text-xs'>
                {tag}
              </Badge>
            ))}
          </div> */}
          <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
            {asset.type === 'audio' && (
              <Button variant='ghost' size='sm' className='h-6 px-2'>
                <Play className='h-3 w-3' />
              </Button>
            )}
            {asset.deleted ? (
              <>
                <Button variant='ghost' size='sm' className='h-6 px-2'>
                  <Undo2 className='h-3 w-3' />
                  <span className='sr-only'>Restore</span>
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-6 px-2 text-red-500'
                  onClick={() => onDelete(asset.id)}
                >
                  <Trash2 className='h-3 w-3' />
                  <span className='sr-only'>Delete Permanently</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant='ghost' size='sm' className='h-6 px-2'>
                  <Edit className='h-3 w-3' />
                  <span className='sr-only'>Edit</span>
                </Button>
                <Button variant='ghost' size='sm' className='h-6 px-2'>
                  <Download className='h-3 w-3' />
                  <span className='sr-only'>Download</span>
                </Button>
                <Button variant='ghost' size='sm' className='h-6 px-2'>
                  <Copy className='h-3 w-3' />
                  <span className='sr-only'>Copy</span>
                </Button>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-6 px-2 text-red-500'
                  onClick={() => onDelete(asset.id)}
                >
                  <Trash2 className='h-3 w-3' />
                  <span className='sr-only'>Move to Trash</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
