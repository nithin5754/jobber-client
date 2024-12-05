import { LazyExoticComponent, FC, lazy, Suspense } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { IButtonProps } from 'src/shared/shared.interface';

import { IProfileHeaderProps, ISeller, SellerContextType } from '../../interfaces/seller.interface';
import { useAppDispatch } from 'src/store/store';
import { updateHeader } from 'src/shared/header/reducer/header.reducer';

const DashBoardMain: LazyExoticComponent<FC> = lazy(() => import('src/features/seller/components/dashboard/components/DashBoardMain'));

const SellerDashboardButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const ProfileHeader: LazyExoticComponent<FC<IProfileHeaderProps>> = lazy(
  () => import('src/features/seller/components/profile/components/ProfileHeader')
);

const SellerDashBoard = () => {
  const { seller } = useOutletContext<SellerContextType>();
  const dispatch = useAppDispatch();
  return (
    <div className="container mx-auto px-2 md:px-0">
      <div className="mt-10 flex flex-col justify-between gap-y-4">
        <Suspense fallback={'loading...'}>
          <ProfileHeader showEditIcons={false} sellerProfile={seller as ISeller} showHeaderInfo={false} />
        </Suspense>
        <div className="self-end">
          <Suspense fallback={'loading...'}>
            <SellerDashboardButton
              onClick={() => dispatch(updateHeader('home'))}
              className="bg-green-transparent w-full rounded-md text-center text-xs font-bold text-white focus:outline-none md:px-3 md:py-2 md:text-sm md:text-white bg-customViolet hover:bg-customPurple hover:md:text-white"
              label={<Link to={`/manage_gigs/new/${seller?.id}`}>Create a new gig</Link>}
            />
          </Suspense>
        </div>
      </div>
  <Suspense fallback='loading...'>
  <DashBoardMain />
  </Suspense>
    </div>
  );
};
export default SellerDashBoard;
