import { useAuthInit } from '@/hooks/useAuthInit'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function AppLayout() {
  useAuthInit()
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  )
}
