import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import { Input } from "@/components/ui/input"
import useAuth from "@/hooks/useAuth"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

const formSchema = z.object({
  username: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1).max(10),
})


export default function UserAddress() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const {data: addresses, isLoading, isError } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => axios.get('http://localhost:3001/api/addresses/allbyuserid').then((res) => {
      return res.data
    })
  })





  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email,
      phoneNumber: user.phoneNumber
    },
  })


  // 2. Define a submit handler.
  function onSubmit(values) {
    axios.put('http://localhost:3001/api/users/update', {...values, id: user.id}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      logout()
      navigate('/')
    }).catch((err) => {
      console.log(err.message)
    })
  }

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
          <Dialog>
            <DialogTrigger className="p-2 border rounded-md border-primary">Add new address</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new address</DialogTitle>
              </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="col-span-2">Submit</Button>
                  </form>
                </Form>
            </DialogContent>
          </Dialog>

        </CardHeader>
        <CardContent>
          { addresses.length > 0 ? addresses.map((address) => <div key={address.id}>{address.id}</div>) : "No addresses, add one!" }
        </CardContent>
        <CardFooter>
          
        </CardFooter>
      </Card>

    </div>
  )
}
