import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type {
   UpdateCategoryPayload,
   UpdateCategoryResponse,
} from '../../schema/asset/categoryTab.schema'
import type { ErrorResponse } from 'react-router'
import { categoryServices } from '../../services/category'

export const useUpdateCategory = () => {
   return useMutation<
      AxiosResponse<UpdateCategoryResponse>,
      AxiosError<ErrorResponse>,
      UpdateCategoryPayload
   >({
      mutationFn: categoryServices.updateCategory,
   })
}
