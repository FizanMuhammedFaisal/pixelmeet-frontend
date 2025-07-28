import { type RouteObject } from 'react-router-dom'
import AdminWrapper from '../guards/AdminGuard'
import AdminLogin from '@/pages/admin/Login'
import DashboardLayout from '@/shared/layout/Dashboard/Dashboard'
import AdminHome from '@/pages/admin/Home'
import AdminAssetsPage from '@/pages/admin/Assets'
import AdminUsersPage from '@/pages/admin/User'
import AdminAvatarPage from '@/pages/admin/Avatar'
import AdminSpacesPage from '@/pages/admin/Spaces'
import AdminSettingsPage from '@/pages/admin/Settings'
import AdminMapEditor from '@/pages/admin/MapEditor'

const AdminRouter: RouteObject[] = [
  {
    element: <AdminWrapper />,
    children: [
      {
        path: '/adminlogin',
        element: <AdminLogin />
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: <AdminHome />
          },
          {
            path: '/dashboard/assets',
            element: <AdminAssetsPage />
          },
          {
            path: '/dashboard/users',
            element: <AdminUsersPage />
          },
          {
            path: '/dashboard/avatars',
            element: <AdminAvatarPage />
          },
          {
            path: '/dashboard/spaces',
            element: <AdminSpacesPage />
          },
          {
            path: '/dashboard/settings',
            element: <AdminSettingsPage />
          },
          {
            path: '/dashboard/map-editor',
            element: <AdminMapEditor />
          }
        ]
      }
    ]
  }
]

export default AdminRouter
