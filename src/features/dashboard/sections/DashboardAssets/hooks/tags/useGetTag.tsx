import { useQuery } from '@tanstack/react-query'

import type { AxiosError, AxiosResponse } from 'axios'
import type { GetTagResponse } from '../../schema/asset/tagTab.schema'
import type { ErrorResponse } from 'react-router'
import { tagServices } from '../../services/tag'

export const useGetTag = (id: string) => {
  return useQuery<AxiosResponse<GetTagResponse>, AxiosError<ErrorResponse>>({
    queryKey: ['tag', id],
    queryFn: () => tagServices.getTag({ id })
  })
}
