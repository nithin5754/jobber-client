import { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useEffect } from 'react';

import { Outlet, useParams } from 'react-router-dom';
import { useGetSellerBySellerIdQuery } from '../../services/seller.service';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';
import { IOrder } from 'src/features/order/interfaces/order.interface';
import { ISeller } from '../../interfaces/seller.interface';
import { useGetGigsBySellerIdQuery, useGetSellerPausedGigsQuery } from 'src/features/gigs/service/gig.service';

import { useAppDispatch } from 'src/store/store';
import { updateHeader } from 'src/shared/header/reducer/header.reducer';
const DashBoardHeader: LazyExoticComponent<FC> = lazy(() => import('src/shared/header/components/DashBoardHeader'));

const Seller: FC = (): ReactElement => {
  const { sellerId } = useParams<string>();
  let gigs: ISellerGig[] = [];
  let pausedGigs: ISellerGig[] = [];
  const orders: IOrder[] = [];
  let seller: ISeller | undefined = undefined;
  const dispatch=useAppDispatch()

  useEffect(()=>{
    dispatch(updateHeader('sellerData'))
  },[dispatch])

  const { data: sellerDetails, isSuccess: isSellerSuccess } = useGetSellerBySellerIdQuery(`${sellerId}`, { skip: !sellerId });

  const { data: gigsData, isSuccess: gigsSuccess } = useGetGigsBySellerIdQuery(`${sellerId}`, { skip: !sellerId });

  const {data:pausedGigData,isSuccess:pausedSuccess}=useGetSellerPausedGigsQuery(`${sellerId}`, { skip: !sellerId });





  if (isSellerSuccess) {
    seller = sellerDetails.seller;
  }

  if (gigsSuccess) {
    gigs = gigsData.gigArray as ISellerGig[];

  }

  if(pausedSuccess){
 
    pausedGigs=pausedGigData.gigArray as ISellerGig[]
  }


  return (
    <div className="relative w-screen">
      <Suspense fallback={'loading...'}>
        <DashBoardHeader />
      </Suspense>

      <div className="m-auto px-6 w-screen xl:container md:px-12 lg:px-6 relative min-h-screen">
        <Outlet context={{ gigs, pausedGigs, orders, seller }} />
      </div>
    </div>
  );
};
export default Seller;
