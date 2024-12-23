import { FC, ReactElement } from 'react';
import { FaPencilAlt, FaRegStar, FaStar } from 'react-icons/fa';

import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { IGigCardItems } from 'src/features/gigs/interface/gigi.interface';
import { CLOUDINARY_PICTURE_URL } from '../utils/constant.api';
import { lowerCase, rating, replaceSpacesWithDash } from '../utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { useGetSellerDetails } from 'src/features/seller/reducers/seller.reducer';
import { ISeller } from 'src/features/seller/interfaces/seller.interface';

const GigsCardDisplay: FC<IGigCardItems> = ({ gig, linkTarget, showEditIcon }): ReactElement => {
  const title = replaceSpacesWithDash(gig.title);
  const navigate: NavigateFunction = useNavigate();

  const seller:ISeller=useAppSelector(useGetSellerDetails)

  const navigateToEdit = (gigId: string): void => {
    navigate(`/manage_gigs/edit/${gigId}`, { state: gig });
  };
  return (
    <div className="rounded">
      <div className="mb-8 flex cursor-pointer flex-col gap-2">
        <Link to={`/gig/${lowerCase(`${gig.username}` )}/${title}/${gig.sellerId}/${gig.id}/view`}>
          <img
            src={gig.coverImage}
            alt="Gig cover image"
            className="w-80 h-60 object-cover rounded-lg"

          />
        </Link>
        <div className="flex items-center gap-2 relative">
          <img
            src={CLOUDINARY_PICTURE_URL(`${gig.profilePicture}`)}
            alt="Profile image"
            className="h-7 w-8 rounded-full object-cover"
        
          />
          <span className="bottom-0 left-5 absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
          <div className="flex w-full justify-between">
            <span className="text-md hover:underline">
              {linkTarget ? (
                <Link to={`/seller_profile/${lowerCase(`${gig.username}`)}/${gig.sellerId}/${seller.username===gig.username?'edit':'view'}`}>
                  <strong className="text-sm font-medium md:text-base">{gig.username}</strong>
                </Link>
              ) : (
                <strong className="text-sm font-medium md:text-base">{gig.username}</strong>
              )}
            </span>
           {
            showEditIcon&& <FaPencilAlt onClick={()=>navigateToEdit(`${gig.id}` )} className="mr-2 flex self-center" size={15} />
           }
          </div>
        </div>
        <div>
          <Link to={`/gig/${lowerCase(`${gig.username}` )}/${title}/${gig.sellerId}/${gig.id}/view`}>
            <p className="line-clamp-2 text-sm text-[#404145] hover:underline md:text-base">{gig.basicDescription}</p>
          </Link>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
          {
            parseInt(`${gig.ratingsCount}`)>0 ?(<FaStar/>):(<FaRegStar/>)
          }

          <strong className="text-sm font-bold">({rating(parseInt(`${gig.ratingSum}`)/parseInt(`${gig.ratingsCount}`))})</strong>
        </div>
        <div>
          <strong className="text-sm font-bold md:text-base">From ${gig.price}</strong>
        </div>
      </div>
    </div>
  );
};
export default GigsCardDisplay;
