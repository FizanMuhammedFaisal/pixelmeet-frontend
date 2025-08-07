import type React from 'react'
import { useCallback, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface DragAndDropAreaProps {
  onFilesAdded: (files: File[]) => void
}

export function DragAndDropArea({ onFilesAdded }: DragAndDropAreaProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy'
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        onFilesAdded(files)
      }
    },
    [onFilesAdded]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      if (files.length > 0) {
        onFilesAdded(files)
      }
    },
    [onFilesAdded]
  )

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors',
        isDragging
          ? 'border-primary bg-primary/5 text-primary'
          : 'border-muted-foreground/20 hover:border-primary/50'
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <UploadCloud className='w-10 h-10 mb-3 text-muted-foreground' />
      <p className='text-sm font-medium'>
        Drag & drop files here, or click to select
      </p>
      <p className='text-xs text-muted-foreground'>
        Supports images, audio, and other game assets.
      </p>
      <input
        id='file-input'
        type='file'
        multiple
        className='hidden'
        onChange={handleFileSelect}
        accept='image/*,audio/*,.json,.xml,.txt'
      />
    </div>
  )
}
