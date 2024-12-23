import { FC, Fragment, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';

import { IOrder, IOrderTableProps } from 'src/features/order/interfaces/order.interface';

const OrderTableContent: LazyExoticComponent<FC<{ order: IOrder; type: string }>> = lazy(
  () => import('src/features/seller/components/dashboard/components/OrderTableContent')
);

const ManageOrderTable: FC<IOrderTableProps> = ({ type, orderTypes, orders }): ReactElement => {
  return (
    <div className="flex flex-col">
      <div className="border-grey border border-b-0 px-3 py-3">
        <div
          className="text-xs font-bold uppercase sm:text-sm 
        md:text-base"
        >
          {type} orders{' '}
        </div>
      </div>
      <table
        className="border-grey flex-no-wrap flex w-full table-auto flex-row overflow-hidden border text-sm text-gray-500 
        sm:inline-table"
      >
        {orderTypes > 0 ? (
          <>
            <thead className="border-grey border-b text-xs uppercase text-gray-700 sm:[&>*:not(:first-child)]:hidden">
              <tr
                key=""
                className="mb-1 flex flex-col flex-nowrap bg-sky-500 text-white sm:mb-0 
                      sm:table-row md:table-row lg:bg-transparent
                       lg:text-black"
              >
                <th className="p-3 text-center "></th>
                <th className="p-3 text-center w-auto ">Buyer</th>
                <th className="p-3  text-left ">Gig</th>

                <th className="p-3  text-center ">{type === 'cancelled' ? 'Cancelled On' : 'Due On'}</th>

                {type === 'completed' && <th className="p-3   text-center  ">Delivered At</th>}

                <th className="p-3   text-center  ">Total</th>
                <th className="p-3   text-center  ">Status</th>

                {type === 'active' && <th className="p-3   text-center  ">Cancel</th>}
              </tr>
            </thead>
            <tbody className="flex-1 sm:flex-none">
              {orders.map((order: IOrder) => (
                <Fragment key={order.id}>
                  <Suspense fallback={'loading...'}>
                    <OrderTableContent order={order} type={type} />
                  </Suspense>
                </Fragment>
              ))}
            </tbody>
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
export default ManageOrderTable;