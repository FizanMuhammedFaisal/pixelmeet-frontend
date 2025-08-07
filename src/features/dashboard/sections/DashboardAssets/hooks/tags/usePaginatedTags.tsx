import { useQuery } from '@tanstack/react-query'

import type { AxiosError, AxiosResponse } from 'axios'
import type { TagResponse } from '../../schema/asset/tagTab.schema'
import type { ErrorResponse } from 'react-router'
import { tagServices } from '../../services/tag'

export const usePaginatedTags = (page: number = 1, limit: number = 10) => {
  return useQuery<AxiosResponse<TagResponse>, AxiosError<ErrorResponse>>({
    queryKey: ['tags', page, limit],
    queryFn: () => tagServices.getTags({ page, limit })
  })
}
