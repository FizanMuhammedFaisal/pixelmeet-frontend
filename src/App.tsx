import { createBrowserRouter, RouterProvider } from 'react-router'
import LoginPage from './pages/user/Login'
import HomePage from './pages/user/home'
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/login',
      element: <LoginPage />
    }
  ])
  return <RouterProvider router={router} />
}

export default App
