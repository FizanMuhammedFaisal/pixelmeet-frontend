import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { GlobalMutationError } from '../../shared/lib/utils'
import type { AxiosError } from 'axios'
import { useOfflineStatus } from '../../shared/hooks/useOfflineStatus'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: failureCount => {
        if (!navigator.onLine) return false

        return failureCount < 3
      },
      retryDelay(failureCount) {
        return Math.min(1000 * 2 ** failureCount, 10000)
      }
    },
    mutations: {
      retry: failureCount => {
        if (!navigator.onLine) return false
        return failureCount < 3
      },
      retryDelay(failureCount) {
        return Math.min(1000 * 2 ** failureCount, 10000)
      },
      onError(error) {
        const err = error as AxiosError
        GlobalMutationError(err)
      }
    }
  }
})
// utils/errorHandlers.js

interface QueryProviderProps {
  children: React.ReactNode
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  useOfflineStatus()
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors={true} />

      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  )
}
