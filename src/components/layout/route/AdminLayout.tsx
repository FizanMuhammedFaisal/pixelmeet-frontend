import { useAppTheme } from '@/hooks/useAppTheme'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { setRole } = useAppTheme()
  useEffect(() => {
    setRole('admin')
  }, [setRole])
  return <>{children}</>
}
