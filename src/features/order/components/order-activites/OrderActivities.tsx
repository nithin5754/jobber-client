import { FC, forwardRef, ForwardRefExoticComponent, ReactElement, RefAttributes, useState } from 'react';
import { TimeAgo } from 'src/shared/utils/date.utils';
import { DivElementRefType, IOrderActivitiesProps } from '../../interfaces/order.interface';
import { OrderContext } from '../../context/OrderContext';
import OrderPlaced from './components/OrderPlaced';
import OrderExtension from './components/OrderExtension';
import OrderDelivered from './components/OrderDelivered';
import ChatBox from 'src/features/chat/components/chatBox/ChatBox';
import { IChatBuyerProps, IChatSellerProps } from 'src/features/chat/interface/chat.interface';
import OrderReview from './components/OrderReview';
import { CLOUDINARY_PICTURE_URL } from 'src/shared/utils/constant.api';

const OrderActivities: ForwardRefExoticComponent<Omit<IOrderActivitiesProps, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef<
  DivElementRefType,
  IOrderActivitiesProps
>((props, ref) => {
  const {authUser,order,viewDeliveryBtnClicked}=props
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const chatSeller: IChatSellerProps = {
    username: `${order.sellerUsername}`,
    id: `${order.sellerId}`,
    profilePicture: `${CLOUDINARY_PICTURE_URL(order.sellerImage)}`,
    responseTime: 1
  };

  console.log("order",order)
  const chatBuyer: IChatBuyerProps = {
    username: `${order.buyerUsername}`,
    id: `${order.buyerId}`,
    profilePicture: `${CLOUDINARY_PICTURE_URL(order.buyerImage)}`
  };
  return (
    <div className="mb-3 mt-4 rounded-[4px] bg-white p-3">
      <div className="flex">
    
        <div className="my-5 rounded-full bg-[#e8e8e8] px-4 py-2 text-center text-sm font-bold">
            {
              TimeAgo.chatMessageTransform(`${order.dateOrdered}`)
            }
        </div>
      </div>
      <OrderContext.Provider value={{order,authUser,viewDeliveryBtnClicked}}>
<OrderPlaced/>
<OrderExtension/>
<OrderDelivered ref={ref}/>
<OrderReview />
      </OrderContext.Provider>

      <div className="px-3 pt-2 flex">
          if you need to contact the {
            order.buyerUsername===authUser.username ? 'seller':'buyer'
          },
        <div onClick={() => setShowChatBox((item: boolean) => !item)} className="px-2 text-blue-500 cursor-pointer hover:underline">
          Go to Inbox
        </div>
      </div>
      {showChatBox&&<ChatBox seller={chatSeller} buyer={chatBuyer} gigId={order.gigId} onClose={()=>setShowChatBox(false)}/>}
    </div>
  );
})


export default OrderActivities

