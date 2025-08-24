import { useMutation } from '@tanstack/react-query'

import type { AxiosError, AxiosResponse } from 'axios'

import type { ErrorResponse } from 'react-router'
import { uploadService } from '../../services/upload'
import type { CreateAssetRequestPayload, CreateAssetRequestResponse } from '../../types'

export const useCreateAsset = () => {
   return useMutation<
      AxiosResponse<CreateAssetRequestResponse>,
      AxiosError<ErrorResponse>,
      CreateAssetRequestPayload
   >({
      mutationFn: uploadService.createAsset,
   })
}
