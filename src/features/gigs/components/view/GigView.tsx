import StickyBox from "react-sticky-box"
import StarRating from "src/shared/rating/StarRating"
import { useGetGigByIdQuery, useGetMoreGigsLikeThisQuery } from "../../service/gig.service";
import { useParams } from "react-router-dom";
import {  useGetSellerBySellerIdQuery } from "src/features/seller/services/seller.service";
import { FC, ReactElement,  useRef } from "react";
import { ISellerGig } from "../../interface/gigi.interface";

import { ISeller } from "src/features/seller/interfaces/seller.interface";
import { emptyGigData, emptySellerData } from "src/shared/utils/static.data";
import { rating, shortLongNumbers } from "src/shared/utils/utils.service";
import { CLOUDINARY_PICTURE_URL } from "src/shared/utils/constant.api";
import CircularPageLoader from "src/shared/page-loader/CircularPageLoader";
import { GigContext } from "../../context/gig.context";
import GigVewRight from "./components/GigVewRight";
import GigViewLeft from "./components/GigViewLeft";
import TopGigViews from "src/shared/gigs/TopGigViews";



const GigView:FC = ():ReactElement => {
  const {gigId,sellerId}=useParams()

  const { data: gigData, isSuccess: isGigDataSuccess, isLoading: isGigLoading } = useGetGigByIdQuery(`${gigId}`);

  const { data: sellerData, isSuccess: isSellerDataSuccess, isLoading: isSellerLoading } = useGetSellerBySellerIdQuery(sellerId as string);

  
  const {data:moreLikeData,isSuccess:isMoreGigsSuccess}=useGetMoreGigsLikeThisQuery(`${gigId}`)  



  
  
  const isLoading=isGigLoading&&isSellerLoading
  
  const gig=useRef<ISellerGig>(emptyGigData)
  const seller=useRef<ISeller>(emptySellerData)
  const moreGigs = useRef<ISellerGig[]>([]);

  
  if(isGigDataSuccess){
    gig.current=gigData.gig as ISellerGig
  }

  if(isSellerDataSuccess){
    seller.current=sellerData?.seller as ISeller
  }

  if (isMoreGigsSuccess) {
    moreGigs.current = moreLikeData.gigArray as ISellerGig[];
  }

  return (
 <>
 {
  isLoading?(<CircularPageLoader/>):(

    <>
    {
      gig&&seller&&(
        <main className="max-w-8xl container mx-auto mt-8">
        <h2 className="mb-4 px-4 text-xl font-bold text-[#404145] lg:text-3xl">{gig.current.title}</h2>
        <div className="mb-4 flex flex-row gap-x-2 px-4">
            <img className="flex h-8 w-8 self-center rounded-full object-cover"
                src={CLOUDINARY_PICTURE_URL(gig.current.profilePicture as string)} alt="" />
            <span className="flex self-center font-extrabold">{gig.current.username}</span>
            <>
                  {gig.current.ratingSum && gig.current.ratingsCount && gig.current.ratingSum >= 1 && gig.current.ratingsCount >= 1 ? (
                    <>
                      <span className="flex self-center">|</span>
                      <div className="flex w-full gap-x-1 self-center">
                        <div className="mt-1 w-20 gap-x-2">
                          <StarRating value={rating(gig.current.ratingSum / gig.current.ratingsCount)} size={14} />
                        </div>
                        <div className="ml-2 mt-[1px] flex gap-1 text-sm">
                          <span className="text-orange-400">{rating(gig.current.ratingSum / gig.current.ratingsCount)}</span>
                          <span className="">({shortLongNumbers(gig.current.ratingsCount)})</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
        </div>
     <GigContext.Provider value={{gig:gig.current,seller:seller.current,isLoading:isGigLoading,isSuccess:isGigDataSuccess}}>
     <div className="flex flex-wrap">
            <div className="order-last w-full p-4 lg:order-first lg:w-2/3">
              <GigViewLeft/>
            </div>

    <div className="w-full p-4  lg:w-1/3 ">
                <StickyBox offsetTop={10} offsetBottom={10}>
                <GigVewRight/>
                </StickyBox>
            </div>

           
        </div>
     </GigContext.Provider>
        <div className="m-auto px-6 xl:container md:px-12 lg:px-6">
        <TopGigViews gigs={moreGigs.current} title="Recommended for you" subTitle="" width="w-60" type="home"  />
        </div>
    </main>
      )
     }
    </>
  )
 }
 

 </>
  )
}
export default GigView