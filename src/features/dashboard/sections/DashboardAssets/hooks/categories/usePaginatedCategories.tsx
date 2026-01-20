import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { CategoryResponse } from '../../schema/asset/categoryTab.schema'
import type { ErrorResponse } from '@/shared/types'
import { categoryServices } from '../../services/category'

export const usePaginatedCategories = (
   page: number,
   limit: number,
   status?: 'active' | 'deleted' | 'all',
) => {
   return useQuery<AxiosResponse<CategoryResponse>, AxiosError<ErrorResponse>>({
      queryKey: ['categories', page, limit, status],
      queryFn: () => categoryServices.getCategories({ page, limit, status }),
      placeholderData: keepPreviousData,
   })
}
