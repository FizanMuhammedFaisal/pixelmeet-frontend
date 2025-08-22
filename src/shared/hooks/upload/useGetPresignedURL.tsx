import { useMutation } from '@tanstack/react-query'
import type { PresignedURLApiResponse } from '../../types'
import type { ErrorResponse } from 'react-router'
import type { AxiosError, AxiosResponse } from 'axios'
import type { GetPresingedURLPayload } from '../../schema/upload/upload.schema'
import { uploadService } from '../../services/upload'
export const useGetPresignedURL = () => {
   return useMutation<
      AxiosResponse<PresignedURLApiResponse>,
      AxiosError<ErrorResponse>,
      GetPresingedURLPayload
   >({
      mutationFn: uploadService.getPresingedUrl,
   })
}
