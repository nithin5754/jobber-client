import { FC, Fragment, lazy, LazyExoticComponent, ReactElement, Suspense, useEffect, useState } from 'react';

import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { addNewItemSessionStorage, lowerCase, replaceDashWithSpaces } from 'src/shared/utils/utils.service';


import LottieAnimation from 'src/shared/lottie/components/LootieAnimation';

import emptyState from 'src/assets/json/empty.json';
import GigPaginate from 'src/shared/gigs/GigPaginate';
import { useAppDispatch } from 'src/store/store';
import { updateHeader } from 'src/shared/header/reducer/header.reducer';
import { useIndexSearchGigsQuery } from 'src/features/gigs/service/search.service';
import { IGigCardItems, IGigsProps, ISellerGig } from 'src/features/gigs/interface/gigi.interface';
import BudgetDropDown from './components/BudgetDropDown';
import DeliveryTime from './components/DeviveryTime';
import IndexHeader from 'src/shared/header/components/Header';
import CardLoader from 'src/shared/page-loader/CardLoader';
import CardListPageLoader from 'src/shared/page-loader/CardListPageLoader';
import Footer from 'src/shared/footer/Footer';

const GigCardDisplayItem: LazyExoticComponent<FC<IGigCardItems>> = lazy(() => import('src/shared/gigs/GigCardDisplay'));

const IndexGigs: FC<IGigsProps> = ({ type }): ReactElement => {
  const [searchParams] = useSearchParams();
  const { category } = useParams<string>();
  const dispatch = useAppDispatch();

  const ITEM_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState<string>('1');

  if (category) {
    addNewItemSessionStorage('category', JSON.stringify(category));
  }

  useEffect(() => {
    dispatch(updateHeader('home'));
  }, []);

  const updatedSearchParams: URLSearchParams = new URLSearchParams(searchParams);

  const queryType: string =
    type === 'search'
      ? replaceDashWithSpaces(`${updatedSearchParams.toString()}`)
      : `query=${replaceDashWithSpaces(`${lowerCase(`${category}`)}`)}`;

  const {
    data,
    isSuccess,
    isLoading,
    isError,
    isFetching: searchFetching
  } = useIndexSearchGigsQuery({
    query: `${queryType}`,

    page: `${currentPage}`
  });

  useEffect(() => {
    if ((data?.gigArray && data.gigArray.length < 1) || isError) {
      setCurrentPage('1');
    }
  }, [data?.gigArray]);

  const isLoadingGigData: boolean = isLoading || !isSuccess;

  if(isError){
    return <Navigate to="/" />;
  }

  return (
    <div className="  bg-white">
      <>
        <IndexHeader
          navClass={
            'navbar peer-checked:navbar-active fixed top-0 left-0 right-0 z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur  dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none'
          }
        />

     <div className="relative  pb-20 pt-40 lg:pt-44 container mx-auto items-center">
     <h3 className="mb-5 flex gap-3 text-4xl">
          <span className="text-black">Results for</span>
          <strong className="text-black">{type}</strong>
        </h3>
        <div className="mb-4 flex gap-4">
          <BudgetDropDown />
          <DeliveryTime />
        </div>
        {isLoadingGigData || searchFetching ? (
          <div className="flex justify-center m-auto h-[80%]">
            <CardListPageLoader />
          </div>
        ) : (
          <div className="my-5">
            {!data?.gigArray || data?.gigArray?.length < 1 ? (
              <div className="flex justify-center m-auto">
                <LottieAnimation animationData={emptyState} height={400} width={400} />
              </div>
            ) : (
              <>
                <div className="">
                  <span className="font-medium text-[#191a1c]">{data?.gigArray ? data?.gigArray.length : 0} services available</span>
                </div>
                <div className="grid gap-x-6 pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  <>
                    {data.gigArray.map((gig: ISellerGig) => (
                      <Fragment key={gig.id}>
                        <Suspense fallback={<CardLoader />}>
                          <GigCardDisplayItem gig={gig} linkTarget={false} showEditIcon={false} />
                        </Suspense>
                      </Fragment>
                    ))}
                  </>
                </div>
              </>
            )}
          </div>
        )}

        <GigPaginate
          setCurrentPage={setCurrentPage}
          totalSearchGig={data?.totalGigLength ? data.totalGigLength : 0}
          itemPerPage={ITEM_PER_PAGE}
          gigArray={data?.gigArray ?? []}
          currentPage={currentPage}
        />
     </div>
     <Footer/>
      </>
    </div>
  );
};
export default IndexGigs;
