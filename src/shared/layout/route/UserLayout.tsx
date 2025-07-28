import { useAppTheme } from '@/shared/hooks/useAppTheme'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

export default function UserLayout({ children }: { children: ReactNode }) {
  const { setRole } = useAppTheme()
  useEffect(() => {
    setRole('user')
  }, [setRole])
  return <>{children}</>
}
