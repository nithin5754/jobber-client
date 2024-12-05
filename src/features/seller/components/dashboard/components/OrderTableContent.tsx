
import { lowerCase } from "lodash"

import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from "react"
import { Link } from "react-router-dom"
import { IOrder } from "src/features/order/interfaces/order.interface"
import { updateHeader } from "src/shared/header/reducer/header.reducer"
import { IButtonProps } from "src/shared/shared.interface"
import { TimeAgo } from "src/shared/utils/date.utils"
import { useAppDispatch } from "src/store/store"

const OrderTableButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));


const OrderTableContent:FC<{order:IOrder,type:string}> = ({order,type}):ReactElement=> {
const dispatch=useAppDispatch()

  return (
    <tr  className="bg-white border-b border-grey flex flex-col flex-nowrap sm:table-row mb-2 sm:mb-0 ">
    <td></td>
    <td className="flex justify-start gap-3 px-3 py-3 sm:justify-center md:justify-start">
      <div className="flex flex-wrap gap-2 self-center">
        <img className="h-6 w-6 lg:h-8 lg:w-8 rounded-full object-cover" src={order.buyerImage} alt="" />
        <span className="font-bold flex self-center">{order.buyerUsername}</span>
      </div>
    </td>
    <td className="p-3 text-left lg:text-center w-[300px]">
      <div className="grid">
        <Link
          to={`/orders/${order.orderId}/activities`}
          onClick={() => dispatch(updateHeader('home'))}
          className="truncate text-sm font-normal hover:text-sky-500"
        >
          {order.offer.gigTitle}
        </Link>
      </div>
    </td>
    <td className="p-3 text-left lg:text-center">
      {type === 'cancelled'
        ? TimeAgo.dayMonthYear(`${order.approvedAt}`)
        : TimeAgo.dayMonthYear(`${order.offer.newDeliveryDate}`)}
    </td>
    {type === 'completed' && order.events.orderDelivered && (
      <td className="p-3 text-left lg:text-center">{TimeAgo.dayMonthYear(`${order.events.orderDelivered}`)}</td>
    )}
    <td className="p-3 text-left lg:text-center">${order.price}</td>
    <td className="px-3 py-1 lg:p-3 text-left lg:text-center">
      <span
        className={`rounded bg-transparent text-black p-0 text-xs font-bold uppercase sm:text-white sm:px-[5px] sm:py-[4px] status ${lowerCase(
          order.status.replace(/ /g, '')
        )}`}
      >
        {order.status}
      </span>
    </td>
    {type === 'active' && (
      <td className="px-3 py-1 lg:p-3 text-left lg:text-center">
      <Suspense fallback={'loading...'}>
      <OrderTableButton
          className="rounded bg-red-500 px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base"
          label="Cancel Order"
        />
      </Suspense>
      </td>
    )}
  </tr>
  )
}
export default OrderTableContent