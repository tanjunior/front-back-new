import {Link, useNavigate} from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import Logo from './Logo'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Icons from './ui/Icons'
import useCart from '@/hooks/useCart'

export default function NavBar() {
  const navigate = useNavigate()
  const {user, logout} = useAuth()
  const { cart } = useCart()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className='absolute w-screen top-0 flex flex-row px-32 py-4 bg-[#F5F5F7] justify-between items-center shadow-xl'>
      <Link to="/"><Logo /></Link>
      
      <div className='flex items-center gap-x-5'>
        <Link className='text-[#8B8E99] font-semibold' to='/home'>หน้าหลัก</Link>
        <Link className='text-[#8B8E99] font-semibold' to='/about'>ติดต่อเรา</Link>
      </div>
      { user
        ? <div className='flex flex-row items-center'>
            <Link className='text-[#8B8E99] font-semibold self-center' to='#' onClick={hdlLogout}>ออกจากระบบ</Link>
            <Sheet>
              <SheetTrigger><Icons.cart /></SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                  {
                    cart?.length > 0 && cart.map((item) => {
                      return (
                        <div className='flex flex-row items-center justify-between gap-4' key={item.product.id}>
                          <img src={`http://localhost:3001/images/${item.product.productImg}`} alt="" className='w-20 h-20' />
                          <div>{item.product.name}</div>
                          <div>{item.quantity}</div>
                        </div>
                      )
                      
                    })
                  }
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        : (
          <div className='flex items-center gap-x-4'>
            <Link className='text-[#8B8E99] font-semibold' to='/login'>เข้าสู่ระบบ</Link>
            <span>|</span>
            <Link className='text-[#8B8E99] font-semibold' to='/register'>สมัครสมาชิก</Link>
          </div>
        )
      }
      
    </div>
  )
}
