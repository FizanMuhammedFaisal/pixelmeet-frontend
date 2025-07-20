import { ThemeContext } from '@/context/ThemeContext'
import { useContext } from 'react'

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider')
  return ctx
}
