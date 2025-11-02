import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'
import { queryClient } from '../../api/config/queryClient'
import { useOfflineStatus } from '../../shared/hooks/useOfflineStatus'

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
