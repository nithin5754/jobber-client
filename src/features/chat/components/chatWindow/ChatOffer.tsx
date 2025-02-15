import { FC, lazy, LazyExoticComponent, ReactElement } from 'react';
import { FaRegClock } from 'react-icons/fa';
import { IButtonProps } from 'src/shared/shared.interface';
import { IChatMessageProps } from '../../interface/chat.interface';
import { createSearchParams, NavigateFunction, useNavigate } from 'react-router-dom';
import { useUpdateOfferMutation } from '../../service/chat.service';
import { IOffer } from 'src/features/order/interfaces/order.interface';
import { showErrorToast } from 'src/shared/utils/utils.service';
import { PiCurrencyInrBold } from 'react-icons/pi';

const ChatOfferButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));

const ChatOffer: FC<IChatMessageProps> = ({ message, gig, seller }): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [updateOffer] = useUpdateOfferMutation();

  const messageOffer: IOffer = message.offer as IOffer;

  const handleUpdateBuyerOffer = async (messageId: string, type: string, offer: IOffer): Promise<void> => {
    try {
      await updateOffer({ messageId, type }).unwrap();

      const offerParams: IOffer = {
        gigTitle: offer.gigTitle,
        description: offer.description,
        price: offer.price,
        deliveryInDays: offer.deliveryInDays,
        oldDeliveryDate: offer.oldDeliveryDate,
        newDeliveryDate: offer.newDeliveryDate,
        accepted: offer.accepted,
        cancelled: offer.cancelled
      };

      if (type === 'accepted') {
        navigate(`/gig/checkout/${message.gigId}?${createSearchParams({ offer: JSON.stringify(offerParams) })}`, { state: gig });
      }
    } catch (error) {
      showErrorToast('Error updating Buyer offer.');
    }
  };

  return (
    <div className="z-1 border-grey mt-2 flex h-72 max-w-xl flex-col overflow-hidden rounded border">
      <div className="w-full">
        <div className="border-grey flex flex-row justify-between border-b bg-[#fafafa] p-4 text-sm font-bold md:text-base">
          <span className="">{messageOffer?.gigTitle}</span>

          <span className="text-sm font-bold md:text-base flex items-center ">
            <span> {'  '}</span> <PiCurrencyInrBold className="ml-4" />
            {messageOffer?.price}
          </span>
        </div>
        <div className="border-grey h-28 max-h-28 overflow-y-scroll border-b px-4 py-3">{messageOffer?.description}</div>
        <div className="border-grey flex flex-row gap-x-2 border-b px-4 py-3 text-sm font-bold md:text-base">
          <FaRegClock className="self-center" />
          {messageOffer?.deliveryInDays}Day{parseInt(`${messageOffer.deliveryInDays}`) > 1 ? 's' : ''}Delivery
        </div>
        <div className="relative top-[5%] mr-3 flex flex-row justify-end gap-4">
          <ChatOfferButton
            className={`rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base ${
              messageOffer.accepted || messageOffer.cancelled
                ? 'cursor-not-allowed bg-red-200 hover:bg-red-200'
                : 'bg-red-500 hover:bg-red-400'
            }`}
            disabled={messageOffer.accepted || messageOffer.cancelled}
            label="Cancel Offer"
            onClick={() => handleUpdateBuyerOffer(`${message.id}`, 'cancelled', messageOffer)}
          />

          {seller && seller.id !== message.sellerId && (
            <ChatOfferButton
              className={`rounded px-6 py-3 text-center text-sm font-bold text-white focus:outline-none md:px-4 md:py-2 md:text-base ${
                messageOffer.accepted || messageOffer.cancelled
                  ? 'cursor-not-allowed bg-sky-200 hover:bg-sky-200'
                  : 'bg-green-400 hover:bg-green-800'
              }`}
              disabled={messageOffer.accepted || messageOffer.cancelled}
              label="Accept Offer"
              onClick={() => handleUpdateBuyerOffer(`${message.id}`, 'accepted', messageOffer)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatOffer;
