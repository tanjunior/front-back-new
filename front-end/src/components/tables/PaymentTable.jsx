import { useQuery } from '@tanstack/react-query'
import { DataTable } from './DataTable'
import { PaymentColumns } from './PaymentColumns'

export default function PaymentTable() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/api/payments/all`)
      const data = await response.json()
      // console.log(data)
      return data
    },
  })

  if (isError) return <div>เกิดข้อผิดพลาด</div>
  if (isLoading) return <div>กำลังโหลด...</div>

  return (
    <div className="flex flex-col">
      <DataTable columns={PaymentColumns} data={data}/>
    </div>
  )
}
