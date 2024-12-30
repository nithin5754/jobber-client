import { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useRef, useState } from 'react';

import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import BreadCrumbs from 'src/shared/breadcrumbs/BreadCrumbs';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { IButtonProps, IResponse } from 'src/shared/shared.interface';
import { useAppSelector } from 'src/store/store';
import { ICreateGig, IShowGigModal } from '../../interface/gigi.interface';

import {  lowerCase, replaceSpacesWithDash, showErrorToast } from 'src/shared/utils/utils.service';
import equal from 'react-fast-compare';
import { useCreateGigMutation } from '../../service/gig.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useGigSchema } from '../../hooks/useGigSchema';
import { gigInfoSchema } from '../schemas/gig.schema';
import { ICreateGigArea } from './components/CreateGig';
import { IApprovalModalContent } from 'src/shared/modal/interfaces/modal.interface';
import ApprovalModal from 'src/shared/modal/ApprovalModal';

const GigButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));

const CreateGigArea: LazyExoticComponent<FC<ICreateGigArea>> = lazy(() => import('src/features/gigs/components/gig/components/CreateGig'));

export const defaultGig: ICreateGig = {
  title: '',
  categories: '',
  description: '',
  subCategories: [],
  tags: [],
  price: 0,   
  coverImage: '',
  expectedDelivery: 'Expected Delivery',
  basicTitle: '',
  basicDescription: '',
  sellerId: ''
};

const AddGig: FC = (): ReactElement => {
  const authUser: IAuthUser = useAppSelector(useAuthDetails);
  const gigInfoRef = useRef<ICreateGig>(defaultGig);
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const [showGigModal, setShowGigModal] = useState<IShowGigModal>({
    image: false,
    cancel: false
  });
  const [gig, setGig] = useState<ICreateGig>(defaultGig);
  const [isCoverPage, setIsCoverPage] = useState<File | null>(null);
  const { sellerId } = useParams();

  const [schemaValidation,validationErrors] = useGigSchema({ schema: gigInfoSchema, gigInfo: gig });

  const [createGig, { isLoading: gigLoading }] = useCreateGigMutation();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const isValid: boolean = await schemaValidation();
      
      if (gig.description && sellerId && isCoverPage) {

  
        let fetchResult: ICreateGig = {
          ...gig,
          sellerId: sellerId,
       
        };
        const formData = new FormData();

        formData.append('sellerId', fetchResult.sellerId);
        formData.append('title', fetchResult.title);
        formData.append('categories', fetchResult.categories);
        formData.append('description', fetchResult.description);
        formData.append('price', fetchResult.price.toString());
        formData.append('coverImage', isCoverPage);
        formData.append('expectedDelivery', fetchResult.expectedDelivery);
        formData.append('basicTitle', fetchResult.basicTitle);
        formData.append('basicDescription', fetchResult.basicDescription);

        fetchResult.subCategories.forEach((subCategory) => {
          formData.append('subCategories[]', subCategory);
        });

        fetchResult.tags.forEach((tag) => {
          formData.append('tags[]', tag);
        });

        if (isValid) {
          const response: IResponse = await createGig(formData).unwrap();
   
          const title: string = replaceSpacesWithDash(gig.title);
          navigate(`/gig/${lowerCase(`${authUser.username}`)}/${title}/${response?.gig?.sellerId}/${response?.gig?.id}/view`, {
            replace: true
          });
          setShowGigModal({ ...showGigModal, image: false });
        }else{
          console.log("validationErrors",validationErrors);
          
        }
      }
    } catch (error) {

      showErrorToast('Error creating gig');
    }
  };
  const onCancelCreate = (): void => {
    navigate(`/seller_profile/${lowerCase(`${authUser.username}/${sellerId}/edit`)}`);
  };
  return (
    <>
      {showGigModal.cancel && (
        <ApprovalModal
          approvalModalContent={approvalModalContent}
          onClose={() => setShowGigModal({ ...showGigModal, cancel: false })}
          onClick={onCancelCreate}
        />
      )}

      <Suspense fallback={<CircularPageLoader />}>
        <div className="relative w-screen">
          <BreadCrumbs breadCrumbItems={['Seller', 'Create new gig']} />
          <div className="container relative mx-auto my-5 px-2 pb-12 md:px-0">
            {gigLoading && <CircularPageLoader />}
            <>
              {!gigLoading && authUser && authUser.emailVerified ? (
                <div className="border-grey left-0 top-0 z-10 mt-4 block rounded border bg-white p-6">
                  <CreateGigArea setGig={setGig} gig={gig} setIsCoverPage={setIsCoverPage} isCoverPage={isCoverPage} />

                  <div className="grid xs:grid-cols-1 md:grid-cols-5">
                    <div className="pb-2 text-base font-medium lg:mt-0"></div>
                    <div className="col-span-4 flex gap-x-4 md:w-11/12 lg:w-8/12">
                      <GigButton
                        disabled={false}
                        className="rounded  px-8 py-3 text-center text-sm font-bold text-white bg-customPurple hover:bg-customViolet focus:outline-none md:py-3 md:text-base"
                        label="Create Gig"
                        onClick={handleSubmit}
                      />
                      <GigButton
                        disabled={false}
                        className="rounded bg-red-500 px-8 py-3 text-center text-sm font-bold text-white hover:bg-red-400 focus:outline-none md:py-3 md:text-base"
                        label="Cancel"
                        onClick={() => {
                          const isEqual: boolean = equal(gig, gigInfoRef.current);
                          if (!isEqual) {
                            setApprovalModalContent({
                              header: 'Cancel Gig Creation',
                              body: 'Are you sure you want to cancel?',
                              btnText: 'Yes, Cancel',
                              btnColor: 'bg-red-500 hover:bg-red-400'
                            });
                            setShowGigModal({ ...showGigModal, cancel: true });
                          } else {
                            onCancelCreate();
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                !gigLoading && (
                  <div className="absolute left-0 top-0 z-[80] flex h-full w-full justify-center bg-white/[0.8] text-sm font-bold md:text-base lg:text-xl">
                    <span className="mt-40">Please verify your email.</span>
                  </div>
                )
              )}
            </>
          </div>
        </div>
      </Suspense>
    </>
  );
};
export default AddGig;
