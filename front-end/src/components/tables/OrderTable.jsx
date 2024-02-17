import { OrderColumns } from './OrderColumns'
import { useQuery } from '@tanstack/react-query'
import { DataTable } from './DataTable'
import { NavLink } from 'react-router-dom'

export default function OrderTable() {
  const { data: products, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/api/orders/all`)
      const data = await response.json()
      // console.log(data)
      return data
    },
  })

  if (isError) return <div>เกิดข้อผิดพลาด</div>
  if (isLoading) return <div>กำลังโหลด...</div>

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-start justify-between">
        <div>
          <NavLink to="/">Dashboard</NavLink>
          {" > "}
          <span className="text-primary">Order List</span>
        </div>
      </div>
      <DataTable columns={OrderColumns} data={products}/>
    </div>
  )
}
