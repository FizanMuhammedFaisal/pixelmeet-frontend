import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { DragAndDropArea } from './AssetUploadZone'
import { FileUploadCard } from './FileUploadCard'
import { type UploadFile } from '../../../../types/upload/types'
import { useGetPresignedURL } from '../../../../hooks/useGetPresignedURL'
import { useUploadAsset } from '../../../../hooks/useUploadAsset'
import { useCreateAsset } from '../../../../hooks'
import { hasValidMetadata } from '../../../../types'
import { GlobalMutationError } from '../../../../../../shared/lib/utils'
import type { AxiosError } from 'axios'
import type { ErrorResponse } from '../../../../../../shared/types'
import { useUploadTabStore } from '../../../../../../app/store/admin/uploadTab.store'

export default function UploadTab() {
  const getPresignedURLMutation = useGetPresignedURL()
  const uploadAssetMutation = useUploadAsset()
  const createAssetMutation = useCreateAsset()

  const { files, addFile, updateFile, removeFile, clearAllFiles, getFile } =
    useUploadTabStore()

  const [isUploadingAll, setIsUploadingAll] = useState(false)

  const handleFilesAdded = useCallback(
    (newFiles: File[]) => {
      newFiles.forEach(file => {
        addFile(file)
      })
    },
    [addFile]
  )

  function updateURLKey(file: UploadFile, urlKey: string) {
    console.log(urlKey)
    switch (file.type) {
      case 'audio':
        updateFile(file.id, { type: 'audio', metadata: { urlKey: [urlKey] } })
        break
      case 'image':
        updateFile(file.id, { type: 'image', metadata: { urlKey } })
        break

      case 'spritesheet':
        updateFile(file.id, { type: 'spritesheet', metadata: { urlKey } })
        break
      case 'tilemapTiledJSON':
        updateFile(file.id, { type: 'tilemapTiledJSON', metadata: { urlKey } })
        break
      default:
        break
    }
  }
  const handleUpload = useCallback(
    async (fileToUpload: UploadFile) => {
      if (
        fileToUpload.uploadStatus === 'uploading' ||
        fileToUpload.uploadStatus === 'uploaded'
      ) {
        return //prevent reuplaoding
      }

      updateFile(fileToUpload.id, {
        uploadStatus: 'uploading',
        error: undefined
      })

      try {
        const res = await getPresignedURLMutation.mutateAsync({
          fileName: fileToUpload.name,
          type: fileToUpload.type
        })
        if (!res.data) {
          return toast.error(
            `Upload for ${fileToUpload.name} failed, Try again`
          )
        }
        console.log(res.data)
        updateURLKey(fileToUpload, res.data.assetKey)

        const assetRes = await uploadAssetMutation.mutateAsync({
          contentType: res.data.mimeType,
          file: fileToUpload.file,
          url: res.data.url
        })
        console.log(assetRes)
        if (assetRes.status !== 200) {
          return toast.error(
            `Upload for ${fileToUpload.name} failed, Try again`
          )
        }
        const updatedFile = getFile(fileToUpload.id)
        console.log(updatedFile)
        console.log('updateFile')
        if (hasValidMetadata(fileToUpload) && updatedFile) {
          createAssetMutation.mutate(
            {
              name: updatedFile.name,
              type: updatedFile.type,
              metadata: updatedFile.metadata,
              size: updatedFile.size
            },
            {
              onSuccess: () => {
                toast.success(`Asset ${fileToUpload.name} uploaded `)
                removeFile(fileToUpload.id)
              },
              onError: error => {
                GlobalMutationError(error)
                const axiosError = error as AxiosError<ErrorResponse>
                const firstDetail =
                  axiosError.response?.data?.issues?.[0]?.message
                const fallback =
                  axiosError.response?.data?.message || 'Try Again'
                toast.error(
                  `Asset ${fileToUpload.name} upload failed, ${
                    firstDetail || fallback
                  }`
                )
              }
            }
          )
        } else {
          toast.error(
            `Asset ${fileToUpload.name} upload failed due to validation error `
          )
        }
      } catch (error: any) {
        updateFile(fileToUpload.id, {
          uploadStatus: 'failed',
          error: error.message || 'Upload failed'
        })

        GlobalMutationError(error)
        const axiosError = error as AxiosError<ErrorResponse>
        const firstDetail = axiosError.response?.data?.issues?.[0]?.message
        const fallback = axiosError.response?.data?.message || 'Try Again'
        toast.error(
          `Asset ${fileToUpload.name} upload failed, ${firstDetail || fallback}`
        )
      }
    },
    [updateFile]
  )

  const handleUploadAll = useCallback(async () => {
    setIsUploadingAll(true)
    for (const file of files) {
      // Only upload pending or failed files
      if (file.uploadStatus === 'pending' || file.uploadStatus === 'failed') {
        await handleUpload(file)
      }
    }
    setIsUploadingAll(false)
  }, [files, handleUpload])

  const canUploadAll = useMemo(() => {
    return (
      files.length > 0 &&
      files.every((file: UploadFile) => {
        // Basic validation: check if type is selected and metadata is not empty for required fields
        if (!file.type) return false
        // if (
        //   file.type === 'aseprite' &&
        //   (!file.metadata.textureURL || !file.metadata.textureURL)
        // )
        //   return false
        if (file.type === 'audio' && !file?.metadata?.url) return false
        return file.uploadStatus === 'pending' || file.uploadStatus === 'failed'
      })
    )
  }, [files])

  return (
    <div className='container mx-auto p-4 max-w-4xl'>
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Upload Game Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <DragAndDropArea onFilesAdded={handleFilesAdded} />
          <div className='mt-6 flex justify-end gap-2'>
            <Button
              onClick={handleUploadAll}
              disabled={!canUploadAll || isUploadingAll}
            >
              {isUploadingAll ? 'Uploading All...' : 'Upload All'}
            </Button>
            <Button
              variant='outline'
              onClick={clearAllFiles}
              disabled={files.length === 0 || isUploadingAll}
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className='space-y-4 max-h-[60vh] overflow-y-auto pr-2'>
        <AnimatePresence initial={false}>
          {files.map(file => (
            <motion.div
              key={file.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <FileUploadCard
                file={file}
                onRemove={() => removeFile(file.id)}
                onUpload={() => handleUpload(file)}
                updateFile={updateFile}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {files.length === 0 && (
          <p className='text-center text-muted-foreground py-8'>
            No files added yet. Drag and drop or click to add files.
          </p>
        )}
      </div>
    </div>
  )
}
