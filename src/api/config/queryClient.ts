import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import type { ErrorResponse } from '../../shared/types'
import { toast } from 'sonner'
import { GlobalMutationError } from '../../shared/lib/utils'

export const queryClient = new QueryClient({
   queryCache: new QueryCache({
      onError: (error: Error) => {
         const axiosError = error as AxiosError<ErrorResponse>

         const firstDetail = axiosError.response?.data?.issues?.[0]?.message
         const fallback = axiosError.response?.data.message || 'Request failed'
         toast.error(firstDetail || fallback)
      },
   }),
   mutationCache: new MutationCache({
      onError: (error: Error) => {
         const axiosError = error as AxiosError<ErrorResponse>
         const firstDetail = axiosError.response?.data?.issues?.[0]?.message
         const fallback = axiosError.response?.data.message || 'Request failed'
         toast.error(firstDetail || fallback)
      },
   }),
   defaultOptions: {
      queries: {
         staleTime: 1000 * 60 * 5,
         retry: (failureCount) => {
            if (!navigator.onLine) return false

            return failureCount < 3
         },
         retryDelay(failureCount) {
            return Math.min(1000 * 2 ** failureCount, 10000)
         },
      },
      mutations: {
         retry: (failureCount) => {
            if (!navigator.onLine) return false
            return failureCount < 3
         },
         retryDelay(failureCount) {
            return Math.min(1000 * 2 ** failureCount, 10000)
         },
         onError(error) {
            const err = error as AxiosError
            GlobalMutationError(err)
         },
      },
   },
})
