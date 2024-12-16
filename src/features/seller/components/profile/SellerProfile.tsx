

import { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useState } from 'react';



import BreadCrumbs from 'src/shared/breadcrumbs/BreadCrumbs';
import { IProfileHeaderProps, IProfileTabsProps, ISeller } from '../../interfaces/seller.interface';
import {  useAppSelector } from 'src/store/store';
import {  useGetSellerDetails } from '../../reducers/seller.reducer';



import SellerOverview from './components/sellerOverview';
import { useGetSellerBySellerIdQuery } from '../../services/seller.service';
import { useParams } from 'react-router-dom';

import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';
import GigsCardDisplay from 'src/shared/gigs/GigCardDisplay';
import { useGetGigsBySellerIdQuery } from 'src/features/gigs/service/gig.service';

const ProfileHeader: LazyExoticComponent<FC<IProfileHeaderProps>> = lazy(
  () => import('src/features/seller/components/profile/components/ProfileHeader')
);

const SellerProfileTabs: LazyExoticComponent<FC<IProfileTabsProps>> = lazy(
  () => import('src/features/seller/components/profile/components/ProfileTabs')
);

const SellerProfile: FC = (): ReactElement => {
  const seller = useAppSelector(useGetSellerDetails);



  const [sellerProfile] = useState<ISeller>(seller);


  const [type, setType] = useState<string>('OverView');


const {sellerId}=useParams()

const {data:sellerData,isLoading}=useGetSellerBySellerIdQuery(sellerId as string)
const {data:sellerGigData}=useGetGigsBySellerIdQuery(`${sellerId}`)






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
      {type === 'OverView' && <SellerOverview showEditIcons={false} sellerProfile={sellerProfile} />}
      {type === 'Active Gigs' &&   <div className="grid gap-x-6 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

{
  sellerGigData?.gigArray&&sellerGigData.gigArray.map((gig:ISellerGig)=>(
 
    <GigsCardDisplay key={gig.id } gig={gig} linkTarget={false} showEditIcon={false}/>
    
  
  ))
}
</div>}
      {type === 'Reviews & Ratings' && <div className="">Seller Reviews And Ratings</div>}
    </div>
  </div>
  )
 }
    </div>
  );
};
export default SellerProfile;
