import { FC, ReactElement } from "react"
import { Link } from "react-router-dom"
import { IOrder } from "src/features/order/interfaces/order.interface"
import { updateHeader } from "src/shared/header/reducer/header.reducer"
import { TimeAgo } from "src/shared/utils/date.utils"
import { useAppDispatch } from "src/store/store"



const EarningsTableContent:FC<{order:IOrder}> = ({order}):ReactElement => {
  const dispatch=useAppDispatch()
  return (
    <tbody className="flex-1 sm:flex-none">
    <tr className="bg-white border-b border-grey flex flex-col flex-nowrap sm:table-row mb-2 sm:mb-0 ">
      <td className="p-3 text-left md:text-center">{TimeAgo.dayMonthYear(`${order.events.orderDelivered}`)}</td>
      <td className="p-3 text-left md:text-center">Earning</td>
      <td className="p-3 text-left md:text-center">order</td>
      <td className="p-3 text-left md:text-center lowercase">{order.buyerUsername}</td>
      <td className="p-3 text-left md:text-center">
        <Link onClick={()=>dispatch(updateHeader('home'))} className="underline" to={`/orders/${order.orderId}/activities`}>
          {order.orderId}
        </Link>
      </td>
      <td className="px-3 text-left md:text-center text-sky-500 font-bold">US ${0.8*order.price}</td>
    </tr>
  </tbody>
  )
}
export default EarningsTableContent