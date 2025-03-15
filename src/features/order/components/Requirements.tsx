import { LazyExoticComponent, FC, lazy, useRef, useState, ChangeEvent, ReactElement } from 'react';
import { NavigateFunction, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IButtonProps, IResponse, ITextInputProps } from 'src/shared/shared.interface';
import { IOffer, IOrder, IOrderInvoice } from '../interfaces/order.interface';
import { generateRandomNumbers, showErrorToast } from 'src/shared/utils/utils.service';
import { useGetGigByIdQuery } from 'src/features/gigs/service/gig.service';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';
import { useGetBuyerDetails } from 'src/features/buyer/reducer/buyer.reducer';
import { TimeAgo } from 'src/shared/utils/date.utils';
import { useCreateOrderMutation } from '../services/order.service';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { OrderContext } from '../context/OrderContext';
import Invoice from './Invoice/Invoice';
import { IBuyer } from 'src/features/buyer/interfaces/buyer.interfaces';
import { useAppSelector } from 'src/store/store';
import { PiCurrencyInrBold } from 'react-icons/pi';

const TextAreaInput: LazyExoticComponent<FC<ITextInputProps>> = lazy(() => import('src/shared/inputs/TextAreaInput'));

const Button: FC<IButtonProps> = lazy(() => import('src/shared/button/Button'));
const Requirements: FC = (): ReactElement => {
  const buyer: IBuyer = useAppSelector(useGetBuyerDetails);
  const placeholder = 'https://placehold.co/330x220?text=Placeholder';
  const { gigId } = useParams<string>();
  const [searchParams] = useSearchParams({});
  const gigRef = useRef<ISellerGig>();
  const [createOrder] = useCreateOrderMutation();
  const [requirement, setRequirement] = useState<string>('');
  const offer: IOffer = JSON.parse(`${searchParams.get('offer')}`);
  const order_date = `${searchParams.get('order_date')}`;
  const serviceFee: number = offer.price < 50 ? (5.5 / 100) * offer.price + 2 : (5.5 / 100) * offer.price;
  const navigate: NavigateFunction = useNavigate();
  const orderId = `JO${generateRandomNumbers(11)}`;
  const invoiceId = `JI${generateRandomNumbers(11)}`;
  const { data, isSuccess } = useGetGigByIdQuery(`${gigId}`);

  if (isSuccess) {
    gigRef.current = data.gig;
  }

  const orderInvoice: IOrderInvoice = {
    invoiceId,
    orderId,
    date: `${new Date()}`,
    buyerUsername: `${buyer.username}`,
    orderService: [
      {
        service: `${gigRef?.current?.title}`,
        quantity: 1,
        price: offer.price
      },
      {
        service: 'Service Fee',
        quantity: 1,
        price: serviceFee
      }
    ]
  };

  const startOrder = async (): Promise<void> => {
    try {
      const paymentIntentId = `RA${generateRandomNumbers(11)}`;
      const order: IOrder = {
        offer: {
          gigTitle: offer.gigTitle,
          price: offer.price,
          description: offer.description,
          deliveryInDays: offer.deliveryInDays,
          oldDeliveryDate: offer.oldDeliveryDate,
          newDeliveryDate: offer.newDeliveryDate,
          accepted: true,
          cancelled: offer.cancelled
        },
        gigId: `${gigId}`,
        sellerId: `${gigRef?.current?.sellerId}`,
        sellerImage: `${gigRef?.current?.profilePicture}`,
        sellerUsername: `${gigRef?.current?.username}`,
        sellerEmail: `${gigRef?.current?.email}`,
        gigCoverImage: `${gigRef?.current?.coverImage}`,
        gigMainTitle: `${gigRef?.current?.title}`,
        gigBasicTitle: `${gigRef?.current?.basicTitle}`,
        gigBasicDescription: `${gigRef?.current?.basicDescription}`,
        buyerId: `${buyer.id}`,
        buyerUsername: `${buyer.username}`,
        buyerImage: `${buyer.profilePicture}`,
        buyerEmail: `${buyer.email}`,
        status: 'in progress',
        orderId,
        invoiceId,
        quantity: 1,
        dateOrdered: `${new Date()}`,
        price: offer.price,
        requirements: requirement,
        paymentIntent: `${paymentIntentId}`,
        events: {
          placeOrder: order_date,
          requirements: `${new Date()}`,
          orderStarted: `${new Date()}`
        }
      };
      const response: IResponse = await createOrder(order).unwrap();

      navigate(`/orders/${orderId}/activities`, { state: response?.order });
    } catch (error) {
      showErrorToast('Error starting your order.');
    }
  };

  return (
    <div className="container mx-auto lg:h-screen">
      <div className="flex flex-wrap">
        <div className="order-last w-full p-4 lg:order-first lg:w-2/3">
          <div className="mb-4 flex w-full flex-col flex-wrap bg-[#d4edda] p-4">
            <span className="text-base font-bold text-black lg:text-xl">Thank you for your purchase</span>
            <div className="flex gap-1">
              You can{' '}
              {orderInvoice && (
                <PDFDownloadLink
                  document={
                    <OrderContext.Provider value={{ orderInvoice }}>
                      <Invoice />
                    </OrderContext.Provider>
                  }
                  fileName={`${orderInvoice.invoiceId || 'invoice'}.pdf`}
                  className="cursor-pointer text-customPurple underline"
                >
                  <div className="cursor-pointer text-customPurple underline">download your invoice</div>
                </PDFDownloadLink>
              )}
            </div>
          </div>
          <div className="border-grey border">
            <div className="mb-3 px-4 pb-2 pt-3">
              <span className="mb-3 text-base font-medium text-black md:text-lg lg:text-xl">
                Any information you would like the seller to know?
              </span>
              <p className="text-sm">Click the button to start the order.</p>
            </div>
            <div className="flex flex-col px-4 pb-4">
              <TextAreaInput
                rows={5}
                name="requirement"
                value={requirement}
                placeholder="Write a brief description..."
                className="border-grey mb-1 w-full rounded border p-3.5 text-sm font-normal text-gray-600 focus:outline-none"
                onChange={(event: ChangeEvent) => setRequirement((event.target as HTMLTextAreaElement).value)}
              />
              <Button
                className="mt-3 rounded bg-customPurple px-6 py-3 text-center text-sm font-bold text-white hover:bg-customViolet focus:outline-none md:px-4 md:py-2 md:text-base"
                label="Start Order"
                onClick={startOrder}
              />
            </div>
          </div>
        </div>

        <div className="w-full p-4 lg:w-1/3">
          <div className="border-grey mb-8 border">
            <div className="mb-2 flex flex-col border-b md:flex-row h-[400px]">
              <img className="w-full object-cover" src={gigRef.current?.coverImage ?? placeholder} alt="Gig Cover Image" />
            </div>
            <ul className="mb-0 list-none">
              <li className="border-grey flex border-b px-4 pb-3 pt-1">
                <div className="text-sm font-normal">{offer.gigTitle}</div>
              </li>
              <li className="flex justify-between px-4 pb-2 pt-4">
                <div className="flex gap-2 text-sm font-normal">Status</div>
                <span className="rounded bg-orange-300 px-[5px] py-[2px] text-xs font-bold uppercase text-white">incomplete</span>
              </li>
              <li className="flex justify-between px-4 pb-2 pt-2">
                <div className="flex gap-2 text-sm font-normal">Order</div>
                <span className="text-sm">#{orderId}</span>
              </li>
              <li className="flex justify-between px-4 pb-2 pt-2">
                <div className="flex gap-2 text-sm font-normal">Order Date</div>
                <span className="text-sm">{TimeAgo.dayMonthYear(`${new Date()}`)}</span>
              </li>
              <li className="flex justify-between px-4 pb-2 pt-2">
                <div className="flex gap-2 text-sm font-normal">expected delivery in</div>
                <span className="text-sm">{`${offer.deliveryInDays}Day${offer.deliveryInDays > 1 ? 's' : ''}`}</span>
              </li>
              <li className="flex justify-between px-4 pb-4 pt-2">
                <div className="flex gap-2 text-sm font-normal">Price</div>

                <span className="text-sm  font-normal  md:text-base flex items-center ">
                  <span> {'  '}</span> <PiCurrencyInrBold className="ml-4" />
                  {offer.price}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Requirements;
