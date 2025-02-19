import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';

import SliderShimmer from 'src/shared/shimmer-ui/sliderShimmer';

import { IFeaturedEdExpertsProps, IHomeProps } from '../interface/home.interfce';
import ShimmerGigsViews from 'src/shared/shimmer-ui/ShimmerGigsViews';
import ShimmerFeaturesEdExperts from 'src/shared/shimmer-ui/ShimmerFeaturesEdExperts';

import { useGetRandomSellersQuery } from 'src/features/seller/services/seller.service';
import { ISeller } from 'src/features/seller/interfaces/seller.interface';
import { useGetGigsByCategoryQuery } from 'src/features/gigs/service/gig.service';
import {  lowerCase } from 'src/shared/utils/utils.service';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';
import TopGigViews from 'src/shared/gigs/TopGigViews';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAppSelector } from 'src/store/store';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';


const HomeSlider: LazyExoticComponent<FC> = lazy(() => import('./HomeSlider'));
const HomeGigsView: LazyExoticComponent<FC<IHomeProps>> = lazy(() => import('./HomeGigsView'));

const HomeFeaturedEdExperts: LazyExoticComponent<FC<IFeaturedEdExpertsProps>> = lazy(() => import('./HomeFeaturedEdExperts'));

const Home: FC = (): ReactElement => {
  const authUser: IAuthUser = useAppSelector(useAuthDetails);


  let sellers: ISeller[] = [];

  let categoryGigs: ISellerGig[] = [];

  const { data: randomSellerData, isSuccess: randomSellersSuccess } = useGetRandomSellersQuery('10');
  const { data: categoryData, isSuccess: isCategorySuccess } = useGetGigsByCategoryQuery(`${authUser.username}`, {
    refetchOnMountOrArgChange: true
  });

  if (randomSellersSuccess && randomSellerData && randomSellerData.sellerArray) {
    sellers = randomSellerData.sellerArray;
  }

  if (isCategorySuccess) {
    categoryGigs = categoryData.gigArray as ISellerGig[];
  } 
  return (
    <div className="m-auto px-6 w-screen min-h-screen xl:container md:px-12 lg:px-6  ">
      <Suspense fallback={<SliderShimmer />}>
        <HomeSlider />
      </Suspense>

      {isCategorySuccess && categoryGigs.length > 0 ? (
        <Suspense fallback={<ShimmerGigsViews />}>
          <TopGigViews
            gigs={categoryGigs}
            title="Top rated services in"
            subTitle={`Highest rated talents for all your ${lowerCase(categoryGigs[0].categories)} needs.`}
            category={categoryGigs[0].categories}
            width="w-72"
            type="home"
          />
          <HomeGigsView
            gigs={categoryGigs}
            title={'Because you viewed a gigs on  '}
            category={categoryGigs[0]?.categories ?? ''}
            subTitle=""
          />
        </Suspense>
      ) : (
        <></>
      )}

      <Suspense fallback={<ShimmerFeaturesEdExperts />}>
        <HomeFeaturedEdExperts sellers={sellers} />
      </Suspense>
    </div>
  );
};
export default Home;
