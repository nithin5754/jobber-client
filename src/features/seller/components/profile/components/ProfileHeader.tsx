import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import React, { LazyExoticComponent, FC, lazy, ForwardRefExoticComponent, useState, ReactElement, ChangeEvent, useEffect } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import StarRating from 'src/shared/rating/StarRating';
import { IButtonProps, ITextInputProps } from 'src/shared/shared.interface';
import { IProfileHeaderProps, IProjectStatusBox, ISellerProfileItem, IShowEditItem } from 'src/features/seller/interfaces/seller.interface';
import { IGigInfo } from 'src/features/gigs/interface/gigi.interface';
import { lowerCase, shortLongNumbers } from 'src/shared/utils/utils.service';
import { CLOUDINARY_PICTURE_URL } from 'src/shared/utils/constant.api';





const SellerButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const SellerTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));
const SellerGigStatusBox:LazyExoticComponent<FC<IProjectStatusBox>>=lazy(()=>import('src/features/seller/components/profile/components/ProfileProjectStatus'))

const ProfileHeader: FC<IProfileHeaderProps> = ({ sellerProfile, setSellerProfile, showHeaderInfo, showEditIcons }): ReactElement => {
  const [placeHolder, _setPlaceHolder] = useState<string>('https://placehold.co/330x220?text=Profile+Image');

  const [showEditItems, setShowEditItems] = useState<IShowEditItem>({
    fullname: false,
    oneliner: false
  });

  const [sellerProfileItem, setSellerProfileItem] = useState<ISellerProfileItem>({
    fullname: `${sellerProfile?.fullName}`,
    oneliner: `${sellerProfile?.oneliner}`
  });



  const gigInfo: IGigInfo[] = [
    {
      total: shortLongNumbers(sellerProfile?.totalGigs),
      bgColor: '#075389ce',
      title: 'Total Gigs'
    },

    {
      total: shortLongNumbers(sellerProfile?.completedJobs),
      bgColor: '#29b21acc',
      title: 'Completed Orders'
    },
    {
      total: shortLongNumbers(sellerProfile?.ongoingJobs),
      bgColor: '#b21aaabd',
      title: 'OnGoing Orders'
    },
    {
      total: shortLongNumbers(sellerProfile?.ratingsCount),
      bgColor: '#e88a16bb',
      title: 'Ratings & Reviews'
    }
  ];

  useEffect(()=>{

    if(sellerProfile){
        setSellerProfileItem({...sellerProfile,fullname:`${sellerProfileItem.fullname}`,oneliner:`${sellerProfileItem.oneliner}`})
    }

  },[sellerProfile?.fullName,sellerProfile?.username])




  console.log("formattedTime",sellerProfile?.createdAt)

  return (
    <>
      {showHeaderInfo && (
        <div className="relative flex h-56 flex-col gap-x-4 gap-y-3 bg-white px-6 py-4 md:h-52 md:flex-row">
          <div className="flex h-20 w-20 justify-center self-center md:h-24 md:w-24 lg:h-36 lg:w-36">
            <LazyLoadImage
              src={sellerProfile && sellerProfile.profilePicture ? CLOUDINARY_PICTURE_URL(sellerProfile?.profilePicture) : placeHolder}
              alt="Gig Image"
              className="w-full h-full rounded-full object-cover"
              placeholderSrc={placeHolder}
              effect="blur"
              wrapperClassName="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col md:mt-10 lg:mt-6">
            <div className="flex cursor-pointer self-center md:block md:self-start">
              <div className="flex flex-row self-center text-base font-bold lg:text-2xl">
                {!showEditItems.fullname && `${sellerProfile?.fullName}`}
                {showEditIcons && !showEditItems.fullname && (
                  <FaPencilAlt
                    className="ml-1 mt-1.5 text-xs md:text-base lg:ml-2.5 lg:mt-2"
                    onClick={() => {
                      setShowEditItems({ ...showEditItems, fullname: true });
                    }}
                  />
                )}
              </div>
              {showEditItems.fullname && (
                <div className="flex gap-x-4">
                  <SellerTextInput
                    className="mt-2 flex h-7 w-full items-center rounded border border-gray-300 p-1.5 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none lg:h-9"
                    placeholder="Fullname"
                    type="text"
                    name="fullname"
                    value={sellerProfileItem.fullname}
                    onChange={(event: ChangeEvent) => {
                      setSellerProfileItem({ ...sellerProfileItem, fullname: (event.target as HTMLInputElement).value });
                    }}
                  />
                  <div className="my-2 flex">
                    <SellerButton
                      className="md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2"
                      label="Update"
                      disabled={!sellerProfileItem.fullname}
                      onClick={() => {
                        if (sellerProfile && setSellerProfile && sellerProfileItem.fullname) {
                          setSellerProfile({ ...sellerProfile, fullName: sellerProfileItem.fullname });
                          setShowEditItems({ ...showEditItems, fullname: false });
                        }
                      }}
                    />
                    &nbsp;&nbsp;
                    <SellerButton
                      className="md:text-md rounded bg-red-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-red-500 focus:outline-none md:py-2"
                      label="Cancel"
                      onClick={() => {
                        if (sellerProfile && setSellerProfile) {
                          setSellerProfile({ ...sellerProfile });
                          setSellerProfileItem({ ...sellerProfileItem, fullname: sellerProfile.fullName });
                          setShowEditItems({ ...showEditItems, fullname: false });
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <span className="flex self-center text-sm md:block md:self-start md:text-base">
              {`@${lowerCase(`${sellerProfile?.username}`||'')}`}
            </span>
            <div className="flex cursor-pointer flex-row self-center text-center text-sm md:text-base lg:self-start">
              <div className="flex">
                {!showEditItems.oneliner && `${sellerProfile?.oneliner}`}
                {showEditIcons && !showEditItems.oneliner && (
                  <FaPencilAlt
                    className="ml-1 mt-1.5 text-xs md:text-base lg:ml-2.5 lg:mt-2"
                    onClick={() => {
                      setShowEditItems({ ...showEditItems, oneliner: true });
                    }}
                  />
                )}
              </div>
              {showEditItems && showEditItems.oneliner && (
                <div className="flex gap-x-4">
                  <SellerTextInput
                    className="mt-2 flex h-7 w-full items-center rounded border border-gray-300 p-1.5 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none lg:h-9"
                    placeholder="Oneliner"
                    type="text"
                    name="oneliner"
                    maxLength={70}
                    value={sellerProfileItem.oneliner}
                    onChange={(event: ChangeEvent) => {
                      setSellerProfileItem({ ...sellerProfileItem, oneliner: (event.target as HTMLInputElement).value });
                    }}
                  />
                  <div className="my-2 flex">
                    <SellerButton
                      className="md:text-md rounded bg-sky-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-sky-400 focus:outline-none md:py-2"
                      label="Update"
                      disabled={!sellerProfileItem.oneliner}
                      onClick={() => {
                        if (sellerProfile && setSellerProfile && sellerProfileItem.oneliner) {
                          setSellerProfile({ ...sellerProfile, oneliner: sellerProfileItem.oneliner });
                          setShowEditItems({ ...showEditItems, oneliner: false });
                        }
                      }}
                    />
                    &nbsp;&nbsp;
                    <SellerButton
                      className="md:text-md rounded bg-red-500 px-6 py-1 text-center text-sm font-bold text-white hover:bg-red-500 focus:outline-none md:py-2"
                      label="Cancel"
                      onClick={() => {
                        if (sellerProfile && setSellerProfile) {
                          setSellerProfile({ ...sellerProfile });
                          setSellerProfileItem({ ...sellerProfileItem, oneliner: sellerProfile.oneliner });
                          setShowEditItems({ ...showEditItems, oneliner: false });
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-full gap-x-1 self-center">
              <div className="mt-1 w-20 gap-x-2">
                <StarRating value={5} size={14} />
              </div>

              <div className="ml-2 mt-[3px] flex gap-1 rounded bg-orange-400 px-1 text-xs">
                <span className="font-bold text-white">5</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 font-bold text-white mt-6 gap-4">
        {gigInfo.map((gig: IGigInfo, index: number) => (
      <SellerGigStatusBox key={index} gigInfo={gig}/>
        ))}
      </div>
    </>
  );
};
export default ProfileHeader;
