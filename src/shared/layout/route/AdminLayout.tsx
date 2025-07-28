import { useAppTheme } from '@/shared/hooks/useAppTheme'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import CommandMenu from '../Dashboard/CMD'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { setRole } = useAppTheme()
  useEffect(() => {
    setRole('admin')
  }, [setRole])
  return (
    <>
      <CommandMenu />
      {children}
    </>
  )
}
