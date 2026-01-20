import { useQuery } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { GetCategoryResponse } from '../../schema/asset/categoryTab.schema'
import type { ErrorResponse } from 'react-router'
import { categoryServices } from '../../services/category'

export const useGetCategory = (id: string) => {
   return useQuery<AxiosResponse<GetCategoryResponse>, AxiosError<ErrorResponse>>({
      queryKey: ['category', id],
      queryFn: () => categoryServices.getCategory({ id }),
      enabled: !!id,
   })
}
