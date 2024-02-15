import UserSideNav from '@/components/UserSideNav'
import { Outlet } from 'react-router-dom'

export default function AccountLayout() {
  return (    
    <div className='items-center justify-center flex-1 w-full'>
      <div className='flex flex-row w-8/12 pt-16 mx-auto gap-x-6'>
        <UserSideNav />
        <Outlet/>
      </div>
    </div>
  )
}
