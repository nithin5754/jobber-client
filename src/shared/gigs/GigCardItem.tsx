import { lowerCase } from 'lodash';

import { FC, ReactElement, useState } from 'react';
import { FaPencilAlt, FaPlayCircle, FaPauseCircle, FaTrashAlt, FaEllipsisH, FaRegStar, FaStar } from 'react-icons/fa';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { IGigsProps } from 'src/features/gigs/interface/gigi.interface';
import { rating, replaceSpacesWithDash, showErrorToast, showSuccessToast } from '../utils/utils.service';
import { IGigCardItemModal } from '../shared.interface';
import { IApprovalModalContent } from '../modal/interfaces/modal.interface';
import { useAppDispatch } from 'src/store/store';
import { updateHeader } from '../header/reducer/header.reducer';
import { useDeleteGigMutation, useUpdateActiveGigMutation } from 'src/features/gigs/service/gig.service';
import ApprovalModal from '../modal/ApprovalModal';
import { PiCurrencyInrBold } from 'react-icons/pi';

const GigCardItem: FC<IGigsProps> = ({ gig }): ReactElement => {
  const [gigCardItemModal, setGigCardItemModal] = useState<IGigCardItemModal>({ deleteApproval: false, overlay: false });

  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const title: string = replaceSpacesWithDash(`${gig?.title}`);

  const [updateActiveGig] = useUpdateActiveGigMutation();
  const [deleteGig] = useDeleteGigMutation();

  const navigateToEdit = (gigId: string) => {
    setGigCardItemModal({ ...gigCardItemModal, overlay: false });
    dispatch(updateHeader('home'));
    navigate(`/manage_gigs/edit/${gigId}`, { state: gig });
  };

  const onToggleGig = async (gigId: string, active: boolean): Promise<void> => {
    try {
      await updateActiveGig({ gigId, active }).unwrap();
      setGigCardItemModal({ ...gigCardItemModal, overlay: false });
      showSuccessToast('Gig Gig Status Updated Successfully');
    } catch (error) {
      showErrorToast('Error setting gig status.');
    }
  };

  const onDeleteGig = async (gigId: string, sellerId: string): Promise<void> => {
    try {
      await deleteGig({ gigId, sellerId }).unwrap();
      setGigCardItemModal({ ...gigCardItemModal, overlay: false });
      showSuccessToast('Gig Gig Status Deleted Successfully');
    } catch (error) {
      showErrorToast('Error While Delete Gig');
    }
  };

  return (
    <>
      {gigCardItemModal.deleteApproval && (
        <ApprovalModal
          approvalModalContent={approvalModalContent}
          onClick={() => onDeleteGig(gig?.id as string, gig?.sellerId as string)}
          onClose={() => setGigCardItemModal({ ...gigCardItemModal, deleteApproval: false })}
        />
      )}

      <div className="relative">
        {gigCardItemModal.overlay && (
          <div className="border-grey absolute bottom-0 top-0 mb-8 w-full cursor-pointer border bg-white">
            <div
              onClick={() => {
                setGigCardItemModal({ ...gigCardItemModal, overlay: false });
              }}
              className="absolute -right-[12px] -top-[12px] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border  
             bg-white text-sm font-bold leading-[0] text-custom border-customPurple "
            >
              X
            </div>
            <ul className="list-none pl-0">
              <li>
                <div
                  className="my-1 flex w-full cursor-pointer gap-4 px-4 pt-3"
                  onClick={() => {
                    navigateToEdit(gig?.id as string);
                  }}
                >
                  <FaPencilAlt size={13} className="flex self-center" />
                  <span className="">Edit</span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => onToggleGig(gig?.id as string, !gig?.active)}
                  className="my-1 flex w-full cursor-pointer gap-4 px-4 pt-3"
                >
                  {!gig?.active ? (
                    <FaPlayCircle size={13} className="flex self-center" />
                  ) : (
                    <FaPauseCircle size={13} className="flex self-center" />
                  )}
                  <span>{!gig?.active ? 'Activate' : 'Pause'}</span>
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    setApprovalModalContent({
                      header: 'Delete this Gig',
                      body: 'Are you sure you want to permanently delete this gig?',
                      btnText: 'Delete',
                      btnColor: 'bg-red-500'
                    });
                    setGigCardItemModal({ ...gigCardItemModal, deleteApproval: true });
                  }}
                  className="my-1 flex w-full cursor-pointer gap-4 px-4 pt-3"
                >
                  <FaTrashAlt size={13} className="flex self-center" />
                  <span className="">Delete</span>
                </div>
              </li>
            </ul>
          </div>
        )}

        <div className="border-grey mb-8 h-72 p-2  flex cursor-pointer flex-col gap-2 border">
          <Link
            onClick={() => dispatch(updateHeader('home'))}
            to={`/gig/${lowerCase(gig?.username)}/${gig?.title}/${gig?.sellerId}/${gig?.id}/view`}
          >
            <div className="h-36 rounded-md">
              <img src={gig?.coverImage} alt="Gig cover image" className="w-full rounded-md object-cover h-full" />
            </div>
          </Link>
          <div className="px-2">
            <Link
              onClick={() => dispatch(updateHeader('home'))}
              to={`/gig/${lowerCase(`${gig?.username}`)}/${title}/${gig?.sellerId}/${gig?.id}/view`}
            >
              <p className="line-clamp-2 text-sm text-[#404145] hover:underline md:text-base overflow-x-hidden">{gig?.title}</p>
            </Link>
          </div>
          <div className="flex items-center gap-1 text-yellow-400">
            {parseInt(`${gig?.ratingsCount}`) > 0 ? <FaStar /> : <FaRegStar />}

            <strong className="text-sm font-bold">({rating(parseInt(`${gig?.ratingSum}`) / parseInt(`${gig?.ratingsCount}`))})</strong>
          </div>
          <div className="flex justify-between px-2 pb-2">
            <FaEllipsisH
              size={14}
              className="self-center"
              onClick={() => {
                setGigCardItemModal({ ...gigCardItemModal, overlay: true });
              }}
            />
              <strong className="text-sm font-bold md:text-base flex items-center ">
                    From <span> {"  "}</span> <PiCurrencyInrBold className='ml-4'/>
                    {gig?.price}
                  </strong>
          </div>
        </div>
      </div>
    </>
  );
};
export default GigCardItem;
