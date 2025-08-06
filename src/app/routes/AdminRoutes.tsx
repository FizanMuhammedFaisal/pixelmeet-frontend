import { type RouteObject } from 'react-router-dom'
import AdminWrapper from '../guards/AdminGuard'
import AdminLogin from '@/pages/admin/Login'
import DashboardLayout from '@/shared/layout/Dashboard/Dashboard'
import AdminHome from '@/pages/admin/Home'
import AdminAssetsPage from '@/pages/admin/Assets'
import AdminUsersPage from '@/pages/admin/User'
import AdminAvatarPage from '@/pages/admin/Avatar'
import AdminMapsPage from '@/pages/admin/Maps'
import AdminSettingsPage from '@/pages/admin/Settings'
import AdminMapEditor from '@/pages/admin/MapEditor'
import NewTagPage from '../../features/dashboard/components/DashboardAssets/components/tags/newTag/CreateNewTag'
import EditTagPage from '../../features/dashboard/components/DashboardAssets/components/tags/editTag/EditTag'
import EditAssetPage from '../../features/dashboard/components/DashboardAssets/components/allAssets/editAssets/EditAsset'

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
            path: '/dashboard/assets/edit-asset/:id',
            element: <EditAssetPage />
          },
          {
            path: '/dashboard/assets/new-tag',
            element: <NewTagPage />
          },
          {
            path: '/dashboard/assets/edit-tag/:id',
            element: <EditTagPage />
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
            path: '/dashboard/maps',
            element: <AdminMapsPage />
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
