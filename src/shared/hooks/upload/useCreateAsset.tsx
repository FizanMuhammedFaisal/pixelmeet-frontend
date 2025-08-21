import { useMutation } from '@tanstack/react-query'

import type { AxiosError, AxiosResponse } from 'axios'

import type { ErrorResponse } from 'react-router'
import { uploadService } from '../../services/upload'
import type { CreateAssetRequestPayload } from '../../types'
import type { UploadFile } from '@/features/dashboard/sections/DashboardAssets/types'

export const useCreateAsset = () => {
   return useMutation<
      AxiosResponse<Omit<UploadFile, 'error' | 'previewUrl'>>,
      AxiosError<ErrorResponse>,
      CreateAssetRequestPayload
   >({
      mutationFn: uploadService.createAsset,
   })
}
