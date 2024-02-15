import NavBar from '@/components/NavBar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='items-center justify-center flex-1 w-full'>
      <NavBar />
      <div className='w-8/12 pt-16 mx-auto'>
        <Outlet/>
      </div>
    </div>
  )
}
