import NavBar from '../components/NavBar'
import { Outlet } from '@tanstack/react-router'

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}
