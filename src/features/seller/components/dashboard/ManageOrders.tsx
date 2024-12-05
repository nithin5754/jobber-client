import { FC, lazy, LazyExoticComponent, Suspense, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SellerContextType } from '../../interfaces/seller.interface';
import { orderTypes, sellerOrderList, shortLongNumbers } from 'src/shared/utils/utils.service';
import { IOrder, IOrderTableProps } from 'src/features/order/interfaces/order.interface';

const ManageOrderTable: LazyExoticComponent<FC<IOrderTableProps>> = lazy(
  () => import('src/features/seller/components/dashboard/components/ManageOrderTable')
);

const SELLER_Gig_Status = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  IN_PROGRESS: 'in progress',
  COMPLETED: 'completed'
};

const ManageOrders = () => {
  const [type, setType] = useState<string>(SELLER_Gig_Status.IN_PROGRESS);
  const { orders } = useOutletContext<SellerContextType>();
  const orderRef: IOrder[] = useMemo(() => [...orders], [orders]);
  return (
    <div className="container mx-auto mt-8 px-6 md:px-12 lg:px-6">
      <div className="flex flex-col flex-wrap">
        <div className="mb-8 px-4 text-xl font-semibold text-black md:px-0 md:text-2xl lg:text-4xl">Manage Orders</div>
        <div className="p-0">
          <ul className="flex w-full cursor-pointer list-none flex-col flex-wrap rounded-[2px] sm:flex-none sm:flex-row">
            <li className="inline-block py-3 uppercase" onClick={() => setType(SELLER_Gig_Status.IN_PROGRESS)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === SELLER_Gig_Status.IN_PROGRESS ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`}
              >
                Active{' '}
                {orderTypes(SELLER_Gig_Status.IN_PROGRESS, orderRef) > 0 && (
                  <span
                    className="ml-1 rounded-[5px] bg-customViolet hover:bg-customPurple px-[5px] py-[1px] text-xs font-medium
                             text-white"
                  >
                    {shortLongNumbers(orderTypes(SELLER_Gig_Status.IN_PROGRESS, orderRef))}
                  </span>
                )}
              </a>
            </li>
            <li className="inline-block py-3 uppercase" onClick={() => setType(SELLER_Gig_Status.COMPLETED)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === SELLER_Gig_Status.COMPLETED ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`}
              >
                Completed{' '}
                {orderTypes(SELLER_Gig_Status.COMPLETED, orderRef) > 0 && (
                  <span
                    className="ml-1 rounded-[5px] bg-customViolet hover:bg-customPurple px-[5px] py-[1px] text-xs font-medium
                             text-white"
                  >
                    {shortLongNumbers(orderTypes(SELLER_Gig_Status.COMPLETED, orderRef))}
                  </span>
                )}
              </a>
            </li>
            <li className="inline-block py-3 uppercase" onClick={() => setType(SELLER_Gig_Status.CANCELLED)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === SELLER_Gig_Status.CANCELLED ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`}
              >
                Cancelled{' '}
                {orderTypes(SELLER_Gig_Status.CANCELLED, orderRef) > 0 && (
                  <span
                    className="ml-1 rounded-[5px] bg-customViolet hover:bg-customPurple px-[5px] py-[1px] text-xs font-medium
                             text-white"
                  >
                    {shortLongNumbers(orderTypes(SELLER_Gig_Status.CANCELLED, orderRef))}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>
        {type === SELLER_Gig_Status.IN_PROGRESS && (
          <Suspense fallback={'loading'}>
            <ManageOrderTable
              type={'active'}
              orders={sellerOrderList(SELLER_Gig_Status.IN_PROGRESS, orderRef)}
              orderTypes={orderTypes(SELLER_Gig_Status.IN_PROGRESS, orderRef)}
            />
          </Suspense>
        )}
        {type === SELLER_Gig_Status.COMPLETED && (
          <Suspense fallback={'loading'}>
            <ManageOrderTable
              type={'completed'}
              orders={sellerOrderList(SELLER_Gig_Status.COMPLETED, orderRef)}
              orderTypes={orderTypes(SELLER_Gig_Status.COMPLETED, orderRef)}
            />
          </Suspense>
        )}
        {type === SELLER_Gig_Status.CANCELLED && (
          <Suspense fallback={'loading'}>
            <ManageOrderTable
              type={'cancelled'}
              orders={sellerOrderList(SELLER_Gig_Status.CANCELLED, orderRef)}
              orderTypes={orderTypes(SELLER_Gig_Status.CANCELLED, orderRef)}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};
export default ManageOrders;
