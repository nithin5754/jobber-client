import { FC, Fragment, lazy, LazyExoticComponent, ReactElement, Suspense, useEffect,  useState } from 'react';
import { IGigCardItems, IGigsProps, ISellerGig } from '../../interface/gigi.interface';
import BudgetDropDown from './components/BudgetDropDown';
import DeliveryTime from './components/DeviveryTime';
import { useParams, useSearchParams } from 'react-router-dom';
import { addNewItemSessionStorage,lowerCase, replaceDashWithSpaces } from 'src/shared/utils/utils.service';
import { useSearchGigsQuery } from '../../service/search.service';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import LottieAnimation from 'src/shared/lottie/components/LootieAnimation';

import emptyState from 'src/assets/json/empty.json';
import GigPaginate from 'src/shared/gigs/GigPaginate';


const GigCardDisplayItem: LazyExoticComponent<FC<IGigCardItems>> = lazy(() => import('src/shared/gigs/GigCardDisplay'));

const Gigs: FC<IGigsProps> = ({ type }): ReactElement => {
  const [searchParams] = useSearchParams();
  const { category } = useParams<string>();
  const ITEM_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState<string>('1')

  
if(category){
  addNewItemSessionStorage('category',JSON.stringify(category))
}
  
  
  const updatedSearchParams: URLSearchParams = new URLSearchParams(searchParams);
  
  const queryType: string =
    type === 'search'
    ? replaceDashWithSpaces(`${updatedSearchParams.toString()}`)
    : `query=${replaceDashWithSpaces(`${lowerCase(`${category}`)}`)}`;
    
    const { data, isSuccess, isLoading, isError ,isFetching:searchFetching} = useSearchGigsQuery({
      query: `${queryType}`,
      
      page: `${currentPage}`
  });


  useEffect(()=>{

    if(data?.gigArray&&data.gigArray.length<1||isError){
      setCurrentPage('1')
    }



  },[data?.gigArray])

  const isLoadingGigData:boolean=isLoading||!isSuccess

  return (
    <div className="container mx-auto items-center p-5">
  
      <h3 className="mb-5 flex gap-3 text-4xl">
        <span className="text-black">Results for</span>
        <strong className="text-black">{type}</strong>
      </h3>
      <div className="mb-4 flex gap-4">
        <BudgetDropDown />
        <DeliveryTime />
      </div>
    {
      isLoadingGigData||searchFetching?(
        <div className="flex justify-center m-auto h-[80%]">
          <CircularPageLoader/>

        </div>
      ):(  <div className="my-5">
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
                    <Suspense fallback={<CircularPageLoader />}>
                      <GigCardDisplayItem gig={gig} linkTarget={false} showEditIcon={false} />
                    </Suspense>
                  </Fragment>
                ))}
              </>
            </div>
          </>
        )}
      </div>)
    }


<GigPaginate
    setCurrentPage={setCurrentPage}
    totalSearchGig={data?.totalGigLength ? data.totalGigLength : 0}
    itemPerPage={ITEM_PER_PAGE}
    gigArray={data?.gigArray??[]}
    currentPage={currentPage}
  />

    </div>
  );
};
export default Gigs;
