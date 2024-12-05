import { useOutletContext } from "react-router-dom"
import { SellerContextType } from "../../interfaces/seller.interface"
import { IOrder, IOrderTableProps } from "src/features/order/interfaces/order.interface"
import { filter, sumBy } from "lodash"
import { lowerCase, shortLongNumbers } from "src/shared/utils/utils.service"
import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from "react"




const ManageEarningsTable:LazyExoticComponent<FC<IOrderTableProps>>=lazy(()=>import('src/features/seller/components/dashboard/components/ManageEarningsTable'))

const ManageEarnings:FC = ():ReactElement => {
  const {orders,seller}=useOutletContext<SellerContextType>()

const completedOrders:IOrder[]=filter(orders,(order:IOrder)=>lowerCase(order.status)===lowerCase('Delivered'))
const sum:number=sumBy(orders,'price')
const average:number=sum/orders.length 

const averageSelling:number=average?parseInt(shortLongNumbers(average)):0


  return (
<div className="container mx-auto mt-8">
    <div className="flex flex-col flex-wrap">
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3">
        <div className="border border-grey flex items-center justify-center p-8 sm:col-span-1">
          <div className="flex flex-col gap-3">
            <span className="text-center text-base lg:text-xl">Earnings to date</span>
            <span className="text-center font-bold text-base md:text-xl lg:text-2xl truncate">${seller?.totalEarnings}</span>
          </div>
        </div>
        <div className="border border-grey flex items-center justify-center p-8 sm:col-span-1">
          <div className="flex flex-col gap-3">
            <span className="text-center text-base lg:text-xl">Avg. selling price</span>
            <span className="text-center font-bold text-base md:text-xl lg:text-2xl truncate">${averageSelling}</span>
          </div>
        </div>
        <div className="border border-grey flex items-center justify-center p-8 sm:col-span-1">
          <div className="flex flex-col gap-3">
            <span className="text-center text-base lg:text-xl">Orders completed</span>
            <span className="text-center font-bold text-base md:text-xl lg:text-2xl truncate">{seller?.completedJobs}</span>
          </div>
        </div>
      </div>

<Suspense fallback={'loading..'}>
  <ManageEarningsTable type={"active"} orders={completedOrders} orderTypes={completedOrders.length} />
</Suspense>
    </div>
  </div>
  )
}
export default ManageEarnings