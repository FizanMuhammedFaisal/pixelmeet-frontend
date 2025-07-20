import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './pages/user/Login'
import HomePage from './pages/user/Home'
import AdminHome from './pages/admin/Home'
import AppLayout from './components/layout/route/AppLayout'
import GuestWrapper from './components/wrappers/Guest'
import AdminWrapper from './components/wrappers/Admin'
import AuthWrapper from './components/wrappers/Auth'
import SignUpPage from './pages/user/Signup'
import AdminDashboard from './pages/admin/Dashboard'
import UserLayout from './components/layout/route/UserLayout'
import AdminLogin from './pages/admin/Login'
import AdminLayout from './components/layout/route/AdminLayout'
import DashboardLayout from './components/layout/Dashboard/Dashboard'
import AdminAssets from './pages/admin/Assets'
import AdminUsersPage from './pages/admin/User'
import AdminAssetsPage from './pages/admin/Assets'
import AdminSpacesPage from './pages/admin/Spaces'
import AdminAvatarPage from './pages/admin/Avatar'
import AdminSettings from './pages/admin/Settings'
import AdminSettingsPage from './pages/admin/Settings'
import AdminMapEditor from './pages/admin/MapEditor'
function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: (
            <UserLayout>
              <HomePage />
            </UserLayout>
          )
        },
        {
          element: <GuestWrapper />,
          children: [
            {
              path: '/login',
              element: <LoginPage />
            },
            {
              path: '/signup',
              element: <SignUpPage />
            }
          ]
        },
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
        },
        {
          element: <AuthWrapper />,
          children: [
            {
              path: '/authpage',
              element: <AdminHome />
            }
          ]
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
