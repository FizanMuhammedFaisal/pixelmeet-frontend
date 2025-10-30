import useAuthStore from '@/app/store/auth.store'
import { Navigate, Outlet } from 'react-router'
import UserLayout from '../../shared/layout/route/UserLayout'
import { Spinner } from '@/components/ui/spinner'

export default function AuthWrapper() {
   const { isAuthenticated, isInitialized } = useAuthStore((state) => state)

   if (!isInitialized) {
      return <Spinner />
   }
   if (!isAuthenticated) return <Navigate to={'login'} />

   return (
      <UserLayout>
         <Outlet />
      </UserLayout>
   )
}
