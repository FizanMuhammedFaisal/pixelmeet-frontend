import { useCallback } from 'react'
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
import type { UpdateFileInput } from '../../../../../../app/store/uploadTab.store'
import { Spinner } from '../../../../../../components/ui/spinner'
import { formatBytes } from '../../../../../../shared/lib/helper'
import { renderPreview } from './preview'
import { renderMetadataForm } from './MetadataForm'
import { getStatusBadgeVariant, getStatusIcon } from './Statusbadge'

interface FileUploadCardProps<T extends UploadFile> {
  file: T
  onRemove: () => void
  onUpload: () => void
  updateFile: (id: string, updates: UpdateFileInput) => void
}

export function FileUploadCard<T extends UploadFile>({
  file,
  onRemove,
  onUpload,
  updateFile
}: FileUploadCardProps<T>) {
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

  const handleTypeChange = useCallback(
    (newType: AssetType) => {
      updateFile(id, { type: newType })
    },
    [updateFile]
  )

  return (
    <Card className='flex flex-col md:flex-row items-start p-4 gap-4 shadow-sm hover:shadow-md transition-shadow'>
      <div className='w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted'>
        {renderPreview({ type, previewUrl })}
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
                <SelectItem value='json'>TilesetJson</SelectItem>
                <SelectItem value='spritesheet'>Sprite Sheet</SelectItem>
                <SelectItem value='background'>Background</SelectItem>
                <SelectItem value='audio'>Audio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4'>
            {renderMetadataForm({ updateFile, file })}
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

            {uploadStatus === 'failed' && error && (
              <span className='text-sm text-red-500 truncate max-w-[200px]'>
                {error.message}
              </span>
            )}
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
                  (type === 'spritesheet' &&
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
