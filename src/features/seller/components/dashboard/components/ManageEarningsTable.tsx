import { FC, Fragment, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';
import { IOrder, IOrderTableProps } from 'src/features/order/interfaces/order.interface';

const EarningsTableContent: LazyExoticComponent<FC<{ order: IOrder }>> = lazy(
  () => import('src/features/seller/components/dashboard/components/EarningsTableContent')
);

const ManageEarningsTable: FC<IOrderTableProps> = ({ type, orderTypes, orders }): ReactElement => {
  return (
    <div className="flex flex-col justify-between">
      <div className="border-grey border border-b-0 px-3 py-3">
        <div className="font-bold uppercase text-xs sm:text-sm md:text-base">Payouts </div>
      </div>
      <table className="border border-grey w-full table-auto flex flex-row flex-no-wrap text-sm text-gray-500 overflow-hidden sm:inline-table">
        {orderTypes > 0 ? (
          <>
            <thead className="border-grey border-b text-xs uppercase text-gray-700 sm:[&>*:not(:first-child)]:hidden">
              <tr className="bg-sky-500 text-white flex flex-col flex-nowrap sm:table-row md:table-row mb-1 sm:mb-0 lg:bg-transparent lg:text-black ">
                <th className="p-3 text-left md:text-center">Date</th>
                <th className="p-3 text-left md:text-center">Activity</th>
                <th className="p-3 text-left md:text-center">Description</th>
                <th className="p-3 text-left md:text-center">From</th>
                <th className="p-3 text-left md:text-center">Order</th>
                <th className="p-3 text-left md:text-center">Amount</th>
              </tr>
            </thead>
            {orders &&
              orders.map((order: IOrder) => (
                <Fragment key={order.id}>
                  <Suspense fallback={'loading...'}>
                    <EarningsTableContent order={order} />
                  </Suspense>
                </Fragment>
              ))}
          </>
        ) : (
          <tbody>
            <tr>
              <td className="w-full px-4 py-2 text-sm">No {type} orders to show.</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};
export default ManageEarningsTable;
