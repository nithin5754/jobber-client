import { FC, lazy, LazyExoticComponent, ReactElement, useContext, useState } from "react"
import { FaArrowRight } from "react-icons/fa";
import { Link} from "react-router-dom";
import { IAuthUser } from "src/features/auth/interfaces/auth.interface";
import { useAuthDetails } from "src/features/auth/reducers/auth.reducer";
import { IBuyer } from "src/features/buyer/interfaces/buyer.interfaces";
import { useGetBuyerDetails } from "src/features/buyer/reducer/buyer.reducer";
import ChatBox from "src/features/chat/components/chatBox/ChatBox";
import { IChatBuyerProps, IChatSellerProps } from "src/features/chat/interface/chat.interface";
import { GigContext } from "src/features/gigs/context/gig.context";
import { ILanguage } from "src/features/seller/interfaces/seller.interface";
import ApprovalModal from "src/shared/modal/ApprovalModal";
import { IApprovalModalContent } from "src/shared/modal/interfaces/modal.interface";
import StarRating from "src/shared/rating/StarRating";
import { IButtonProps } from "src/shared/shared.interface";
import { CLOUDINARY_PICTURE_URL } from "src/shared/utils/constant.api";
import { TimeAgo } from "src/shared/utils/date.utils";
import { rating, shortLongNumbers } from "src/shared/utils/utils.service";
import { useAppSelector } from "src/store/store";
import { v4 as uuidv4 } from "uuid";

const GigPSellerButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));


const GigSeller:FC = ():ReactElement => {
  const authUser:IAuthUser=useAppSelector(useAuthDetails)
  const {gig,seller}=useContext(GigContext)

  const buyer:IBuyer=useAppSelector(useGetBuyerDetails)
  
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showChatBox, setShowChatBox] = useState<boolean>(false);

  const chatSeller:IChatSellerProps={
    id: `${seller.id}`,
    username: `${seller.username}`,
    profilePicture:CLOUDINARY_PICTURE_URL(`${seller.profilePicture}`),
    responseTime: parseInt(`${seller.responseTime}`)
  }


  const chatBuyer:IChatBuyerProps={
    id: `${buyer.id}`,
    username:`${buyer.username}`,
    profilePicture: CLOUDINARY_PICTURE_URL(`${buyer.profilePicture}`)
  }

  const onclose=()=>{
    setShowChatBox(false)
  }
  
  return (

    <>
          {showModal && (
        <ApprovalModal
          approvalModalContent={approvalModalContent}
          onClick={() => setShowModal(false)}
        hideCancel={true}
        />

      )}
       <div className="border-grey mb-8 border">
    <div className="flex border-b px-4 py-2">
        <h4 className="font-bold">About The Seller</h4>
    </div>
    <div className="mb-0 px-4 pt-2">
        <div className="flex flex-col gap-y-3 md:flex-row md:gap-x-2">
            <img className="flex h-24 w-24 self-center rounded-full object-cover"
                src={CLOUDINARY_PICTURE_URL(seller.profilePicture as string)} alt="" />
            <div className="flex flex-col self-center">
                <Link to={`/seller_profile/${seller.username}/${seller.id}/view`}
                    className="flex cursor-pointer self-center no-underline hover:underline md:block md:self-start">
                <span className="text-base font-bold md:mb-5">{seller.username}</span>
                </Link>
                <span className="flex self-center text-sm md:block md:self-start">{seller.oneliner}</span>
                <div className="flex w-full justify-center pt-1 md:justify-start">
                <div className={`flex w-full justify-center md:justify-start ${seller.ratingsCount === 0 ? 'gap-x-[5.8rem]' : 'gap-x-5'}`}>
                        <div className="flex w-full justify-center gap-x-1 md:justify-start">
                            <div className="mt-1 w-20 gap-x-2">
                            <StarRating value={rating(parseInt(`${seller.ratingSum}`) / parseInt(`${seller.ratingsCount}`))} size={14} />

                            </div>
                            <div className="ml-2 mt-[1px] flex gap-1 text-sm">
                            <span className="">({shortLongNumbers(seller?.ratingsCount)})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr className="border-grey my-3" />
        <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
            <div className="flex flex-col">
                <span className="">From</span>
                <span className="font-bold">{seller.country}</span>
            </div>
            <div className="flex flex-col">
                <span className="">Member since</span>
                <span className="font-bold">{TimeAgo.formatDateToMonthAndYear(`${seller.createdAt}` )}</span>
            </div>
            <div className="flex flex-col">
                <span className="">Avg. resp time</span>
                <span className="font-bold">
                {seller.responseTime} hour{`${seller.responseTime > 1 ? 's' : ''}`}{' '}
                </span>
            </div>
            <div className="flex flex-col">
                <span className="">Languages</span>
                <div className="flex flex-wrap">
                {seller?.languages &&
                  seller?.languages.map((language: ILanguage, index: number) => (
                    <span className="font-bold" key={uuidv4()}>
                      {`${language.language}${index !== seller.languages.length - 1 ? ',' : ''}`}&nbsp;
                    </span>
                  ))}
                </div>
            </div>
        </div>
        <hr className="border-grey my-2" />
        <div className="ml-15 mb-2 flex w-full py-1">
            <GigPSellerButton        disabled={authUser.username === gig.username}
                 className={`${authUser.username===gig.username ?'text-md flex w-full  justify-between rounded bg-gray-500/30 px-8 py-2 font-bold cursor-none pointer-events-none text-white focus:outline-none':'text-md flex w-full cursor-pointer justify-between rounded bg-customPurple hover:bg-customViolet px-8 py-2 font-bold text-white focus:outline-none'}`}
                 label={ <>
                 <span className="w-full">Contact</span>
                 <FaArrowRight className="flex self-center" />
               
                 </>
                 }

                 onClick={() => {
                  if (authUser && !authUser.emailVerified) {
                    setApprovalModalContent({
                      header: 'Email Verification Notice',
                      body: 'Please verify your email before you continue.',
                      btnText: 'OK',
                      btnColor: 'bg-sky-500 hover:bg-sky-400'
                    });
                    setShowModal(true);
                  } else {
                    setShowChatBox((item: boolean) => !item);
                  }
                }}
                />
        </div>
    </div>
   {
    showChatBox? <ChatBox seller={chatSeller} buyer={chatBuyer} gigId={`${gig.id}`} onClose={onclose}/>:<></>
   }
</div>
    </>
 
  )
}
export default GigSeller