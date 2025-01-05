import { FC, ReactElement } from "react"
import ChatBox from "./chatBox/ChatBox"
import { useAppSelector } from "src/store/store"
import { useGetSellerDetails } from "src/features/seller/reducers/seller.reducer"
import { useGetBuyerDetails } from "src/features/buyer/reducer/buyer.reducer"
import ChatList from "./chatlist/ChatList"



const Chat:FC = ():ReactElement => {
  const seller=useAppSelector(useGetSellerDetails)
  const buyer=useAppSelector(useGetBuyerDetails)

  return (
    <div className="border-grey mx-2 my-5 flex max-h-[90%] flex-wrap border lg:container lg:mx-auto">
    <div className="lg:border-grey relative w-full overflow-hidden lg:w-1/3 lg:border-r">


       <ChatList/>
    </div>

    <div className="relative hidden w-full overflow-hidden md:w-2/3 lg:flex">
      
        <div className="flex w-full items-center justify-center">Select a user to chat with.</div>
    </div>
</div>
  )
}
export default Chat