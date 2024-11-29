
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Login } from './Components/Login'
import { Signup } from './Components/Signup'
import { MainLayout } from './Layout/MainLayout'
import { Home } from './Components/Home'
import {Admin} from './Components/Admin'
import ProtectedRoutes from './Components/ProtectedRoutes'
import { Moderator } from './Components/Moderator'

function App() {

  const browserRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoutes allowedRoles={["Admin"]}>
          <Admin />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/moderator",
      element: (
        <ProtectedRoutes allowedRoles={["Moderator"]}>
          <Moderator />
        </ProtectedRoutes>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/home" />,
    },
  ])

  return (
    <>
      <RouterProvider router={browserRouter}></RouterProvider>
    </>
  )
}

export default App
