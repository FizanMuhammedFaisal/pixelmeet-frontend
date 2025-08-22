import { useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import { mapServices } from '@/shared/services'
import type { GetMapsPayload, GetMapsResponse } from '@/shared/types'
import type { ErrorResponse } from '@/shared/types'

export const useGetMaps = (data: GetMapsPayload) => {
   return useQuery<AxiosResponse<GetMapsResponse>, AxiosError<ErrorResponse>>({
      queryKey: ['Maps', data.limit, data.page],
      queryFn: () => mapServices.getMaps(data),
   })
}
