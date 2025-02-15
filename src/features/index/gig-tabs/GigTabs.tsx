import { FC, ReactElement, useState } from 'react';

import { categories, replaceSpacesWithDash } from 'src/shared/utils/utils.service';

import TopGigsView from './TopGigsView';
import { usePublicCategoryQuery } from '../service/public.service';

import { ICONIC_PROJECT_BORDER_AREA, ICONIC_PROJECT_TEXT_COLOR } from 'src/shared/utils/custom.color';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';

const GigTabs: FC = (): ReactElement => {
  let categoryList: ISellerGig[] = [];
  const [activeTab, setActiveTab] = useState<string>(categories()[0]);
  const { data: categoryGig, isSuccess } = usePublicCategoryQuery({ category: `${activeTab}`  },{refetchOnMountOrArgChange:true});
  if (isSuccess) {
    categoryList = categoryGig.gigArray as ISellerGig[];
    
  }



  return (
    <div className="relative m-auto mt-8 w-screen px-6 xl:container md:px-12 lg:px-6 ">
      <div className="mx-auto flex flex-col px-4 py-8 lg:px-6 lg:py-10 ">
        <div className="flex flex-col text-left">
          <h2 className={`mb-3 text-3xl font-bold ${ICONIC_PROJECT_TEXT_COLOR}`}>A broad selection of services</h2>
          <h4>Choose from a broad selection of services from expert freelancers for your next project.</h4>
        </div>
        <div className="mt-6">
          <ul className="flex  flex-wrap justify-center  gap-5 overflow-x-auto scroll-smooth whitespace-nowrap relative  ">
            {categories()
              .slice(0, 5)
              .map((category: string) => (
                <li
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`w-[200px] min-w-0 cursor-pointer rounded-full py-4 my-4
                                 hover:border-cyan-400 hover:shadow-lg  hover:shadow-cyan-600/20 
                                   dark:bg-gray-800 ${ICONIC_PROJECT_BORDER_AREA} ${ICONIC_PROJECT_TEXT_COLOR} `}
                >
                  <div className="flex justify-center">
                    <span className={`block truncate font-medium ${activeTab === category ? 'text-black' : 'text-white'}`}>{category}</span>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="mt-4 h-full overflow-hidden border px-6 py-6">
          {categoryList.length > 0 ? (
            <>
              <a
                className="mt-10 w-[10%] rounded border border-black px-6 py-3 text-center text-sm font-bold text-black hover:bg-gray-100 focus:outline-none md:px-4 md:py-2 md:text-base"
                href={`/index-search/categories/${replaceSpacesWithDash(activeTab)}`}
              >
                Explore {activeTab}
              </a>
              <div className=" flex mx-auto justify-center flex-wrap gap-2 w-full ">
                <TopGigsView gigs={categoryList} />
              </div>
            </>
          ) : (
            <div className="flex h-96 items-center justify-center text-lg">Information not available at the moment.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GigTabs;
