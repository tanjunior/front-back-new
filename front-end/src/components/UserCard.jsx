import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import axios from "axios"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import CardForm from "./forms/CardForm"


export default function UserCard() {
  const queryClient = useQueryClient()
  const {data: cards, isLoading, isError } = useQuery({
    queryKey: ['cards'],
    queryFn: () => axios.get('http://localhost:3001/api/cards/allbyuserid').then((res) => {
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
          <CardTitle>Cards</CardTitle>
          <CardForm title="Add new card"/>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-6">
          { cards.length > 0
            ? cards.map((card) => (
              <div key={card.id} className="flex items-center justify-between">
                <p>{card.name} **** **** **** {card.number.slice(card.number.length - 4)} {card.month}/{card.year}</p>
                <div className="flex items-center gap-x-2">
                  {/* <CardForm title="Edit card" data={card} /> */}
                  <Button variant="destructive" onClick={() => axios.post("http://localhost:3001/api/cards/delete", card).then(res => {
                    if (res.status === 200) {
                      toast.success("Deleted")
                      queryClient.invalidateQueries({ queryKey: ['cards'] })
                    }
                  })}>Delete</Button>
                </div>
              </div>
            )) 
            : "No cards, add one!" }
        </CardContent>
      </Card>

    </div>
  )
}
