import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

import type { CreateMapPayload, CreateMapResponse } from '@/shared/types'
import { mapServices } from '@/shared/services'
import type { ErrorResponse } from '@/shared/types'

export const useCreateMap = () => {
   return useMutation<
      AxiosResponse<CreateMapResponse>,
      AxiosError<ErrorResponse>,
      CreateMapPayload
   >({
      mutationFn: mapServices.createMap,
   })
}
