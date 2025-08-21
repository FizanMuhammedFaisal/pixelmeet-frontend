import { type RouteObject } from 'react-router-dom'
import AdminWrapper from '../guards/AdminGuard'
import AdminLogin from '@/pages/admin/Login'
import DashboardLayout from '@/shared/layout/Dashboard/Dashboard'
import AdminHome from '@/pages/admin/Home'
import AdminAssetsPage from '@/pages/admin/assets/Assets'
import AdminUsersPage from '@/pages/admin/User'
import AdminAvatarPage from '@/pages/admin/Avatar'
import AdminMapsPage from '@/pages/admin/maps/Maps'
import AdminSettingsPage from '@/pages/admin/Settings'
import AdminMapEditor from '@/pages/admin/MapEditor'
import EditAssetPage from '@/features/dashboard/sections/DashboardAssets/components/allAssets/editAssets/EditAsset'
import { AdminDeletedAssetsPage } from '@/pages/admin/assets/DeletedAssets'
import NewTagPage from '@/pages/admin/assets/NewTag'
import EditTagPage from '@/pages/admin/assets/EditTag'
import { AdminCreateMapPage } from '@/pages/admin/maps/CreateMap'

const AdminRouter: RouteObject[] = [
   {
      element: <AdminWrapper />,
      children: [
         {
            path: '/adminlogin',
            element: <AdminLogin />,
         },
         {
            element: <DashboardLayout />,
            children: [
               {
                  path: '/dashboard',
                  element: <AdminHome />,
               },
               {
                  path: '/dashboard/assets',
                  element: <AdminAssetsPage />,
               },
               {
                  path: '/dashboard/assets/deleted',
                  element: <AdminDeletedAssetsPage />,
               },
               {
                  path: '/dashboard/assets/edit-asset/:id',
                  element: <EditAssetPage />,
               },
               {
                  path: '/dashboard/assets/new-tag',
                  element: <NewTagPage />,
               },
               {
                  path: '/dashboard/assets/edit-tag/:id',
                  element: <EditTagPage />,
               },
               {
                  path: '/dashboard/users',
                  element: <AdminUsersPage />,
               },
               {
                  path: '/dashboard/avatars',
                  element: <AdminAvatarPage />,
               },
               {
                  path: '/dashboard/maps',
                  children: [
                     {
                        path: '',
                        element: <AdminMapsPage />,
                     },
                     {
                        path: 'create',
                        element: <AdminCreateMapPage />,
                     },
                  ],
               },
               {
                  path: '/dashboard/settings',
                  element: <AdminSettingsPage />,
               },
            ],
         },
         {
            path: '/dashboard/map-editor/:mapId?',
            element: <AdminMapEditor />,
         },
      ],
   },
]

export default AdminRouter
