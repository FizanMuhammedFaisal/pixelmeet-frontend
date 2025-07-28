import { createContext, useEffect, useState } from 'react'
type Theme = 'light' | 'dark'
type Role = 'admin' | 'user'

interface ThemeContextType {
  theme: Theme
  role: Role
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  setRole: (role: Role) => void
}
export const ThemeContext = createContext<ThemeContextType | null>(null)

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light'
  })
  const [role, setRoleState] = useState<Role>(() => {
    return (localStorage.getItem('role') as Role) || 'user'
  })
  const setRole = (newRole: Role) => {
    localStorage.setItem('role', newRole)
    setRoleState(newRole)
  }
  const setTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme)
    setThemeState(theme)
  }
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', next)
    setThemeState(next)
  }
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark', 'user', 'admin')
    root.classList.add(theme, role)
  }, [theme, role])
  return (
    <ThemeContext.Provider
      value={{ theme, role, setRole, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
