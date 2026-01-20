import { useMutation } from '@tanstack/react-query'

import type { AxiosError, AxiosResponse } from 'axios'
import { uploadService } from '../../services/upload'
import type {
   CreateAssetRequestPayload,
   CreateAssetRequestResponse,
   ErrorResponse,
} from '../../types'

export const useCreateAsset = () => {
   return useMutation<
      AxiosResponse<CreateAssetRequestResponse>,
      AxiosError<ErrorResponse>,
      CreateAssetRequestPayload
   >({
      mutationFn: uploadService.createAsset,
   })
}
