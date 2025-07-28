import useAuthStore from '@/app/store/auth.store'
import { Navigate, Outlet } from 'react-router'
import AdminLayout from '../../shared/layout/route/AdminLayout'

export default function AdminWrapper() {
  // const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  // const user = useAuthStore(state => state.user)
  // const isInitialized = useAuthStore(state => state.isInitialized)

  // if (!isInitialized) return <div>Loading</div>
  // if (!isAuthenticated) return <Navigate to={'/login'} />
  // if (!user) return <Navigate to={'/login'} />
  // if (user && user.role !== 'admin') return <Navigate to={'/login'} />
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
