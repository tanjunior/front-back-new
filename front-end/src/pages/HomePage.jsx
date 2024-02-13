import { useQuery } from '@tanstack/react-query'
import { Button } from '../components/ui/button'
import Icons from '../components/ui/Icons'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function HomePage() {
  const { data: products, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/api/products/all')
      const data = await response.json()
      return data
    },
  })

  return (
    <div className='flex flex-row items-end justify-between w-full h-full gap-4 mt-28'>
      <div className='w-2/5'>filter</div>
      <div className='flex flex-col w-full gap-y-12'>
        <div className='flex flex-row justify-between gap-x-32'>
          <div className='flex flex-row w-full gap-x-2'>
            <Input type="text" className='rounded-md border border-[#E4E7E9] w-full max-w-80'/>
            <Select>
              <SelectTrigger className="w-[180px]">
                <span  className='text-secondary'>asd</span>
                <SelectValue placeholder="??" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>8/400</div>
        </div>

        <div className='grid grid-cols-4 gap-2'>
          {
            isLoading ? <div>Loading...</div> : (products.length > 0) ? products.map((product) => (
              

              <Link to={`/product/${product.id}`} key={product.id}>
                <Card>
                  <CardHeader>
                    <img src={`http://localhost:3001/images/${product.productImg}`} alt="" />
                  </CardHeader>
                  <CardContent>
                  <div>{product.name} ({product.capacity}) - {product.color}</div>
                  <div className='pl-2 text-primary'>{product.price}</div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Icons.cart className="w-10 h-10"/>
                  </CardFooter>
                </Card>
                
                
                
              </Link>
            )) : <div>No products found</div>
          }
        </div>
      </div>

    </div>
  )
}
