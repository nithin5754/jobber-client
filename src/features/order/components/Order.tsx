import { FC, lazy, MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';

import { IButtonProps } from 'src/shared/shared.interface';
import OrderActivities from './order-activites/OrderActivities';
import { IOrder } from '../interfaces/order.interface';
import { useParams } from 'react-router-dom';
import { useGetOrderByOrderIdQuery } from '../services/order.service';
import { useAppSelector } from 'src/store/store';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { TimeAgo } from 'src/shared/utils/date.utils';
import DeliveryTimer from './DeliveryTimer';
import OrderDetailsTable from './OrderDetailsTable';
import {  PiCurrencyInrBold } from 'react-icons/pi';

const Button: FC<IButtonProps> = lazy(() => import('src/shared/button/Button'));
const Order: FC = (): ReactElement => {
  const { orderId } = useParams();
  const authUser: IAuthUser = useAppSelector(useAuthDetails);
  const [showDeliveryPanel, setShowDeliveryPanel] = useState<boolean>(false);
  const [order, setOrder] = useState<IOrder>({} as IOrder);
  const elementRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const { data, isSuccess } = useGetOrderByOrderIdQuery(`${orderId}`);

  useEffect(() => {
    if (isSuccess) {
      setOrder({ ...data.order } as IOrder);
    }
  }, [data?.order, isSuccess]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        <div className="order-last w-full p-4 lg:order-first lg:w-2/3">
          <OrderDetailsTable authUser={authUser} order={order} />
          {order && order.buyerUsername === authUser.username && (
            <>
              <div className="mt-4 flex flex-col justify-between bg-white md:flex-row">
                <div className="flex w-full flex-col flex-wrap p-4 md:w-2/3">
                  <span className="text-base font-bold text-black lg:text-lg">
                    {order.delivered ? 'Your delivery is here!' : 'Your delivery is now in the works'}
                  </span>
                  {order.delivered ? (
                    <>
                      <p className="mt-1 w-5/6 flex-wrap text-sm">
                        View the delivery to make sure you have exactly what you need. Let sellerUsername know your thoughts.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="mt-1 w-5/6 flex-wrap text-sm">We notified sellerUsername about your order.</p>
                      <p className="mt-1 w-5/6 flex-wrap text-sm">
                        {' '}
                        You should receive your delivery by {TimeAgo.dayMonthYear(order.offer.newDeliveryDate)}
                      </p>
                    </>
                  )}
                </div>
                <div className="mb-4 ml-5 w-full justify-center self-center text-left md:mr-3 md:w-1/3 md:text-right">
                  {order && order.delivered && order.buyerUsername === authUser.username && (
                    <Button
                      className="rounded bg-customViolet px-2 py-2 text-center text-sm font-bold text-white hover:bg-customPurple  focus:outline-none md:px-4 md:py-2 md:text-base"
                      label="View Delivery"
                      onClick={() => {
                        if (elementRef.current) {
                          elementRef.current.scrollIntoView({ behavior: 'smooth' });
                        }
                        setShowDeliveryPanel(!showDeliveryPanel);
                      }}
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {order && Object.keys(order).length > 0 && (
            <OrderActivities order={order} ref={elementRef} authUser={authUser} viewDeliveryBtnClicked={showDeliveryPanel} />
          )}
        </div>

        <div className="w-full p-4 lg:w-1/3 ">
          {Object.keys(order).length > 0 ? (
            <>
              {order.delivered && authUser.username === order.sellerUsername && <DeliveryTimer order={order} authUser={authUser} />}
              {order.delivered && authUser.username === order.sellerUsername && <></>}
              {!order.delivered && <DeliveryTimer order={order} authUser={authUser} />}

              <div className="bg-white">
                <div className="mb-2 flex flex-col border-b px-4 pb-4 pt-3 md:flex-row">
                  <img className="h-11 w-20 object-cover" src={order?.gigCoverImage} alt="Gig Cover Image" />
                  <div className="flex flex-col">
                    <h4 className="mt-2 text-sm font-bold text-[#161c2d] md:mt-0 md:pl-4">{order.offer.gigTitle}</h4>
                    <span
                      className={`status mt-1 w-24 rounded px-[3px] py-[3px] text-xs font-bold uppercase text-white md:ml-4 ${order.status.replace(
                        / /g,
                        ''
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                <ul className="mb-0 list-none">
                  <li className="flex justify-between px-4 pb-2 pt-2">
                    <div className="flex gap-2 text-sm font-normal">Ordered from</div>
                    <span className="text-sm font-bold text-green-800 hover:text-green-500">{order?.sellerUsername}</span>
                  </li>
                  <li className="flex justify-between px-4 pb-2 pt-2">
                    <div className="flex gap-2 text-sm font-normal">Order</div>
                    <span className="text-sm font-bold">#{order?.orderId}</span>
                  </li>
                  <li className="flex justify-between px-4 pb-2 pt-2">
                    <div className="flex gap-2 text-sm font-normal">Delivery date</div>
                    <span className="text-sm font-bold">{TimeAgo.dayMonthYear(order?.offer?.newDeliveryDate)}</span>
                  </li>
                  <li className="flex justify-between px-4 pb-4 pt-2">
                    <div className="flex gap-2 text-sm font-normal">Total price</div>

                    <strong className="text-sm font-bold md:text-base flex items-center ">
                      <span> {'  '}</span> <PiCurrencyInrBold className="ml-4" />
                      {order?.price}
                    </strong>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
export default Order;
