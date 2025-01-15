import { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useEffect } from 'react';

import { IHeader } from 'src/shared/header/interface/header.interface';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { saveToSessionStorage } from 'src/shared/utils/utils.service';


const IndexHeader: LazyExoticComponent<FC<IHeader>> = lazy(() => import('src/shared/header/components/Header'));
const IndexHero: LazyExoticComponent<FC> = lazy(() => import('./Hero'));
const IndexGigTabs: LazyExoticComponent<FC> = lazy(() => import('./gig-tabs/GigTabs'));
const IndexHowItWorks: LazyExoticComponent<FC> = lazy(() => import('./HowItWorks'));
const IndexCategories :LazyExoticComponent<FC>=lazy(()=>import( './Categories'))
const Index: FC = (): ReactElement => {


  useEffect(()=>{
saveToSessionStorage(JSON.stringify(false),JSON.stringify(''))
  },[])
  return (
    <div className="flex flex-col ">
      <Suspense fallback={<CircularPageLoader/>}>
        <IndexHeader
          navClass={
            'navbar peer-checked:navbar-active fixed top-0 z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur  dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none'
          }
        />
        <IndexHero />
    
      <IndexGigTabs />
        <IndexHowItWorks />
        <br/>
        <IndexCategories/>
      </Suspense>
      {/* <div className="fixed z-50 bottom-0 right-10 lg:w-[250px] ">
            <Alert type={'success'} message={'created the message'}/>
      </div> */}
    </div>
  );
};
export default Index;
