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
import AdminMapEditor from '@/pages/admin/MapEditor'
import TestingPage from '@/pages/user/Testing'

const UserRouter: RouteObject[] = [
   {
      element: <UserLayout />,
      children: [
         {
            path: '/',
            element: <HomePage />,
         },
         {
            element: <GuestWrapper />,
            children: [
               {
                  path: '/login',
                  element: <LoginPage />,
               },
               {
                  path: '/signup',
                  element: <SignUpPage />,
               },
               {
                  path: '/forgot-password',
                  element: <ForgotPasswordPage />,
               },
            ],
         },

         {
            element: <AuthWrapper />,
            children: [
               {
                  path: '/spaces',
                  element: <SpacesPage />,
               },
               {
                  path: '/map-editor',
                  element: <AdminMapEditor />,
               },
               {
                  path: '/testing',
                  element: <TestingPage />,
               },
            ],
         },
      ],
   },
]

export default UserRouter
