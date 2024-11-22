import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import { useAppSelector } from 'src/store/store';
import { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useState } from 'react';
import {
  ICertificate,
  ICertificateProps,
  IEducation,
  IEducationProps,
  IExperience,
  IExperienceProps,
  ILanguage,
  ILanguageProps,
  IPersonalInfoData,
  IPersonalInfoProps,
  ISkillProps,
  ISocialLinksProps
} from 'src/features/seller/interfaces/seller.interface'

import { IBreadCrumbProps } from 'src/shared/shared.interface';
import { v4 as uuidV4 } from 'uuid';


const SellerBreadCrumbs: LazyExoticComponent<FC<IBreadCrumbProps>> = lazy(() => import('src/shared/breadcrumbs/BreadCrumbs'));
const SellerCircularPageLoader: LazyExoticComponent<FC> = lazy(() => import('src/shared/page-loader/CircularPageLoader'));

const PersonalInfoComponents: LazyExoticComponent<FC<IPersonalInfoProps>> = lazy(
  () => import('src/features/seller/components/add/components/PersonalInfo')
);
const SellerExperienceComponents: LazyExoticComponent<FC<IExperienceProps>> = lazy(
  () => import('src/features/seller/components/add/components/SellerExperence')
);
const SellerEductionField: LazyExoticComponent<FC<IEducationProps>> = lazy(
  () => import('src/features/seller/components/add/components/SellerEductionField')
);
const SellerSkillsFields: LazyExoticComponent<FC<ISkillProps>> = lazy(
  () => import('src/features/seller/components/add/components/SellerSkillsField')
);
const SellerLanguageFields: LazyExoticComponent<FC<ILanguageProps>> = lazy(
  () => import('src/features/seller/components/add/components/SellerLangFields')
);
const SellerSocialLinksFields: LazyExoticComponent<FC<ISocialLinksProps>> = lazy(
  () => import('src/features/seller/components/add/components/SellerSocialFields')
);
const SellerCertificateFields: LazyExoticComponent<FC<ICertificateProps>> = lazy(
  () => import('src/features/seller/components/add/components/SellerCertificate')
);

const AddSeller: FC = (): ReactElement => {
  const authUser: IAuthUser | undefined = useAppSelector(useAuthDetails);
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfoData>({
    description: '',
    fullName: '',
    oneliner: '',
    profilePicture: '',
    responseTime: ''
  });

  const [experienceFields, setExperienceFields] = useState<IExperience[]>([
    {
      id: uuidV4(),
      title: '',
      company: '',
      startDate: 'Start Year',
      endDate: 'End Year',
      description: '',
      currentlyWorkingHere: false
    }
  ]);

  const [educationFields, setEducationFields] = useState<IEducation[]>([
    {
      id: uuidV4(),
      country: 'Country',
      university: '',
      title: 'Title',
      major: '',
      year: 'Year'
    }
  ]);

  const [skillsFields, setSkillsFields] = useState<string[]>(['']);

  const [languageFields, setLanguageFields] = useState<ILanguage[]>([
    {
      language: '',
      level: 'Level',
      id: uuidV4()
    }
  ]);

  const [socialFields, setSocialFields] = useState<string[]>(['']);

  const [certificatesFields, setCertificatesFields] = useState<ICertificate[]>([
    {
      id: uuidV4(),
      from: '',
      name: '',
      year: 'Year'
    }
  ]);

  const isLoading = false;
  return (
    <div className="relative w-full">
      <Suspense fallback={'loading...'}>
        <SellerBreadCrumbs breadCrumbItems={['Seller', 'Create Profile']} />
      </Suspense>

      <div className="container  mx-auto my-5 overflow-hidden px-2 pb-12 md:px-0">
        {isLoading && (
          <Suspense fallback={'loading..'}>
            <SellerCircularPageLoader />
          </Suspense>
        )}
        {authUser && !authUser.emailVerified && (
          <div className="absolute left-0 top-0 z-50 flex h-full w-full justify-center bg-white/[0.8] text-sm font-bold md:text-base lg:text-xl">
            <span className="mt-20">Please verify your email.</span>
          </div>
        )}

        <div className="left-0 top-0 z-10 mt-4 block h-full bg-white">
          <Suspense fallback={'loading...'}>
            <PersonalInfoComponents personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} personalInfoErrors={[]} />

            <SellerExperienceComponents experienceFields={experienceFields} setExperienceFields={setExperienceFields} />

            <SellerEductionField educationFields={educationFields} setEducationFields={setEducationFields} educationErrors={[]} />

            <SellerSkillsFields skillsFields={skillsFields} setSkillsFields={setSkillsFields} skillsErrors={[]} />

            <SellerLanguageFields languageFields={languageFields} setLanguageFields={setLanguageFields} languagesErrors={[]} />

            <SellerCertificateFields certificatesFields={certificatesFields} setCertificatesFields={setCertificatesFields} />

            <SellerSocialLinksFields socialFields={socialFields} setSocialFields={setSocialFields} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default AddSeller;
