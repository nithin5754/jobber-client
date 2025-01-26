import { LazyExoticComponent, FC, lazy, useContext, useState } from 'react';
import { FaRegClock, FaArrowRight } from 'react-icons/fa';
import { createSearchParams, NavigateFunction, useNavigate } from 'react-router-dom';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import { GigContext } from 'src/features/gigs/context/gig.context';
import { IOffer } from 'src/features/order/interfaces/order.interface';
import ApprovalModal from 'src/shared/modal/ApprovalModal';
import { IApprovalModalContent } from 'src/shared/modal/interfaces/modal.interface';
import { IButtonProps } from 'src/shared/shared.interface';
import { useAppSelector } from 'src/store/store';


const GigPackageButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));

const GigPackage = () => {
  const authUser:IAuthUser=useAppSelector(useAuthDetails)
const {gig}=useContext(GigContext)

const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
const [showModal, setShowModal] = useState<boolean>(false);
const navigate: NavigateFunction = useNavigate();



const continueToCheck=()=>{
  const deliveryInDays:number=parseInt(gig.expectedDelivery.split(' ')[0]);
  const newDate:Date=new Date()
  newDate.setDate(newDate.getDate()+deliveryInDays)

  const offerParams:IOffer={
    gigTitle: gig.title,
    price: gig.price,
    description: gig.description,
    deliveryInDays,
    oldDeliveryDate: `${newDate}`,
    newDeliveryDate: `${newDate}`,
    accepted: false,
    cancelled: false
  }

  navigate(`/gig/checkout/${gig.id}?${createSearchParams({offer:JSON.stringify(offerParams)})}`,{state:gig})
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
        <h4 className="font-bold">${gig.price}</h4>
    </div>
    <ul className="mb-0 list-none px-4 py-2">
        <li className="flex justify-between">
            <div className="ml-15 flex w-full pb-3">
                <div className="text-base font-bold">{gig.basicTitle}</div>
            </div>
        </li>
        <li className="flex justify-between">
            <div className="ml-15 flex w-full pb-4">
                <div className="text-sm font-normal">{gig.basicDescription}</div>
            </div>
        </li>
        <li className="flex justify-between">
            <div className="ml-15 flex w-full pb-3">
                <FaRegClock className="flex self-center" /> <span className="ml-3 text-sm font-semibold">{gig.expectedDelivery}</span>
            </div>
        </li>

      <li className="flex justify-between">
      <div className="ml-15 flex w-full py-1">
          <GigPackageButton disabled={ authUser.username===gig.username}
              className={`${authUser.username===gig.username ?'text-md flex w-full  justify-between rounded bg-gray-500/30 px-8 py-2 font-bold cursor-none pointer-events-none text-white focus:outline-none':'text-md flex w-full cursor-pointer justify-between rounded bg-customPurple hover:bg-customViolet px-8 py-2 font-bold text-white focus:outline-none'}`}
              label={ <>
              <span className="w-full">Continue</span>
              <FaArrowRight className="flex self-center" />
              </>
              }
              onClick={()=>{
                if(authUser&&!authUser.emailVerified){
       setApprovalModalContent({
        body:'Please Verify email before proceed to Continue',
        btnColor:'bg-customViolet hover:bg-customPurple',
        btnText:'OK',
        header:'Email Verification Notice'
       })

       setShowModal(true)
                }else{
                  continueToCheck()
                }
              }}
              />
      </div>
  </li>
  
    </ul>
</div>
    </>

  )
}
export default GigPackage