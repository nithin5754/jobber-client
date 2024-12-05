import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';

import { Outlet, useParams } from 'react-router-dom';
import { useGetSellerBySellerIdQuery } from '../../services/seller.service';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';
import { IOrder } from 'src/features/order/interfaces/order.interface';
import { ISeller } from '../../interfaces/seller.interface';
const DashBoardHeader: LazyExoticComponent<FC> = lazy(() => import('src/shared/header/components/DashBoardHeader'));

const Seller: FC = (): ReactElement => {
  const { sellerId } = useParams<string>();

  const { data: sellerDetails, isSuccess: isSellerSuccess } = useGetSellerBySellerIdQuery({ sellerId: `${sellerId}` }, { skip: !sellerId });

  const gig: ISellerGig[] = [];
  const pausedGig: ISellerGig[] = [];
  const orders: IOrder[] = [];
  let seller: ISeller | undefined = undefined;


  if(isSellerSuccess){
    seller=sellerDetails.seller
  }

  return (
    <div className="relative w-screen">
      <Suspense fallback={'loading...'}>
        <DashBoardHeader />
      </Suspense>

      <div className="m-auto px-6 w-screen xl:container md:px-12 lg:px-6 relative min-h-screen">
        <Outlet context={{gig,pausedGig,orders,seller}}/>
      </div>
    </div>
  );
};
export default Seller;
