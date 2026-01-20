import { useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { CategoryResponse, GetCategoriesPayload } from '../../schema/asset/categoryTab.schema'
import type { ErrorResponse } from '@/shared/types'
import { categoryServices } from '../../services/category'

export const usePaginatedCategories = (page: number, limit: number, query?: string) => {
   return useQuery<AxiosResponse<CategoryResponse>, AxiosError<ErrorResponse>>({
      queryKey: ['categories', page, limit, query],
      queryFn: () => categoryServices.getCategories({ page, limit, query } as GetCategoriesPayload),
   })
}
