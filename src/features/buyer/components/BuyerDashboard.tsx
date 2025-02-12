import { FC, ReactElement, useEffect, useState } from 'react';
import Table from './BuyerTable';
import socketService from 'src/sockets/socket.service';
import { useParams } from 'react-router-dom';
import { useGetOrdersByBuyerIdQuery } from 'src/features/order/services/order.service';
import { IOrder } from 'src/features/order/interfaces/order.interface';
import { BuyerOrderTypeList, orderTypes, shortenLargeNumbers } from 'src/shared/utils/utils.service';

const BUYER_GIG_STATUS = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  IN_PROGRESS: 'in progress',
  COMPLETED: 'completed',
  DELIVERED: 'delivered'
};

const DashBoard: FC = (): ReactElement => {
  const [type, setType] = useState<string>(BUYER_GIG_STATUS.ACTIVE);
  let orders: IOrder[] = [];
  const { buyerId } = useParams<string>();
  const { data, isSuccess } = useGetOrdersByBuyerIdQuery(`${buyerId}`);

  if (isSuccess) {
    orders = data.orders as IOrder[];
  }

  useEffect(() => {
    const socket = socketService.getSocket();
    if (socket) {
      socket.emit('getLoggedInUsers', '');
    }
  }, []);
  return (
    <div className="container mx-auto mt-8 px-6 md:px-12 lg:px-6">
      <div className="flex flex-col flex-wrap">
        <div className="mb-8 px-4 text-xl font-semibold text-black md:px-0 md:text-2xl lg:text-4xl">Manage Orders</div>
        <div className="p-0">
          <ul className="flex w-full cursor-pointer list-none flex-col flex-wrap rounded-[2px] sm:flex-none sm:flex-row">
            <li className="inline-block py-3 uppercase" onClick={() => setType(BUYER_GIG_STATUS.ACTIVE)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === BUYER_GIG_STATUS.ACTIVE ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`}
              >
                Active{' '}
                {orderTypes(BUYER_GIG_STATUS.IN_PROGRESS, orders) > 0 && (
                  <span
                    className="ml-1 rounded-[5px] bg-customViolet hover:bg-customPurple px-[5px] py-[1px] text-xs font-medium
                               text-white"
                  >
                    {shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.IN_PROGRESS, orders))}
                  </span>
                )}
              </a>
            </li>
            <li className="inline-block py-3 uppercase" onClick={() => setType(BUYER_GIG_STATUS.COMPLETED)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === BUYER_GIG_STATUS.COMPLETED ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`}
              >
                Completed{' '}
                {orderTypes(BUYER_GIG_STATUS.COMPLETED, orders) > 0 && (
                  <span className="ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white">
                    {shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.COMPLETED, orders))}
                  </span>
                )}
              </a>
            </li>
            <li className="inline-block py-3 uppercase" onClick={() => setType(BUYER_GIG_STATUS.CANCELLED)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === BUYER_GIG_STATUS.CANCELLED ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`}
              >
                Cancelled{' '}
                {orderTypes(BUYER_GIG_STATUS.CANCELLED, orders) > 0 && (
                  <span className="ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white">
                    {shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.CANCELLED, orders))}
                  </span>
                )}
              </a>
            </li>
            <li className="inline-block py-3 uppercase" onClick={() => setType(BUYER_GIG_STATUS.DELIVERED)}>
              <a
                href="#activeorders"
                className={`px-4 py-3 text-xs text-[#555555] no-underline sm:text-sm md:text-base ${type === BUYER_GIG_STATUS.DELIVERED ? 'pb-[15px] outline outline-1 outline-[#e8e8e8] sm:rounded-t-lg' : ''}`}
              >
                Delivered{' '}
                {orderTypes(BUYER_GIG_STATUS.DELIVERED, orders) > 0 && (
                  <span className="ml-1 rounded-[5px] bg-sky-500 px-[5px] py-[1px] text-xs font-medium text-white">
                    {shortenLargeNumbers(orderTypes(BUYER_GIG_STATUS.DELIVERED, orders))}
                  </span>
                )}
              </a>
            </li>
          </ul>
        </div>

        {type === BUYER_GIG_STATUS.ACTIVE && (
          <Table
            type="active"
            orders={BuyerOrderTypeList(BUYER_GIG_STATUS.IN_PROGRESS, orders)}
            orderTypes={orderTypes(BUYER_GIG_STATUS.IN_PROGRESS, orders)}
          />
        )}
        {type === BUYER_GIG_STATUS.COMPLETED && (
          <Table
            type="completed"
            orders={BuyerOrderTypeList(BUYER_GIG_STATUS.COMPLETED, orders)}
            orderTypes={orderTypes(BUYER_GIG_STATUS.COMPLETED, orders)}
          />
        )}
        {type === BUYER_GIG_STATUS.CANCELLED && (
          <Table
            type="cancelled"
            orders={BuyerOrderTypeList(BUYER_GIG_STATUS.CANCELLED, orders)}
            orderTypes={orderTypes(BUYER_GIG_STATUS.CANCELLED, orders)}
          />
        )}

        {type === BUYER_GIG_STATUS.DELIVERED && (
          <Table
            type="delivered"
            orders={BuyerOrderTypeList(BUYER_GIG_STATUS.DELIVERED, orders)}
            orderTypes={orderTypes(BUYER_GIG_STATUS.DELIVERED, orders)}
          />
        )}
      </div>
    </div>
  );
};
export default DashBoard;
