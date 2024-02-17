import Moment from "react-moment"

export const PaymentColumns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "paymentDate",
    header: "Payment Date",
    cell: ({ row }) => <Moment format="DD MMM YYYY" interval={0}>{row.getValue("paymentDate")}</Moment>
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "THB",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "method",
    header: "Payment Method",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]
