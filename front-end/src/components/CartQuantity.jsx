import { useEffect, useRef } from 'react'
import NumberSelector from './NumberSelector'

export default function CartQuantity(props) {
  const ref = useRef(null)

  useEffect(() => {
    console.log(ref)
  }, [ref])
  

  return (
    <NumberSelector ref={ref} {...props} />
  )
}
