import { useCallback, useMemo } from 'react'
import { Card, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { Badge } from '@/components/ui/badge'

import {
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  PlayCircle,
  ImageIcon
} from 'lucide-react'
import type {
  AssetType,
  UploadFile,
  UploadStatus
} from '../../../../types/upload/types'

interface FileUploadCardProps {
  file: UploadFile
  onRemove: () => void
  onUpload: () => void
  onUpdate: (updatedFields: Partial<UploadFile>) => void
}

export function FileUploadCard({
  file,
  onRemove,
  onUpload,
  onUpdate
}: FileUploadCardProps) {
  const {
    id,
    name,
    size,
    previewUrl,
    type,
    metadata,
    uploadStatus,
    description,
    error
  } = file
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'

    const units = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    const file = bytes / Math.pow(1024, i)
    return `${file.toFixed(2)}${units[i]}`
  }
  const handleTypeChange = useCallback(
    (newType: AssetType) => {
      onUpdate({ type: newType, metadata: {} }) // Reset metadata when type changes
    },
    [onUpdate]
  )

  const handleMetadataChange = useCallback(
    (key: string, value: any) => {
      onUpdate({ metadata: { ...metadata, [key]: value } })
    },
    [metadata, onUpdate]
  )

  const renderPreview = useMemo(() => {
    if (!previewUrl) {
      return (
        <div className='flex items-center justify-center w-full h-full bg-muted rounded-md'>
          <ImageIcon className='w-8 h-8 text-muted-foreground' />
        </div>
      )
    }
    if (file.file.type.startsWith('image/')) {
      return (
        <img
          src={previewUrl || '/placeholder.svg'}
          alt='File preview'
          className='object-cover w-full h-full rounded-md'
        />
      )
    }
    if (file.file.type.startsWith('audio/')) {
      return (
        <div className='flex items-center justify-center w-full h-full bg-muted rounded-md'>
          <audio controls src={previewUrl} className='w-full h-full' />
        </div>
      )
    }
    return (
      <div className='flex items-center justify-center w-full h-full bg-muted rounded-md'>
        <ImageIcon className='w-8 h-8 text-muted-foreground' />
      </div>
    )
  }, [previewUrl, file.file.type])

  const renderMetadataForm = useMemo(() => {
    switch (type) {
      case 'spritesheet':
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor={`frame-width-${id}`}>Frame Width (px)</Label>
              <Input
                id={`frame-width-${id}`}
                type='number'
                value={metadata?.frameConfig.frameWidth || ''}
                onChange={e =>
                  handleMetadataChange(
                    'frameWidth',
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder='e.g., 32'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor={`frame-height-${id}`}>Frame Height (px)</Label>
              <Input
                id={`frame-height-${id}`}
                type='number'
                value={metadata?.frameConfig.frameHeight || ''}
                onChange={e =>
                  handleMetadataChange(
                    'frameHeight',
                    Number.parseInt(e.target.value) || 0
                  )
                }
                placeholder='e.g., 32'
              />
            </div>
            {/* <div className='grid gap-2'>
              <Label htmlFor={`animation-speed-${id}`}>
                Animation Speed (FPS)
              </Label>
              <Input
                id={`animation-speed-${id}`}
                type='number'
                value={metadata?.frameConfig. || ''}
                onChange={e =>
                  handleMetadataChange(
                    'animationSpeed',
                    Number.parseFloat(e.target.value) || 0
                  )
                }
                placeholder='e.g., 12'
              />
            </div> */}
          </>
        )
      case 'audio':
        return (
          <>
            {/* <div className='flex items-center space-x-2'>
              <Checkbox
                id={`loop-${id}`}
                checked={metadata. || false}
                onCheckedChange={checked =>
                  handleMetadataChange('loop', checked)
                }
              />
              <Label htmlFor={`loop-${id}`}>Loop Audio</Label>
            </div> */}
            <div className='grid gap-2'>
              <Label htmlFor={`tags-${id}`}>Tags (comma-separated)</Label>
              <Input
                id={`tags-${id}`}
                value={metadata?.url || ''}
                onChange={e => handleMetadataChange('tags', e.target.value)}
                placeholder='e.g., music, background'
              />
            </div>
          </>
        )

      case 'image':
      default:
        return (
          <>
            <div className='grid gap-2'>
              <Label htmlFor={`asset-name-${id}`}>Asset Name</Label>
              <Input
                id={`asset-name-${id}`}
                value={name || ''}
                onChange={e => onUpdate({ name: e.target.value })}
                placeholder='e.g., Forest Tileset'
              />
            </div>
            <div className='grid gap-2 col-span-2'>
              <Label htmlFor={`description-${id}`}>Description</Label>
              <Input
                id={`description-${id}`}
                value={description || ''}
                onChange={e => onUpdate({ description: e.target.value })}
                placeholder='Optional description'
              />
            </div>
          </>
        )
    }
  }, [id, type, metadata, handleMetadataChange])

  const getStatusIcon = (currentStatus: UploadStatus) => {
    switch (currentStatus) {
      case 'pending':
        return <PlayCircle className='w-4 h-4 text-muted-foreground' />
      case 'uploading':
        return <Loader2 className='w-4 h-4 animate-spin text-blue-500' />
      case 'uploaded':
        return <CheckCircle className='w-4 h-4 text-green-500' />
      case 'failed':
        return <AlertCircle className='w-4 h-4 text-red-500' />
      default:
        return null
    }
  }

  const getStatusBadgeVariant = (currentStatus: UploadStatus) => {
    switch (currentStatus) {
      case 'pending':
        return 'outline'
      case 'uploading':
        return 'default'
      case 'uploaded':
        return 'success'
      case 'failed':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <Card className='flex flex-col md:flex-row items-start p-4 gap-4 shadow-sm hover:shadow-md transition-shadow'>
      <div className='w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted'>
        {renderPreview}
      </div>
      <div className='flex-grow grid gap-2 w-full'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-base truncate'>{name}</h3>
          <Button
            variant='ghost'
            size='icon'
            onClick={onRemove}
            className='flex-shrink-0'
          >
            <X className='w-4 h-4' />
            <span className='sr-only'>Remove file</span>
          </Button>
        </div>
        <p className='text-sm text-muted-foreground'>{formatBytes(size)}</p>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2'>
          <div className='grid gap-2'>
            <Label htmlFor={`file-type-${id}`}>Asset Type</Label>
            <Select value={type || ''} onValueChange={handleTypeChange}>
              <SelectTrigger id={`file-type-${id}`}>
                <SelectValue placeholder='Select type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='tileset'>Tileset</SelectItem>
                <SelectItem value='sprite'>Sprite</SelectItem>
                <SelectItem value='avatar'>Avatar</SelectItem>
                <SelectItem value='background'>Background</SelectItem>
                <SelectItem value='sound'>Sound</SelectItem>
                <SelectItem value='other'>Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4'>
            {renderMetadataForm}
          </div>
        </div>

        <CardFooter className='flex flex-col md:flex-row items-center justify-between p-0 pt-4 gap-3'>
          <div className='flex items-center gap-2 w-full md:w-auto'>
            {getStatusIcon(uploadStatus)}
            <Badge
              variant={getStatusBadgeVariant(uploadStatus)}
              className='capitalize'
            >
              {uploadStatus}
            </Badge>

            {/* {uploadStatus === 'failed' && (
              <span className='text-sm text-red-500 truncate max-w-[200px]'>
                {error}
              </span>
            )} */}
          </div>
          <div className='flex gap-2 w-full md:w-auto justify-end'>
            {uploadStatus === 'failed' && (
              <Button variant='outline' onClick={onUpload}>
                Retry
              </Button>
            )}
            {/* {(uploadStatus === 'pending' || uploadStatus === 'failed') && (
              <Button
                onClick={onUpload}
                disabled={
                  !type ||
                  (type === 'sprite' &&
                    (!metadata.frameWidth || !metadata.animationSpeed)) ||
                  (type === 'sound' && !metadata.tags)
                }
              >
                <Upload className='w-4 h-4 mr-2' /> Upload
              </Button>
            )} */}
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
