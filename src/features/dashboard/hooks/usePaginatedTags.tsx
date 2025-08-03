import { useQuery } from '@tanstack/react-query'

import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from '../../../shared/types'
import { tagServices } from '../services/tag'
import type { TagResponse } from '../schema/asset/tagTab.schema'

export const usePaginatedTags = (page: number, limit: number) => {
  return useQuery<AxiosResponse<TagResponse>, AxiosError<ErrorResponse>>({
    queryKey: ['tags', page, limit],
    queryFn: () => tagServices.getTags({ page, limit })
  })
}
