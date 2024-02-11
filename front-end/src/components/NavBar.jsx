import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function NavBar() {
  const navigate = useNavigate()
  const {user, logout} = useAuth()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='sticky top-0 flex flex-row px-32 py-4 bg-[#F5F5F7] justify-between shadow-xl'>
      <div className='flex items-center justify-center'>
        <img src="/logo.png" alt="" />
        <h1 className='text-lg font-bold text-[#8B8E99]'>devphone</h1>
      </div>
      <div className='flex items-center gap-x-5'>
        <Link className='text-[#8B8E99] font-semibold' to='/home'>Home</Link>
        <Link className='text-[#8B8E99] font-semibold' to='/about'>About</Link>
      </div>
      { user? <Link className='text-[#8B8E99] font-semibold self-center' to='#' onClick={hdlLogout}>Logout</Link>  : (
        <div className='flex items-center gap-x-4'>
          <Link className='text-[#8B8E99] font-semibold' to='/login'>login</Link>
          <span>|</span>
          <Link className='text-[#8B8E99] font-semibold' to='/register'>register</Link>
        </div>
      ) }
      
    </div>
  )
}
