import { useAuthInit } from '@/shared/hooks/useAuthInit'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
   useAuthInit()
   return (
      <>
         <main className="flex  flex-col">
            <Outlet />
         </main>
      </>
   )
}
