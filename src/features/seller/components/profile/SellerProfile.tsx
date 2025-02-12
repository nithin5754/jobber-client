

import { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useState } from 'react';



import BreadCrumbs from 'src/shared/breadcrumbs/BreadCrumbs';
import { IProfileHeaderProps, IProfileTabsProps } from '../../interfaces/seller.interface';



import SellerOverview from './components/sellerOverview';
import { useGetSellerBySellerIdQuery } from '../../services/seller.service';
import { useParams } from 'react-router-dom';

import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';
import GigsCardDisplay from 'src/shared/gigs/GigCardDisplay';
import { useGetGigsBySellerIdQuery } from 'src/features/gigs/service/gig.service';
import { useGetReviewsBySellerIdQuery } from 'src/features/order/services/review.service';
import { IReview } from 'src/features/order/interfaces/review.interface';
import GigReviewOverview from 'src/features/gigs/components/view/components/GigLeft/GigReview';

const ProfileHeader: LazyExoticComponent<FC<IProfileHeaderProps>> = lazy(
  () => import('src/features/seller/components/profile/components/ProfileHeader')
);

const SellerProfileTabs: LazyExoticComponent<FC<IProfileTabsProps>> = lazy(
  () => import('src/features/seller/components/profile/components/ProfileTabs')
);

const SellerProfile: FC = (): ReactElement => {
  
  const [type, setType] = useState<string>('OverView');

  const {sellerId}=useParams()



const {data:sellerData,isLoading}=useGetSellerBySellerIdQuery(`${sellerId}`)


const {data:sellerGigData}=useGetGigsBySellerIdQuery(`${sellerId}`)

const {
  data: sellerReviewsData,
  isSuccess: isGigReviewSuccess
} = useGetReviewsBySellerIdQuery(`${sellerId}`);


let reviews: IReview[] = [];
if (isGigReviewSuccess) {
  reviews = sellerReviewsData.reviews as IReview[];
}

  return (
    <div className="relative w-full pb-6">
      <BreadCrumbs breadCrumbItems={['Seller', `${sellerData&&sellerData?.seller&&sellerData?.seller.username?sellerData.seller?.username:''}`]} />

 {
  isLoading?(
    <CircularPageLoader/>
  ):(
    <div className="container mx-auto px-2 md:px-0">
 
    <Suspense fallback={'loading..'}>
    <ProfileHeader sellerProfile={sellerData?.seller} showHeaderInfo={true} showEditIcons={false} />
    </Suspense>
    <div className="my-4 cursor-pointer">
      <Suspense>
        <SellerProfileTabs type={type} setType={setType} />
      </Suspense>
    </div>

    <div className="flex flex-wrap bg-white p-5 ">
      {type === 'OverView' && <SellerOverview showEditIcons={false} sellerProfile={sellerData?.seller} />}
      {type === 'Active Gigs' &&   <div className="grid gap-x-6 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

{
  sellerGigData?.gigArray&&sellerGigData.gigArray.map((gig:ISellerGig)=>(
 
    <GigsCardDisplay key={gig.id } gig={gig} linkTarget={false} showEditIcon={false}/>
    
  
  ))
}
</div>}
{type === 'Ratings & Reviews' && <GigReviewOverview showRatings={false} reviews={reviews} hasFetchedReviews={true} />}
    </div>
  </div>
  )
 }
    </div>
  );
};
export default SellerProfile;
