import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { X } from 'lucide-react'
import type { UploadFile } from '../../../../types/upload/types'

import { formatBytes } from '../../../../../../shared/lib/helper'

import { MetadataForm } from './MetadataForm'
import { renderPreview } from './Preview'
import type { UpdateFileInput } from '../../../../../../app/store/admin/uploadTab.store'

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
  const { name, size, previewUrl, type, id } = file

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
        <MetadataForm
          file={file}
          onUpload={onUpload}
          updateFile={updateFile}
          key={id}
        />
      </div>
    </Card>
  )
}
