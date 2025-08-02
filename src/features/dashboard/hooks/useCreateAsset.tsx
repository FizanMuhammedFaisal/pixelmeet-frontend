import { useMutation } from '@tanstack/react-query'

import { uploadService } from '../services'

import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from '../../../shared/types'
import type {
  CreateAssetRequestPayload,
  UploadFile
} from '../types/upload/types'

export const useCreateAsset = () => {
  return useMutation<
    AxiosResponse<Omit<UploadFile, 'error' | 'previewUrl'>>,
    AxiosError<ErrorResponse>,
    CreateAssetRequestPayload
  >({
    mutationFn: uploadService.createAsset
  })
}
