import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminRouter from './app/routes/AdminRoutes'
import UserRouter from './app/routes/UserRoutes'
function App() {
  const router = createBrowserRouter([...AdminRouter, ...UserRouter])

  return <RouterProvider router={router} />
}

export default App
