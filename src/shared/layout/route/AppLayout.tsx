import { useAuthInit } from '@/shared/hooks/useAuthInit'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  useAuthInit()
  return (
    <>
      <main className='flex min-h-screen flex-col'>
        <Outlet />
      </main>
    </>
  )
}
