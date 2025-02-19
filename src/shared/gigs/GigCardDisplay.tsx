import { FC, ReactElement, useEffect, useRef } from 'react';
import { FaPencilAlt, FaRegStar, FaStar } from 'react-icons/fa';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { IGigCardItems, ISellerGig } from 'src/features/gigs/interface/gigi.interface';
import { CLOUDINARY_PICTURE_URL } from '../utils/constant.api';
import { lowerCase, rating, replaceDashWithSpaces, replaceSpacesWithDash } from '../utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { useGetSellerDetails } from 'src/features/seller/reducers/seller.reducer';
import { ISeller } from 'src/features/seller/interfaces/seller.interface';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import { find } from 'lodash';
import socketService from 'src/sockets/socket.service';
import { PiCurrencyInrBold } from 'react-icons/pi';

const GigsCardDisplay: FC<IGigCardItems> = ({ gig, linkTarget, showEditIcon }): ReactElement => {
  const socket = socketService.getSocket();
  const title = replaceSpacesWithDash(gig.title);
  const navigate: NavigateFunction = useNavigate();
  const authUser: IAuthUser = useAppSelector(useAuthDetails);
  const seller: ISeller = useAppSelector(useGetSellerDetails);
  const sellerUsername = useRef<string>('');
  const navigateToEdit = (gigId: string): void => {
    navigate(`/manage_gigs/edit/${gigId}`, { state: gig });
  };

  const saveGigTitle = (gig: ISellerGig): void => {
    if (authUser.username) {
      const category: string = replaceDashWithSpaces(gig.categories);
      if (socket) {
        socket.emit('category', category, authUser.username);
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.emit('getLoggedInUsers', '');
      socket.on('online', (data: { socketId: string; username: string; userId: string }[]) => {
        const socketData: { socketId: string; username: string; userId: string } | undefined = find(
          data,
          (item: { socketId: string; userId: string; username: string }) => item.username === gig?.username
        );
        sellerUsername.current = socketData?.username as string;
      });
    }
  }, [authUser?.username, gig.username]);

  return (
    <div className="rounded">
      <div className="mb-8 flex cursor-pointer flex-col gap-2">
        <Link onClick={() => saveGigTitle(gig)} to={`/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`}>
          <img src={gig.coverImage} alt="Gig cover image" className="w-80 h-60 object-cover rounded-lg" />
        </Link>
        <div className="flex items-center gap-2 relative">
          <img
            src={CLOUDINARY_PICTURE_URL(`${gig.profilePicture}`)}
            alt="Profile image"
            loading="lazy"
            className="h-7 w-8 rounded-full object-cover"
          />
          {sellerUsername.current === gig.username && (
            <span className="bottom-0 left-5 absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
          )}
          <div className="flex w-full justify-between">
            <span className="text-md hover:underline">
              {linkTarget ? (
                <Link
                  to={`/seller_profile/${lowerCase(`${gig.username}`)}/${gig.sellerId}/${seller.username === gig.username ? 'edit' : 'view'}`}
                >
                  <strong className="text-sm font-medium md:text-base">{gig.username}</strong>
                </Link>
              ) : (
                <strong className="text-sm font-medium md:text-base">{gig.username}</strong>
              )}
            </span>
            {showEditIcon && <FaPencilAlt onClick={() => navigateToEdit(`${gig.id}`)} className="mr-2 flex self-center" size={15} />}
          </div>
        </div>
        <div>
          <Link onClick={() => saveGigTitle(gig)} to={`/gig/${lowerCase(`${gig.username}`)}/${title}/${gig.sellerId}/${gig.id}/view`}>
            <p className="line-clamp-2 text-sm text-[#404145] hover:underline md:text-base">{gig.basicDescription}</p>
          </Link>
        </div>
        <div className="flex items-center gap-1 text-yellow-400">
          {parseInt(`${gig.ratingsCount}`) > 0 ? <FaStar /> : <FaRegStar />}

          <strong className="text-sm font-bold">({rating(parseInt(`${gig.ratingSum}`) / parseInt(`${gig.ratingsCount}`))})</strong>
        </div>
        <div>
          <strong className="text-sm font-bold md:text-base flex items-center ">
            From <span> {"  "}</span> <PiCurrencyInrBold className='ml-4'/>
            {gig.price}
          </strong>
        </div>
      </div>
    </div>
  );
};
export default GigsCardDisplay;
