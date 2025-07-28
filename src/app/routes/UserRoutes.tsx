import HomePage from '@/pages/user/Home'
import AppLayout from '@/shared/layout/route/AppLayout'
import UserLayout from '@/shared/layout/route/UserLayout'
import { type RouteObject } from 'react-router-dom'
import GuestWrapper from '../guards/GuestGuard'
import LoginPage from '@/pages/user/Login'
import SignUpPage from '@/pages/user/Signup'
import ForgotPasswordPage from '@/pages/user/ForgotPassword'
import AuthWrapper from '../guards/AuthGuard'
import SpacesPage from '@/pages/user/Spaces'

const UserRouter: RouteObject[] = [
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
          },
          {
            path: '/forgot-password',
            element: <ForgotPasswordPage />
          }
        ]
      },

      {
        element: <AuthWrapper />,
        children: [
          {
            path: '/spaces',
            element: <SpacesPage />
          }
        ]
      }
    ]
  }
]

export default UserRouter
