import useAuthStore from '@/app/store/auth.store'
import { Navigate, Outlet } from 'react-router'
import UserLayout from '../../shared/layout/route/UserLayout'

export default function GuestWrapper() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const isInitialized = useAuthStore(state => state.isInitialized)
  if (!isInitialized) return <div>Loading</div>
  if (isAuthenticated && isInitialized)
    return <Navigate to={'/spaces'} replace={true} />

  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  )
}
