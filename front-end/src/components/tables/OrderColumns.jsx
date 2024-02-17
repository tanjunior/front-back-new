import { Link } from "react-router-dom"

export const OrderColumns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "orderDate",
    header: "Order Date",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      // const total = 0
      const total = row.original?.orderDetails?.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
      console.log(row.original)
      const amount = parseFloat(total)
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "THB",
      }).format(amount)
      return <div className="font-medium text-right">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const productId = row.original.id
      const queryClient = useQueryClient() // can't invalidate because I can't use a hook in here

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link 
              to={`/products/${productId}`}
              state={row.original}
            >
              <DropdownMenuItem>
              Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => axios.delete(
                "http://localhost:3001/api/products/delete",
                {data: {id: productId}}
              ).then(res => {
                if (res.status === 200) {
                  toast("deleted")
                  queryClient.invalidateQueries("products")
                }
              })}
            >Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
