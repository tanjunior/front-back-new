import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import axios from "axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import AddressForm from "./forms/AddressForm"
import { toast } from "sonner"
import thaiAddressIdToString from "@/lib/thaiAddressIdToString"


export default function UserAddress() {
  const queryClient = useQueryClient()
  const {data: addresses, isLoading, isError } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => axios.get('http://localhost:3001/api/addresses/allbyuserid').then((res) => {
      return res.data
    })
  })


  if (isError) {
    return <div>Error</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <div className='flex flex-col justify-center flex-1 gap-y-6'>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Address</CardTitle>
          <AddressForm title="Add new address"/>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6">
          { addresses.length > 0
            ? addresses.map((address) => (
              <div key={address.id} className="flex items-center justify-between">
                <p>{address.address}, {thaiAddressIdToString(address.subdistrict, "subdistrict")}, {thaiAddressIdToString(address.district, "district")}, {thaiAddressIdToString(address.province, "province")}, {address.postalCode}</p>
                <div className="flex items-center gap-x-2">
                  <AddressForm title="Edit address" data={address} />
                  <Button variant="destructive" onClick={() => axios.post("http://localhost:3001/api/addresses/delete", address).then(res => {
                    if (res.status === 200) {
                      toast.success("Deleted")
                      queryClient.invalidateQueries({ queryKey: ['addresses'] })
                    }
                  })}>Delete</Button>
                </div>
              </div>
            )) 
            : "No addresses, add one!" }
        </CardContent>
      </Card>

    </div>
  )
}
