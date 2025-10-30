import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminRouter from './app/routes/AdminRoutes'
import UserRouter from './app/routes/UserRoutes'
import AppLayout from './shared/layout/route/AppLayout'
function App() {
   const router = createBrowserRouter([
      {
         element: <AppLayout />,
         children: [...AdminRouter, ...UserRouter],
      },
   ])

   return <RouterProvider router={router} />
}

export default App
