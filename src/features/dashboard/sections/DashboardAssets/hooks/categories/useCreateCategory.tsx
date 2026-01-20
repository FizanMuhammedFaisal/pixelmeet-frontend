import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type {
   CreateCategoryPayload,
   CreateCategoryResponse,
} from '../../schema/asset/categoryTab.schema'

import { categoryServices } from '../../services/category'
import type { ErrorResponse } from '@/shared/types'

export const useCreateCategory = () => {
   return useMutation<
      AxiosResponse<CreateCategoryResponse>,
      AxiosError<ErrorResponse>,
      CreateCategoryPayload
   >({
      mutationFn: categoryServices.createCategory,
      retry: false,
   })
}
