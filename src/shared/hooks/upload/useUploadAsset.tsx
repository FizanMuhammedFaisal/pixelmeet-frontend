import { useMutation } from '@tanstack/react-query'

import type { AxiosError, AxiosResponse } from 'axios'

import type {
   UploadToAssetStorePaylod,
   UploadToAssetStoreResponse,
} from '../../schema/upload/upload.schema'
import { uploadService } from '../../services/upload'
import type { ErrorResponse } from '@/shared/types'

export const useUploadAsset = () => {
   return useMutation<AxiosResponse, AxiosError<ErrorResponse>, UploadToAssetStorePaylod>({
      mutationFn: uploadService.uploadToAssetStore,
   })
}
