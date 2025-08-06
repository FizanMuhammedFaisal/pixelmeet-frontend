import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminRouter from './app/routes/AdminRoutes'
import UserRouter from './app/routes/UserRoutes'
import AppLayout from './shared/layout/route/AppLayout'
function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [...AdminRouter, ...UserRouter]
<<<<<<< HEAD
    }
=======

    },

>>>>>>> 0105f4b (feature(main) lost to last commit had to remake some changes and added a edit asset page which need more work)
  ])

  return <RouterProvider router={router} />
}

export default App
