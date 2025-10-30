import type { UploadFile } from './types'

export function hasValidMetadata(
   file: UploadFile,
): file is UploadFile & { metadata: NonNullable<UploadFile['metadata']> } {
   return file.metadata != null
}

export function isImageFile(file: UploadFile): file is Extract<UploadFile, { type: 'image' }> {
   return file.type === 'image'
}
