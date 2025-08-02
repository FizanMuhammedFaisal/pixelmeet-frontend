import type { UpdateFileInput } from '../../../../../../app/store/uploadTab.store'
import { Input } from '../../../../../../components/ui/input'
import { Label } from '../../../../../../components/ui/label'
import type { UploadFile } from '../../../../types'

type Props<T extends UploadFile> = {
  updateFile: (id: string, updates: UpdateFileInput) => void
  file: T
}
export const renderMetadataForm = <T extends UploadFile>({
  updateFile,
  file
}: Props<T>) => {
  const { id, name, type, metadata, description, error } = file
  switch (type) {
    case 'spritesheet':
      return (
        <>
          <div className='grid gap-2'>
            <Label htmlFor={`frame-width-${id}`}>Frame Width (px)</Label>
            <Input
              id={`frame-width-${id}`}
              type='number'
              value={metadata?.frameConfig?.frameWidth ?? ''}
              onChange={e =>
                updateFile(id, {
                  type: 'spritesheet',
                  metadata: {
                    frameConfig: {
                      frameWidth: Number.parseInt(e.target.value) || 0
                    }
                  }
                })
              }
              placeholder='e.g., 32'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor={`frame-height-${id}`}>Frame Height (px)</Label>
            <Input
              id={`frame-height-${id}`}
              type='number'
              value={metadata?.frameConfig?.frameHeight ?? ''}
              onChange={e =>
                updateFile(id, {
                  type: 'spritesheet',
                  metadata: {
                    frameConfig: {
                      frameHeight: Number.parseInt(e.target.value) || 0
                    }
                  }
                })
              }
              placeholder='e.g., 32'
            />
          </div>
        </>
      )
    case 'audio':
      return (
        <>
          <div className='grid gap-2'>
            <Label htmlFor={`tags-${id}`}>Tags (comma-separated)</Label>
            <Input
              id={`tags-${id}`}
              value={metadata?.url || ''}
              // onChange={e =>
              //   handleMetadataChange('audio', 'tags', e.target.value)
              // }
              placeholder='e.g., music, background'
            />
          </div>
        </>
      )
    case 'tilemapTiledJSON':
      return (
        <>
          <div className='grid gap-2'>
            <Label htmlFor={`asset-name-${id}`}>Asset Name</Label>
            <Input
              id={`asset-name-${id}`}
              value={name || ''}
              onChange={e =>
                updateFile(id, {
                  type: 'tilemapTiledJSON',
                  name: e.target.value
                })
              }
              placeholder='e.g., Forest Tileset'
            />
          </div>
          <div className='grid gap-2 col-span-2'>
            <Label htmlFor={`description-${id}`}>Description</Label>
            <Input
              id={`description-${id}`}
              value={description || ''}
              onChange={e =>
                updateFile(id, { type: 'image', description: e.target.value })
              }
              placeholder='Optional description'
            />
          </div>
        </>
      )
    case 'image':
      return (
        <>
          <div className='grid gap-2'>
            <Label htmlFor={`asset-name-${id}`}>Asset Name</Label>
            <Input
              id={`asset-name-${id}`}
              value={name || ''}
              onChange={e =>
                updateFile(id, { type: 'image', name: e.target.value })
              }
              placeholder='e.g., Forest Tileset'
            />
          </div>
          <div className='grid gap-2 col-span-2'>
            <Label htmlFor={`description-${id}`}>Description</Label>
            <Input
              id={`description-${id}`}
              value={description || ''}
              onChange={e =>
                updateFile(id, { type: 'image', description: e.target.value })
              }
              placeholder='Optional description'
            />
          </div>
        </>
      )

    default:
      return (
        <>
          <div className='grid gap-2'>
            <Label htmlFor={`asset-name-${id}`}>Asset Name</Label>
            <Input
              id={`asset-name-${id}`}
              value={name || ''}
              onChange={e =>
                updateFile(id, { type: 'image', name: e.target.value })
              }
              placeholder='e.g., Forest Tileset'
            />
          </div>
          <div className='grid gap-2 col-span-2'>
            <Label htmlFor={`description-${id}`}>Description</Label>
            <Input
              id={`description-${id}`}
              value={description || ''}
              onChange={e =>
                updateFile(id, { type: 'image', description: e.target.value })
              }
              placeholder='Optional description'
            />
          </div>
        </>
      )
  }
}
