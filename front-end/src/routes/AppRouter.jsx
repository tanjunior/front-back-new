import {createBrowserRouter, RouterProvider, Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Landing from '../pages/Landing'
import NavBar from '../components/NavBar'
import HomePage from '../pages/HomePage'
import AdminDashboard from '../pages/AdminDashboard'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AboutPage from '../pages/AboutPage'


const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <NavBar />
      <Outlet />
    </>,
    children: [
      { index: true, element: <Landing /> },
      { path: '/home', element: <HomePage /> },
      { path: '/login', element: <LoginPage />},
      { path: '/register', element: <RegisterPage />},
      { path: '/about', element: <AboutPage />}
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <NavBar />
      <Outlet />
    </>,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/login', element: <Navigate to='/' />},
      { path: '/about', element: <AboutPage />}
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <NavBar />
      <Outlet />
    </>,
    children: [
      { index: true, element: <AdminDashboard /> },
    ]
  }
])


export default function AppRouter() {
  const {user} = useAuth()
  const finalRouter = user?.id ? user.userType === 'admin' ? adminRouter : userRouter : guestRouter
  return (
    <RouterProvider router={finalRouter} />
  )
}
