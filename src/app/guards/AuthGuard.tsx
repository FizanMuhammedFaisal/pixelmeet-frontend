import useAuthStore from '@/app/store/auth.store'
import { Navigate, Outlet } from 'react-router'
import UserLayout from '../../shared/layout/route/UserLayout'

export default function AuthWrapper() {
   const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

   if (!isAuthenticated) return <Navigate to={'login'} />

   return (
      <UserLayout>
         <Outlet />
      </UserLayout>
   )
}
