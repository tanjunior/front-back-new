import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import Icons from '../components/ui/Icons'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function ProductPage() {
  const { data: product, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/api/products/get/${id}`)
      const data = await response.json()
      return data
    },
  })
  
  const id = useParams().id

  if (isError) return <div>Error</div>
  if (isLoading) return <div>Loading</div>
  
  return (
    <div className='flex flex-col items-center justify-center h-full px-20 pt-32 gap-y-6'>
      <div className='grid grid-cols-2 gap-x-16'>
        <img src={`http://localhost:3001/images/${product.productImg}`} alt={product.name} className='py-16 px-28 border border-[#E4E7E9]' />
        <div className='flex flex-col w-full gap-y-6'>
          <h1 className='text-xl'>{product.name} {product.capacity} {product.color}</h1>
          <div className='grid grid-cols-2'>
            <div className='text-[#5F6C72]'>ID: <span className='text-[#191C1F] font-medium'>{product.id}</span></div>
            <div className='text-[#5F6C72]'>???: <span className='text-[#25B800] font-medium'>{product.id}</span></div>
            <div className='text-[#5F6C72]'>???: <span className='text-[#191C1F] font-medium'>Apple</span></div>
            <div className='text-[#5F6C72]'>???: <span className='text-[#191C1F] font-medium'>????</span></div>
          </div>
          <Separator />
          <div className='flex flex-col'>
            <Label>???</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="???" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Label>???</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="???" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Carousel>
          <CarouselContent>
            <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem>
            <CarouselItem>...</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className='flex flex-col gap-y-2'>
          <div className='flex flex-row gap-2'>
            <Input type="number" />
            <Button variant={"outline"} className="w-full border-primary text-primary">???</Button>
          </div>
          <Button className="w-full">???</Button>
        </div>
      </div>
      <div className='border border-[#E4E7E9] flex flex-col w-full'>
        <div className='border border-[#E4E7E9] flex justify-center'>
          <div className='border-b-[3px] border-orange-400'>????</div>
        </div>
        <div className='border border-[#E4E7E9] px-44 flex justify-center gap-x-32 py-6 items-start'>
          <div className='grid grid-rows-7 text-[#5F6C72] gap-x-2 w-full h-full gap-y-1'>
            <h3 className='font-medium text-[#191C1F] col-span-2'>Description</h3>
            <div>Screen size:</div>
            <div>6.1 Inch</div>
            <div>Chip:</div>
            <div>A13 Bionic</div>
            <div>Display:</div>
            <div>Liquid Retina</div>
            <div>Front Camera:</div>
            <div>12MP</div>
            <div>Back Camera:</div>
            <div>Dual 12MP (Wide and Ultra Wide)</div>
            <div>Connection Ports:</div>
            <div>Lightning</div>
          </div>

          <div className='grid grid-rows-5 gap-x-2 text-[#191C1F] w-full gap-y-2 items-center'>
            
            <h3 className='col-span-2 font-medium'>Feature</h3>
            <Icons.user className="text-primary w-min"/>
            <div>1 Year Warranty</div>
            <Icons.user className="text-primary"/>
            <div>Free Shipping and Fast Delivery</div>
            <Icons.user className="text-primary"/>
            <div>100% Money Back Garauntee</div>
            <Icons.user className="text-primary"/>
            <div>24/7 Customer Support</div>
            <Icons.user className="text-primary"/>
            <div>Secure Payment Method</div>
          </div>
        </div>
      </div>
    </div>
  )
}
