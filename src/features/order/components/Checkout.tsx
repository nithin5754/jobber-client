import { useState } from 'react';
import { useSearchParams, useLocation, useParams } from 'react-router-dom';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';
import { IOffer } from '../interfaces/order.interface';
import { FaRegClock, FaRegMoneyBillAlt, FaCog } from 'react-icons/fa';
import CheckoutForm from './checkout-form/CheckoutForm';

const Checkout = () => {
  const [searchParams] = useSearchParams({});
  const { state }: { state: ISellerGig } = useLocation();
  const [offer] = useState<IOffer>(
    JSON.parse(`${searchParams.get('offer')}
  `)
  );
  const { gigId } = useParams<string>();
  const serviceFees: number = offer.price < 50 ? (5.5 / 100) * offer.price + 2 : (5.5 / 100) * offer.price;
  return (
    <div className="container mx-auto h-screen">
      <div className="flex flex-wrap">
        <div className="w-full p-4 lg:w-2/3 order-last lg:order-first">
          <div className="border border-grey">
            <div className="text-xl font-medium mb-3 pt-3 pb-4 px-4">
              <span>Payment</span>
            </div>
          <CheckoutForm gigId={`${gigId}`} offer={offer}/>
          </div>
        </div>

        <div className="w-full p-4 lg:w-1/3">
          <div className="border border-grey mb-8">
            <div className="pt-3 pb-4 px-4 mb-2 flex flex-col border-b md:flex-row">
              <img
                className="object-cover w-20 h-11"
                src={state?.coverImage || 'https://placehold.co/330x220?text=Placeholder'}
                alt="Gig Cover Image"
              />
              <h4 className="font-bold text-sm text-[#161c2d] mt-2 md:pl-4 md:mt-0">title</h4>
            </div>
            <ul className="list-none mb-0">
              <li className="flex px-4 pt-1 pb-3 border-b border-grey">
                <div className="font-normal text-sm">{state.description}</div>
              </li>
              <li className="flex justify-between px-4 pt-2 pb-2">
                <div className="text-sm font-normal flex gap-2">
                  <FaRegClock className="self-center" /> Expected delivery time
                </div>
                <span className="text-sm">
                  {offer.deliveryInDays} day{offer.deliveryInDays > 1 ? 's' : ''}
                </span>
              </li>
              <li className="flex justify-between px-4 pt-2 pb-2">
                <div className="text-sm font-normal flex gap-2">
                  <FaRegMoneyBillAlt className="self-center" /> Price
                </div>
                <span className="text-sm">${offer.price}</span>
              </li>
              <li className="flex justify-between px-4 pt-2 pb-2">
                <div className="text-sm font-normal flex gap-2">
                  <FaCog className="self-center" /> Service fee
                </div>
                <span className="text-sm">${serviceFees.toFixed(2)}</span>
              </li>
              <div className="border-b border-grey" />
              <li className="flex justify-between px-4 py-4">
                <div className="text-sm md:text-base font-semibold flex gap-2">
                  <FaCog className="self-center" /> Total
                </div>
                <span className="text-sm md:text-base font-semibold">${offer.price + serviceFees}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
