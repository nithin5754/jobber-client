import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';
import { SellerContext } from 'src/features/seller/context/seller.context';
import { IProfileHeaderProps, ISeller } from 'src/features/seller/interfaces/seller.interface';



const Language: LazyExoticComponent<FC> = lazy(
  () => import('src/features/seller/components/profile/components/overview/language/Language')
);

const Certifications: LazyExoticComponent<FC> = lazy(
  () => import('src/features/seller/components/profile/components/overview/certifications/Certifications')
);

const Description: LazyExoticComponent<FC> = lazy(
  () => import('src/features/seller/components/profile/components/overview/description/Description')
);

const AboutMe: LazyExoticComponent<FC> = lazy(() => import('src/features/seller/components/profile/components/overview/about-me/AboutMe'));

const SocialLinks: LazyExoticComponent<FC> = lazy(
  () => import('src/features/seller/components/profile/components/overview/socialLinks/SocialLinks')
);


const Experience: LazyExoticComponent<FC> = lazy(
  () => import('src/features/seller/components/profile/components/overview/experience/Experience')
);
const Education: LazyExoticComponent<FC> = lazy(
  () => import('src/features/seller/components/profile/components/overview/education/Education')
);

const Skills: LazyExoticComponent<FC> = lazy(
  () => import('src/features/seller/components/profile/components/overview/skills/Skills')
);

const SellerOverview: FC<IProfileHeaderProps> = ({ showEditIcons, sellerProfile, setSellerProfile }): ReactElement => {
  return (
    <SellerContext.Provider value={{ sellerProfile: sellerProfile as ISeller, setSellerProfile, showEditIcons }}>
      <div className="w-full p-4 lg:w-1/3">
        <Suspense fallback={'loading...'}>
          <Language />
        </Suspense>
        <Suspense fallback={'loading...'}>
          <AboutMe />
        </Suspense>
        <Suspense fallback={'loading...'}>
          <SocialLinks />
        </Suspense>
        <Suspense fallback={'loading...'}>
          <Certifications />
        </Suspense>
     
      </div>
      <div className="w-full p-4 lg:w-2/3">
      <Suspense fallback={'loading...'}>
          <Description />
        </Suspense>
        <Suspense fallback={'loading...'}>
        <Experience />
        </Suspense>
        <Suspense fallback={'loading...'}>
        <Education />
        </Suspense>

        <Suspense fallback={'loading...'}>
        <Skills />
        </Suspense>
 
 
      </div>
    </SellerContext.Provider>
  );
};
export default SellerOverview;
