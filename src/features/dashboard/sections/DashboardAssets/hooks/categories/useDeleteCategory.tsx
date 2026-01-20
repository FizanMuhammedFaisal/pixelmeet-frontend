import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type {
   DeleteCategoryPayload,
   DeleteCategoryResponse,
} from '../../schema/asset/categoryTab.schema'
import type { ErrorResponse } from 'react-router'
import { categoryServices } from '../../services/category'

export const useDeleteCategory = () => {
   return useMutation<
      AxiosResponse<DeleteCategoryResponse>,
      AxiosError<ErrorResponse>,
      DeleteCategoryPayload
   >({
      mutationFn: categoryServices.deleteCategory,
   })
}
