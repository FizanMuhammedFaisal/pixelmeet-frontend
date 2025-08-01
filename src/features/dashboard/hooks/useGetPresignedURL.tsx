import { useMutation } from '@tanstack/react-query'

import { uploadService } from '../services'
import type { PresignedURLApiResponse } from '../types/responseTypes'
import type { GetPresingedURLPayload } from '../schema/uploadTab.schema'
import type { AxiosError } from 'axios'
import type { ErrorResponse } from '../../../shared/types'

export const useGetPresignedURL = () => {
  return useMutation<
    PresignedURLApiResponse,
    AxiosError<ErrorResponse>,
    GetPresingedURLPayload
  >({
    mutationFn: uploadService.getPresingedUrl
  })
}
