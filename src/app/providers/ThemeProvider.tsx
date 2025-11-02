import AppThemeProvider from '@/shared/context/ThemeContext'
import React from 'react'
type ThemeProviderProps = {
   children: React.ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
   return <AppThemeProvider>{children}</AppThemeProvider>
}
