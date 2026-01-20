import { useMutation } from '@tanstack/react-query'
import type { AxiosError, AxiosResponse } from 'axios'
import type { ErrorResponse } from '@/shared/types'
import { categoryServices } from '../../services/category'
import type { RestoreCategoryPayload } from '../../schema/asset/categoryTab.schema'

export const useRestoreCategory = () => {
   return useMutation<AxiosResponse<unknown>, AxiosError<ErrorResponse>, RestoreCategoryPayload>({
      mutationFn: categoryServices.restoreCategory,
   })
}
