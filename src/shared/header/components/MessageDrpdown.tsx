import { FC, ReactElement, useEffect, useState } from 'react';
import { IHomeHeaderProps } from '../interface/header.interface';
import { FaRegEnvelope, FaRegEnvelopeOpen, FaEye } from 'react-icons/fa';
import { ISeller } from 'src/features/seller/interfaces/seller.interface';
import { useAppSelector } from 'src/store/store';
import { useGetSellerDetails } from 'src/features/seller/reducers/seller.reducer';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import { Location, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { IMessage } from 'src/features/chat/interface/chat.interface';
import { useGetConversationListQuery, useMarkMessagesAsReadMutation } from 'src/features/chat/service/chat.service';
import {  filter, orderBy } from 'lodash';
import { lowerCase, showErrorToast } from 'src/shared/utils/utils.service';

import { TimeAgo } from 'src/shared/utils/date.utils';
import LottieAnimation from 'src/shared/lottie/components/LootieAnimation';
import emptyBox from 'src/assets/json/empty-box.json'
import { CLOUDINARY_PICTURE_URL } from 'src/shared/utils/constant.api';

const MessageDropdown: FC<IHomeHeaderProps> = ({ setIsMessageDropdownOpen }): ReactElement => {
  const seller: ISeller = useAppSelector(useGetSellerDetails);
  const authUser: IAuthUser = useAppSelector(useAuthDetails);
  const navigate: NavigateFunction = useNavigate();
  const [conversation, setConversation] = useState<IMessage[]>([]);
  const location:Location=useLocation()



  useEffect(()=>{
    const pathList: string[] = location.pathname.split('/');
  if(pathList[1]==='inbox'){
    if(setIsMessageDropdownOpen){
      setIsMessageDropdownOpen(false)
    }
  }

  },[location])

  const { data, isSuccess } = useGetConversationListQuery(`${authUser.username}`, {
    refetchOnMountOrArgChange: true
  });

  const [markMessageAsRead] = useMarkMessagesAsReadMutation();

  useEffect(() => {
    if (isSuccess) {
      const sortedConversation: IMessage[] = orderBy(data.conversations, ['createdAt'], ['desc']) as IMessage[]
      const filterByIsNotReadByReceiver:IMessage[]=filter(sortedConversation,(item:IMessage)=>item.isRead===false)
      setConversation(filterByIsNotReadByReceiver);
    }
  }, [data && data.conversations, isSuccess])

  
const selectInboxMsg=async(message:IMessage):Promise<void>=>{

try {
  const chatUsername:string=(message.receiverUsername !==authUser.username?message.receiverUsername:message.senderUsername) as string 

  navigate(`/inbox/${lowerCase(chatUsername)}/${message.conversationId}`)

  if(message.receiverUsername===seller.username&&!message.isRead){
    const id:string=`${authUser.id}`
   await markMessageAsRead(id).unwrap()
  }
  
} catch (error) {
  showErrorToast('Error occurred')
}
}

  return (
    <div className="border-grey border-grey z-20 flex max-h-[470px] flex-col justify-between rounded border bg-white shadow-md">
      <div className="border-grey block border-b px-4 py-2 text-center font-medium text-gray-700">Inbox</div>
      <div className="h-96 overflow-y-scroll">
        <>
        
        {
          conversation.length>0?(
     <>
     {
      conversation.map((data:IMessage)=>{

        console.log("data ,chat",data)
        return (
          <div onClick={()=>{
            selectInboxMsg(data)
            if(setIsMessageDropdownOpen){
              setIsMessageDropdownOpen(false)
            }
          }}  key={data.id} className="border-grey max-h-[90px] border-b pt-2 text-left hover:bg-gray-50 ">
            <div className="flex px-4">
                    <div className="mt-1 flex-shrink-0">
                      <img
                        className="h-11 w-11 rounded-full object-cover"
                        src={data.receiverUsername !== authUser.username ? CLOUDINARY_PICTURE_URL(`${data.receiverPicture}`) : data.senderPicture}
                        alt={data.receiverUsername !== authUser.username ? data.receiverUsername : data.senderUsername}
                      />
                    </div>
                    <div className="w-full pl-3 pt-1">
                      <div className="flex flex-col text-sm font-normal ">
                        <div className="font-bold leading-none flex justify-between">
                          {data.receiverUsername !== authUser.username ? data.receiverUsername : data.senderUsername}
                          {!data.isRead ? <FaRegEnvelope className="text-sky-400" /> : <FaRegEnvelopeOpen className="text-gray-200" />}
                        </div>
                        <span className="line-clamp-1 pt-1 font-normal leading-4">
                          {data.receiverUsername === authUser?.username ? '' : 'Me: '}
                          {data.body}
                        </span>
                      </div>
                      <div className="mt-1 flex text-[11px]">
                        {data.createdAt && <span className="font-normal text-[#b5b6ba]">{TimeAgo.transform(data.createdAt)}</span>}
                      </div>
                    </div>
                  </div>
        </div>
        )
      })
     }
     </>
          ):(  
            <div className="flex h-full items-center justify-center">
              <LottieAnimation animationData={emptyBox} height={200} width={100}/>
            </div>)
        }
        </>
 
      </div>
      <div onClick={()=>{
        navigate('/inbox') ;
        if(setIsMessageDropdownOpen){
          setIsMessageDropdownOpen(false)
        }
      }} className="flex h-10 cursor-pointer justify-center bg-white px-4 text-sm font-medium text-customViolet hover:text-customPurple">
        <FaEye className="mr-2 h-4 w-4 self-center" />
        <span className="self-center">View all</span>
      </div>
    </div>
  );
};
export default MessageDropdown;
