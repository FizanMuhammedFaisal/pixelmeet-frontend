import { useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'

import type { ErrorResponse, GetMapPayload, GetMapResponse } from '@/shared/types'
import { mapServices } from '@/shared/services'

export const useGetMap = (data: GetMapPayload) => {
   return useQuery<AxiosResponse<GetMapResponse>, AxiosError<ErrorResponse>>({
      queryKey: ['Maps', data.id, data.populate],
      queryFn: () => mapServices.getMap(data),
      enabled: !!data.id,
   })
}
