import { FC, lazy, LazyExoticComponent, ReactElement, Suspense} from "react"
import { IFeaturedEdExpertsProps } from "../interface/home.interfce"
import { Link } from "react-router-dom"



import {  CiSquareMore } from "react-icons/ci"
  import { IStartRatingProps } from "src/shared/shared.interface"

import { ISeller } from "src/features/seller/interfaces/seller.interface"
import { CLOUDINARY_PICTURE_URL } from "src/shared/utils/constant.api"
import { rating } from "src/shared/utils/utils.service"


const StarRating:LazyExoticComponent<FC<IStartRatingProps>>=lazy(()=>import("src/shared/rating/StarRating"))


const HomeFeaturedEdExperts:FC<IFeaturedEdExpertsProps> = ({sellers}):ReactElement => {



  return (
    <div className="mx-auto my-8 flex flex-col w-full">
    <div className="flex w-full flex-col justify-between self-center">
        <h2 className="flex self-center text-base font-bold md:text-2xl lg:text-3xl">Featured Experts</h2>
        <h4 className="pt-1 text-center text-sm md:text-base lg:text-lg">Work with talented people for the best possible
            result.</h4>
    </div>
    <div className="mt-6">
        <div className="grid gap-8 pt-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sellers&&sellers.map((seller:ISeller) => {
                return (
                    <div key={seller.id} className="relative w-full rounded-lg border border-grey bg-white shadow">
                    <div className="absolute top-0 right-5 mt-4 flex space-x-3 md:mt-6">
                         <Link to={`/seller_profile/${seller.username}/${seller.id}/view`}
                             className="rounded bg-gray-400 transition-all  text-center text-sm font-bold text-white hover:bg-gray-500 focus:outline-none ">
                           <CiSquareMore size={24} />
                         </Link>
                     </div>
                 <div className="flex flex-col items-center pb-10 pt-5">
                     <img className="mb-3 h-24 w-24 rounded-full shadow-lg"
                         src={CLOUDINARY_PICTURE_URL(`${seller.profilePublicId}`)} alt="Profile image" />
                     <h5 className="mb-1 xl:text-xl font-medium text-gray-900 ">{seller.fullName}</h5>
                     <span className="text-sm w-[90%] mb-1 text-gray-500 text-center dark:text-gray-500">{seller.oneliner}</span>
                     <div className="flex justify-center w-full gap-x-1 self-center h-6">
                         <div className="mt-1 w-24 gap-x-2 ">
                            {
                              seller&& seller.ratingSum&&seller.ratingsCount &&(
                                <Suspense fallback={'loading...'}>
                                <StarRating value={rating(seller.ratingSum / seller?.ratingsCount)} size={14} />
                                </Suspense>
                               )
                            }
      
                         </div>
                         <div className="ml-2 flex self-center gap-1 rounded bg-customPurple px-1 text-xs">
                             <span className="font-bold text-white">
                                 {seller.ratingSum}
                             </span>
                         </div>

                     </div>
                
                 </div>
             </div>
                )
            })}
        </div>
    </div>
</div>
  )
}
export default HomeFeaturedEdExperts