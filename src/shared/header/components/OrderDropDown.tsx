import { FC, ReactElement } from 'react';
import { IHomeHeaderProps } from '../interface/header.interface';
import { useGetOrdersByBuyerIdQuery } from 'src/features/order/services/order.service';
import { IOrder } from 'src/features/order/interfaces/order.interface';
import { Link } from 'react-router-dom';
import { lowerCase } from 'src/shared/utils/utils.service';
import { FaEye } from 'react-icons/fa';

const OrderDropDown: FC<IHomeHeaderProps> = ({ buyer, setIsDropdownOpen }): ReactElement => {
  const { data, isSuccess } = useGetOrdersByBuyerIdQuery(`${buyer?.id}`);
  let orders: IOrder[] = [];

  if (isSuccess) {
    orders = data.orders as IOrder[];
  }
  return (
    <div className=" border-grey border-grey z-20 flex max-h-[470px] flex-col justify-between rounded border bg-white shadow-md">
      <div className="h-96 overflow-y-scroll">
        {orders &&
          orders.length > 0 &&
          orders.map((order: IOrder) => (
            <div key={order.id} className="border-grey h-[76px] border-b pt-2 text-left hover:bg-gray-50">
              <Link
                to={`/orders/${order.orderId}/activities`}
                className="flex px-4"
                onClick={() => {
                  if (setIsDropdownOpen) {
                    setIsDropdownOpen(false);
                  }
                }}
              >
                <div className="mt-1 flex-shrink-0">
                  <img className="h-14 w-20 object-cover" src={order.gigCoverImage} alt="" />
                </div>
                <div className="w-full pl-3">
                  <div className="text-[13px] font-normal leading-normal">{order.gigBasicTitle}</div>
                  <div className="flex gap-2 text-[11px]">
                    <span className="font-normal text-[#b5b6ba]">by {order.sellerUsername}</span>
                    <span className="font-normal">&#x2022;</span>
                    <span className={`rounded text-white px-2 ${lowerCase(order.status.replace(/ /g, ''))}`}>{order.status}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
               {orders.length === 0 && <div className="flex h-full items-center justify-center">No orders to show</div>}
      </div>
      {orders.length > 0 && (
        <Link
          to={`/users/${lowerCase(`${buyer?.username}`)}/${buyer?.id}/orders`}
          className="flex h-10 cursor-pointer justify-center bg-white px-4 text-sm font-medium text-sky-500"
          onClick={() => {
            if (setIsDropdownOpen) {
              setIsDropdownOpen(false);
            }
          }}
        >
          <FaEye className="mr-2 h-4 w-4 self-center" />
          <span className="self-center">View all</span>
        </Link>
      )}
    </div>
  );
};
export default OrderDropDown;
