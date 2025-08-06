import { useAppTheme } from '@/shared/hooks/useAppTheme'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

export default function UserLayout() {
  const { setRole } = useAppTheme()
  useEffect(() => {
    setRole('user')
  }, [setRole])
  return (
    <>
      <Outlet />
    </>
  )
}
