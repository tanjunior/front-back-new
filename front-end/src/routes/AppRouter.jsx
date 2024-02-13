import {createBrowserRouter, RouterProvider, Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Landing from '../pages/Landing'
import NavBar from '../components/NavBar'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import AboutPage from '../pages/AboutPage'
import AdminProductList from '../components/productTable/AdminProductList'
import AdminProductAdd from '../components/AdminProductAdd'
import ProductPage from '../pages/ProductPage'
import AdminLayout from '@/layout/AdminLayout'
import AdminDashboard from '@/components/AdminDashboard'


const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <NavBar />
      <Outlet />
    </>,
    children: [
      { index: true, element: <Landing /> },
      { path: 'home', element: <HomePage /> },
      { path: 'login', element: <LoginPage />},
      { path: 'register', element: <RegisterPage />},
      { path: 'about', element: <AboutPage />},
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
      { path: 'login', element: <Navigate to='/' />},
      { path: 'register', element: <Navigate to='/' />},
      { path: 'about', element: <AboutPage />},
      { path: 'product/:id', element: <ProductPage />},
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'login', element: <Navigate to='/' />},
      {
        children: [
          { path: "products", element: <AdminProductList /> },
          { path: "products/add", element: <AdminProductAdd /> }
        ]
      },
    ]
  }
])


export default function AppRouter() {
  const {user} = useAuth()

  const finalRouter = !user?.id ? guestRouter : user.userType === 'ADMIN' ? adminRouter : userRouter

  
  return (
    <RouterProvider router={finalRouter} />
  )
}
