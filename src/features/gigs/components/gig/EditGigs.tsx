import { FC, lazy, LazyExoticComponent, ReactElement, Suspense, useRef, useState } from 'react';

import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import BreadCrumbs from 'src/shared/breadcrumbs/BreadCrumbs';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import { IButtonProps, IResponse } from 'src/shared/shared.interface';
import { useAppSelector } from 'src/store/store';
import { ICreateGig, ISellerGig, IShowGigModal } from '../../interface/gigi.interface';

import { extractTextFromHTML, lowerCase, replaceSpacesWithDash, showErrorToast, showSuccessToast } from 'src/shared/utils/utils.service';
import equal from 'react-fast-compare';
import { useUpdateGigMutation } from '../../service/gig.service';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ICreateGigArea } from './components/CreateGig';
import { IApprovalModalContent } from 'src/shared/modal/interfaces/modal.interface';
import ApprovalModal from 'src/shared/modal/ApprovalModal';

const GigButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));

const CreateGigArea: LazyExoticComponent<FC<ICreateGigArea>> = lazy(() => import('src/features/gigs/components/gig/components/CreateGig'));

const EditGigs: FC = (): ReactElement => {
  const authUser: IAuthUser = useAppSelector(useAuthDetails);

  const { state }: { state: ISellerGig } = useLocation();
  const defaultGigInfo: ICreateGig = {
    title: state?.title,
    categories: state?.categories,
    description: state?.description,
    subCategories: state?.subCategories,
    tags: state?.tags,
    price: state?.price,
    coverImage: state?.coverImage,
    expectedDelivery: state?.expectedDelivery,
    basicTitle: state?.basicTitle,
    basicDescription: state?.basicDescription,
    sellerId: state?.sellerId as string
  };
  const gigInfo = useRef<ICreateGig>(defaultGigInfo);
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const [showGigModal, setShowGigModal] = useState<IShowGigModal>({
    image: false,
    cancel: false
  });
  const [gig, setGig] = useState<ICreateGig>(defaultGigInfo);
  const [isCoverPage, setIsCoverPage] = useState<File | null>(null);
  const { sellerId } = useParams();

  const [updateGig, { isLoading: gigLoading }] = useUpdateGigMutation();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response: IResponse = await updateGig({ gigId: `${state.id}`, gig }).unwrap();
      const title: string = replaceSpacesWithDash(gig.title);
      if(title){
        showSuccessToast('Gig Successfully Updated!');
      }
      navigate(`/gig/${lowerCase(`${authUser.username}`)}/${title}/${response?.gig?.sellerId}/${response?.gig?.id}/view`, {
        replace: true
      });
      setShowGigModal({ ...showGigModal, image: false });
    } catch (error) {
      console.log('add gi error', error);
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
                          const isEqual: boolean = equal(gig, gigInfo.current);
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
export default EditGigs;
