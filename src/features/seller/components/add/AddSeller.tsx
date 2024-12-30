import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { FC, FormEvent, lazy, LazyExoticComponent, ReactElement, Suspense, useEffect, useState } from 'react';
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
  ISeller,
  ISkillProps,
  ISocialLinksProps
} from 'src/features/seller/interfaces/seller.interface';

import { IBreadCrumbProps, IButtonProps, IResponse } from 'src/shared/shared.interface';

import { useSellerSchema } from '../../hooks/useSellerSchema.Validation';
import { filter } from 'lodash';
import { useCreateSellerMutation } from '../../services/seller.service';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IBuyer } from 'src/features/buyer/interfaces/buyer.interfaces';

import { addBuyer, useGetBuyerDetails } from 'src/features/buyer/reducer/buyer.reducer';
import { addSeller } from '../../reducers/seller.reducer';
import { deleteFromLocalStorage, lowerCase } from 'src/shared/utils/utils.service';

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

const SellerCreateButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));

const AddSeller: FC = (): ReactElement => {
  useEffect(() => {
    return () => {
      deleteFromLocalStorage('becomeASeller');
    };
  }, []);

  const [createSeller, { isLoading }] = useCreateSellerMutation();

  const dispatch = useAppDispatch();
  const navigation: NavigateFunction = useNavigate();
  const buyer: IBuyer = useAppSelector(useGetBuyerDetails);
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
      level: 'Level'
    }
  ]);

  const [socialFields, setSocialFields] = useState<string[]>(['']);

  const [certificatesFields, setCertificatesFields] = useState<ICertificate[]>([
    {
      from: '',
      name: '',
      year: 'Year'
    }
  ]);

  const [schemaValidation, personalInfoErrors, experienceErrors, educationErrors, skillsErrors, languagesErrors] = useSellerSchema({
    personalInfo,
    experienceFields,
    educationFields,
    skillsFields,
    languageFields
  });

  const errors: (string | IPersonalInfoData | IExperience | IEducation | ILanguage)[] = [
    ...personalInfoErrors,
    ...experienceErrors,
    ...educationErrors,
    ...skillsErrors,
    ...languagesErrors
  ];

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const isValid: boolean = await schemaValidation();

      if (isValid) {
        const skills: string[] = filter(skillsFields, (skill: string) => skill !== '') as string[];
        const socialLinks: string[] = filter(socialFields, (item: string) => item !== '') as string[];
        const certificates: ICertificate[] = certificatesFields.map((item: ICertificate) => {
          item.name !== '' && item.year !== '' && item.from;
          return item;
        });
        const sellerData: ISeller = {
          fullName: personalInfo.fullName,
          description: personalInfo.description,
          oneliner: personalInfo.oneliner,
          skills,
          languages: languageFields,
          responseTime: parseInt(personalInfo.responseTime, 10),
          experience: experienceFields,
          education: educationFields,
          socialLinks,
          certificates
        };

        const updateBuyer: IBuyer = { ...buyer, isSeller: true };

        const result: IResponse = await createSeller(sellerData).unwrap();

        dispatch(addBuyer(updateBuyer));
        dispatch(addSeller(result.seller));
        navigation(`/seller_profile/${lowerCase(authUser?.username as string)}/${result.seller?.id as string}/edit`);
      }
    } catch (error) {
      console.log('seller create error', error);
    }
  };
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
          {errors.length > 0 ? (
            <div className="text-red-400">{`You have ${errors.length} error${errors.length > 1 ? 's' : ''}`}</div>
          ) : (
            <></>
          )}
          <Suspense fallback={'loading...'}>
            <PersonalInfoComponents personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} personalInfoErrors={personalInfoErrors} />

            <SellerExperienceComponents
              experienceFields={experienceFields}
              setExperienceFields={setExperienceFields}
              experienceErrors={experienceErrors}
            />

            <SellerEductionField
              educationFields={educationFields}
              setEducationFields={setEducationFields}
              educationErrors={educationErrors}
            />

            <SellerSkillsFields skillsFields={skillsFields} setSkillsFields={setSkillsFields} skillsErrors={skillsErrors} />

            <SellerLanguageFields languageFields={languageFields} setLanguageFields={setLanguageFields} languagesErrors={languagesErrors} />

            <SellerCertificateFields certificatesFields={certificatesFields} setCertificatesFields={setCertificatesFields} />

            <SellerSocialLinksFields socialFields={socialFields} setSocialFields={setSocialFields} />
            <div className="flex just p-6">
              <SellerCreateButton
                className="rounded bg-customPurple px-8 text-center text-sm font-bold text-white hover:bg-customViolet focus:outline-none md:py-3 md:text-base"
                label="Create Profile"
                onClick={handleSubmit}
              />
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default AddSeller;
