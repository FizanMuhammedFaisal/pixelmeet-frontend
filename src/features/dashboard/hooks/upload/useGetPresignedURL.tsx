import { useMutation } from '@tanstack/react-query'
import type { PresignedURLApiResponse } from '../../types'
import type { ErrorResponse } from 'react-router'
import type { AxiosError } from 'axios'
import type { GetPresingedURLPayload } from '../../schema/asset/uploadTab.schema'
import { uploadService } from '../../services'
export const useGetPresignedURL = () => {
  return useMutation<
    PresignedURLApiResponse,
    AxiosError<ErrorResponse>,
    GetPresingedURLPayload
  >({
    mutationFn: uploadService.getPresingedUrl
  })
}
