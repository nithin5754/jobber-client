import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';
import { IHeader } from 'src/shared/header/interface/header.inferface';


const IndexHeader: LazyExoticComponent<FC<IHeader>> = lazy(() => import('src/shared/header/components/Header'));
const IndexHero: LazyExoticComponent<FC> = lazy(() => import('./Hero'));
const IndexGigTabs: LazyExoticComponent<FC> = lazy(() => import('./gig-tabs/GigTabs'));
const IndexHowItWorks: LazyExoticComponent<FC> = lazy(() => import('./HowItWorks'));
const IndexCategories :LazyExoticComponent<FC>=lazy(()=>import( './Categories'))
const Index: FC = (): ReactElement => {
  return (
    <div className="flex flex-col ">
      <Suspense>
        <IndexHeader
          navClass={
            'navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none'
          }
        />
        <IndexHero />
      <IndexGigTabs />
        <IndexHowItWorks />
        <br/>
        <IndexCategories/>
      </Suspense>
    </div>
  );
};
export default Index;
