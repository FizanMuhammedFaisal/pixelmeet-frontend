import React from 'react'
import { QueryProvider } from './QueryProvider'

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>
}
