import { FC, ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { applicationLogout, lowerCase } from 'src/shared/utils/utils.service';
import { useAppDispatch } from 'src/store/store';
import { IHomeHeaderProps } from '../interface/header.interface';
import { updateCategoryContainer } from '../reducer/category.reducer';
import { updateHeader } from '../reducer/header.reducer';
import socketService from 'src/sockets/socket.service';



const SettingsDropDown: FC<IHomeHeaderProps> = ({ seller, buyer, type, authUser, setIsDropdownOpen }): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const socket=socketService.getSocket()

  const onLogout = (): void => {
    if (setIsDropdownOpen) {
      setIsDropdownOpen(false);
    }
     if(authUser&&socket){
      socket.emit('removeLoggedInUser',`${authUser.username}`)
     }
    applicationLogout(dispatch, navigate);
  };
  return (
    <div className="border-grey w-44 divide-y divide-gray-100 rounded border bg-white shadow-md">
      <ul className="text-gray-700s py-2 text-sm" aria-labelledby="avatarButton">
   
      {
        buyer&&buyer.isSeller&&(
          <li className="mx-3 mb-1">
          <Link
            to={type === 'buyer'&&authUser&&authUser.username&&seller&&seller.id ? `/${lowerCase(authUser?.username ) }/${seller?.id }/seller_dashboard` : '/'}
            className="block w-full cursor-pointer rounded bg-customViolet px-4s py-2 text-center font-bold transition-all  hover:bg-customPurple text-white focus:outline-none"
            onClick={() => {
              if (setIsDropdownOpen) {
                setIsDropdownOpen(false);
              }
           if(type==='buyer'){
            dispatch(updateHeader('sellerDashboard'));
            dispatch(updateCategoryContainer(true));
           }else{
            dispatch(updateHeader('home'));
            dispatch(updateCategoryContainer(true));
           }
            }}
          >
            {type === 'buyer' ? 'Switch to Selling' : 'Switch to Buying'}
          </Link>
        </li>
        )
      }
        

        {buyer && buyer?.isSeller && type === 'buyer' && (
          <li>
            <Link
              to={`/manage_gigs/new/${seller?.id as string}`}
              className="block px-4 py-2 hover:text-customPurple "
              onClick={() => {
                if (setIsDropdownOpen) {
                  setIsDropdownOpen(false);
                }
                dispatch(updateHeader('home'));
                dispatch(updateCategoryContainer(true));
              }}
            >
              Add a new gig
            </Link>
          </li>
        )}
        { type === 'buyer' && (
          <li>
            <Link
              to={`/users/${lowerCase(buyer?.username as string)}/${buyer?.id as string}/orders`}
              onClick={() => {
                if (setIsDropdownOpen) {
                  setIsDropdownOpen(false);
                }
                dispatch(updateHeader('home'));
                dispatch(updateCategoryContainer(true));
              }}
              className="block px-4 py-2 hover:text-customPurple"
            >
              Dashboard
            </Link>
          </li>
        )}
  {buyer && buyer?.isSeller && type === 'buyer' && (

<li>
<Link to={seller&&seller.id&&seller.username?`/seller_profile/${lowerCase(seller?.username )}/${seller?.id }/edit`:'/'} className="block px-4 py-2 hover:text-customPurple"
     onClick={() => {
      if (setIsDropdownOpen) {
        setIsDropdownOpen(false);
      }
      dispatch(updateHeader('home'));
      dispatch(updateCategoryContainer(true));
    }}
>
  Profile
</Link>
</li>
  )}
  
        <li>
          <Link to={`/${lowerCase(`${buyer?.username}` as string)}/edit`} className="block px-4 py-2 hover:text-customPurple" 
               onClick={() => {
                if (setIsDropdownOpen) {
                  setIsDropdownOpen(false);
                }
                dispatch(updateHeader('home'));
                dispatch(updateCategoryContainer(false));
              }}
          >
            Settings
          </Link>
        </li>
      </ul>
      <div className="py-1">
        <div className="block px-4 py-2 text-sm hover:text-customPurple" onClick={onLogout}>
          Sign out
        </div>
      </div>
    </div>
  );
};
export default SettingsDropDown;
