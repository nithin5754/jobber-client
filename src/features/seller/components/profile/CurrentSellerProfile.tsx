import { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useEffect, useState } from 'react';

import { IButtonProps, IResponse } from 'src/shared/shared.interface';

import BreadCrumbs from 'src/shared/breadcrumbs/BreadCrumbs';
import { IProfileHeaderProps, IProfileTabsProps, ISeller } from '../../interfaces/seller.interface';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { addSeller, useGetSellerDetails } from '../../reducers/seller.reducer';

import equal from 'react-fast-compare';

import SellerOverview from './components/sellerOverview';
import { useUpdateSellerMutation } from '../../services/seller.service';
import { useParams } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';

const SellerButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const ProfileHeader: LazyExoticComponent<FC<IProfileHeaderProps>> = lazy(
  () => import('src/features/seller/components/profile/components/ProfileHeader')
);

const SellerProfileTabs: LazyExoticComponent<FC<IProfileTabsProps>> = lazy(
  () => import('src/features/seller/components/profile/components/ProfileTabs')
);

const CurrentSellerProfile: FC = (): ReactElement => {
  const seller = useAppSelector(useGetSellerDetails);

  const dispatch = useAppDispatch();

  const [sellerProfile, setSellerProfile] = useState<ISeller>(seller);

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [type, setType] = useState<string>('OverView');

  const [updateSeller,{isLoading}]=useUpdateSellerMutation()
const {sellerId}=useParams()


  const onUpdateSeller = async (): Promise<void> => {
    try {
      const response: IResponse = await updateSeller({ sellerId: `${sellerId}`, seller: sellerProfile }).unwrap();
      dispatch(addSeller(response.seller));
      setSellerProfile(response.seller as ISeller);
      setShowEdit(false);
      showSuccessToast('Seller profile updated successfully.');
    } catch (error) {
      showErrorToast('Error updating profile.');
    }
  };

  useEffect(() => {
    const isEqual: boolean = equal(sellerProfile, seller);

    setShowEdit(isEqual);
  }, [seller, sellerProfile]);

  return (
    <div className="relative w-full pb-6">
      <BreadCrumbs breadCrumbItems={['Seller', `${seller?.username}`]} />

 {
  isLoading?(
    <CircularPageLoader/>
  ):(
    <div className="container mx-auto px-2 md:px-0">
    <div className="my-2 flex h-8 justify-end md:h-10">
      {!showEdit && (
        <div>
          <SellerButton
            className="md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2"
            label="Update"
            onClick={onUpdateSeller}
          />
          &nbsp;&nbsp;
          <SellerButton
            className="md:text-md rounded bg-red-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-red-500 focus:outline-none md:py-2"
            label="Cancel"
            onClick={() => {
              setShowEdit(false);
              setSellerProfile(seller);
              dispatch(addSeller(seller));
            }}
          />
        </div>
      )}
    </div>
    <Suspense fallback={'loading..'}>
      <ProfileHeader showEditIcons={true} sellerProfile={sellerProfile} setSellerProfile={setSellerProfile} showHeaderInfo={true} />
    </Suspense>
    <div className="my-4 cursor-pointer">
      <Suspense>
        <SellerProfileTabs type={type} setType={setType} />
      </Suspense>
    </div>

    <div className="flex flex-wrap bg-white p-5 ">
      {type === 'OverView' && <SellerOverview showEditIcons={true} sellerProfile={sellerProfile} setSellerProfile={setSellerProfile} />}
      {type === 'Active Gigs' && <div className="">Seller Active Gigs</div>}
      {type === 'Reviews & Ratings' && <div className="">Seller Reviews And Ratings</div>}
    </div>
  </div>
  )
 }
    </div>
  );
};
export default CurrentSellerProfile;
