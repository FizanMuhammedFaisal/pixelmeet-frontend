import React from 'react'
import { QueryProvider } from './QueryProvider'

import { GoogleProvider } from './GoogleAuthProvider'
import { ThemeProvider } from './ThemeProvider'

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <>
      <QueryProvider>
        <ThemeProvider>
          <GoogleProvider>{children}</GoogleProvider>
        </ThemeProvider>
      </QueryProvider>
    </>
  )
}
