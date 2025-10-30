import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

import type { UpdateMapPayload, UpdateMapResponse } from '@/shared/types'
import { mapServices } from '@/shared/services'
import type { ErrorResponse } from '@/shared/types'

export const useUpdateMap = () => {
   return useMutation<
      AxiosResponse<UpdateMapResponse>,
      AxiosError<ErrorResponse>,
      UpdateMapPayload
   >({
      mutationFn: mapServices.updateMap,
   })
}
