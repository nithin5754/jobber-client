import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, Suspense, useState } from 'react';
import { IModalProps } from './interfaces/modal.interface';

import { FaTimes } from 'react-icons/fa';
const OfferModalButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const OfferModalTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));
const OfferModalTextAreaInput: LazyExoticComponent<FC<ITextInputProps>> = lazy(() => import('src/shared/inputs/TextAreaInput'));

const OfferDropDown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));
import ModalBg from './ModalBg';
import { IButtonProps, ITextInputProps, IDropdownProps } from '../shared.interface';
import CircularPageLoader from '../page-loader/CircularPageLoader';
import { useSaveChatMessageMutation } from 'src/features/chat/service/chat.service';
import { expectedGigDelivery, showErrorToast } from '../utils/utils.service';
import { IMessage } from 'src/features/chat/interface/chat.interface';
import { CLOUDINARY_PICTURE_URL } from '../utils/constant.api';

interface ISelectOffer {
  description: string;
  price: string;
  delivery: string;
  deliveryDate: string;
}

const OfferModal: FC<IModalProps> = ({ header, gigTitle, receiver, authUser, singleMessage, cancelBtnHandler }): ReactElement => {
  const [offer, setOffer] = useState<ISelectOffer>({
    description: '',
    price: '',
    delivery: 'Expected Delivery',
    deliveryDate: ''
  });

  const [saveChatMessage] = useSaveChatMessageMutation();

  const sendGigOffer = async (): Promise<void> => {
         try {
          const customMsg: IMessage = {
            conversationId: `${singleMessage?.conversationId}`,
            hasConversationId: true,
            body: "Here's your custom offer",
            gigId: singleMessage?.gigId,
            sellerId: singleMessage?.sellerId,
            buyerId: singleMessage?.buyerId,
            senderUsername: `${authUser?.username}`,
            senderPicture: `${CLOUDINARY_PICTURE_URL(`${authUser?.profilePicture}`)}`,
            receiverUsername: receiver?.username,
            receiverPicture: receiver?.profilePicture,
            isRead: false,
            hasOffer: true,
            offer: {
              gigTitle: `${gigTitle}`,
              price: parseInt(offer.price),
              description: offer.description,
              deliveryInDays: parseInt(offer.delivery),
              oldDeliveryDate: offer.deliveryDate,
              newDeliveryDate: offer.deliveryDate,
              accepted: false,
              cancelled: false
            }
          };
      
          if (customMsg && offer) {
            await saveChatMessage(customMsg).unwrap();
            if(cancelBtnHandler){
              cancelBtnHandler()
            }
          }
         } catch (error) {    
          showErrorToast('Error sending gig offer.')
         }
  };

  return (
    <ModalBg>
      <Suspense fallback={<CircularPageLoader />}>
        <div className="fixed bottom-0 left-0 right-0 top-32  z-[30] flex w-full items-center justify-center">
          <div className="relative bottom-auto left-auto right-auto top-auto max-h-[90vh] min-w-[500px] bg-white p-4">
            <div className="relative px-5 py-5">
              <div className="flex justify-between text-2xl font-bold ">
                <h1 className="flex w-full justify-center">{header}</h1>
                <OfferModalButton
                  className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
                  role={'button'}
                  onClick={cancelBtnHandler}
                  label={<FaTimes className="" />}
                />
              </div>
            </div>

            <div className="relative mb-16 px-5">
              <div className="py-4">
                <label htmlFor="username" className="text-[20px] font-medium leading-tight tracking-normal">
                  {gigTitle}
                </label>
              </div>
              <div>
                <label htmlFor="description" className="text-sm font-bold leading-tight tracking-normal">
                  Description<sup className="top-[-0.1em] text-base text-red-500">*</sup>
                </label>
                <OfferModalTextAreaInput
                  className="border-grey mb-1 w-full rounded border p-2.5 text-sm font-normal text-gray-600 focus:outline-none"
                  placeholder="Write a description..."
                  name="description"
                  value={offer.description}
                  onChange={(e: ChangeEvent) => setOffer({ ...offer, description: (e.target as HTMLInputElement).value })}
                  rows={5}
                />
              </div>
              <div>
                <label htmlFor="price" className="text-sm font-bold leading-tight tracking-normal">
                  Price<sup className="top-[-0.1em] text-base text-red-500">*</sup>
                </label>
                <div className="relative mb-5 mt-2">
                  <OfferModalTextInput
                    id="price"
                    name="price"
                    type="number"
                    value={offer.price}
                    onChange={(e: ChangeEvent) => {
                      const value: string = (e.target as HTMLInputElement).value;
                      setOffer({ ...offer, price: parseInt(value) > 0 ? value : '' });
                    }}
                    className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                    placeholder="Enter custom price"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="country" className="text-sm font-bold leading-tight tracking-normal">
                  Delivery<sup className="top-[-0.1em] text-base text-red-500">*</sup>
                </label>
                <div id="country" className="relative mb-5 mt-2">
                  <OfferDropDown
                    text={offer.delivery}
                    maxHeight="200"
                    mainClassNames="absolute bg-white z-50"
                    showSearchInput={false}
                    values={expectedGigDelivery()}
                  onClick={(item: string) => {
                    const deliveryInDays: number = parseInt(item);
                    const newDate: Date = new Date();
                    newDate.setDate(newDate.getDate() + deliveryInDays);
                    setOffer({ ...offer, deliveryDate: `${newDate}`, delivery: item });
                  }}  
                  />
                </div>
              </div>
            </div>

            <div className="px-5 py-4">
              <div className="ml-2 flex w-full justify-center text-sm font-medium">
                <OfferModalButton
                  className="rounded bg-sky-500 px-6 py-3 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:px-4 md:py-2 md:text-base"
                  disabled={!offer.description || !offer.delivery || !offer.deliveryDate || !offer.price}
                  onClick={sendGigOffer}
                  label="Send Offer"
                />
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </ModalBg>
  );
};
export default OfferModal;
