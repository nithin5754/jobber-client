import { Transition } from '@headlessui/react';
import { LazyExoticComponent, FC, lazy, useState, ReactElement, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';
import { useGetBuyerDetails } from 'src/features/buyer/reducer/buyer.reducer';
import { ISeller } from 'src/features/seller/interfaces/seller.interface';
import { useGetSellerDetails } from 'src/features/seller/reducers/seller.reducer';
import { IButtonProps } from 'src/shared/shared.interface';
import { CLOUDINARY_PICTURE_URL } from 'src/shared/utils/constant.api';
import { lowerCase } from 'src/shared/utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { IHomeHeaderProps } from '../interface/header.interface';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { IBuyer } from 'src/features/buyer/interfaces/buyer.interfaces';

import { find } from 'lodash';
// import photo from 'src/assets/jobber-logo-transparent.png'
import socketService from 'src/sockets/socket.service';

const DashBoardButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));

const SettingsDropDown: LazyExoticComponent<FC<IHomeHeaderProps>> = lazy(() => import('src/shared/header/components/SettingsDropDown'));

const DashBoardHeader: FC = (): ReactElement => {
  const socket=socketService.getSocket()
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const authUser: IAuthUser | undefined = useAppSelector(useAuthDetails);
  const buyer: IBuyer | undefined = useAppSelector(useGetBuyerDetails);
  const seller: ISeller | undefined = useAppSelector(useGetSellerDetails);
  const [authUsername, setAuthUsername] = useState<string>('');

  useEffect(() => {
if(socket){
  socket.emit('getLoggedInUsers', '');
  socket.on('online', (data: { socketId: string; username: string; userId: string }[]) => {

    const socketData: { socketId: string; username: string; userId: string } | undefined = find(
      data,
      (item: { socketId: string; userId: string; username: string }) => item.username === authUser?.username
    );
    if (socketData && socketData.username) {
      setAuthUsername(`${socketData?.username}`);
    } else {
      setAuthUsername('');
    }
  });
}
  }, [authUser?.username]);

  return (
    <header>
      <nav className="navbar peer-checked:navbar-active relative z-20 w-full border-b bg-white shadow-2xl shadow-gray-600/5 backdrop-blur dark:shadow-none">
        <div className="m-auto px-6 xl:container md:px-12 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-3 lg:py-5">
            <div className="flex w-full gap-x-4 lg:w-6/12">
              <div className="flex w-full ">
                <label htmlFor="hbr" className="peer-checked:hamburger relative z-20 -ml-4 block cursor-pointer p-6 lg:hidden">
                  <DashBoardButton
                    className="m-auto  flex h-0.5 w-5 items-center rounded transition duration-300"
                    label={<FaBars className="h-6 w-6 text-sky-500" />}
                  />
                </label>
                <div className="w-full gap-x-4 md:flex">
                  <Link
                    to={`/${lowerCase(`${seller?.username}`)}/${`${seller?.id}`}/seller_dashboard`}
                    className="relative z-10 flex cursor-pointer justify-center self-center text-2xl font-semibold text-black lg:text-3xl"
                  >
                     {/* <img src={`${photo}`} alt="" width={150} /> */}
                     <h2 className='hover:text-customPurple text-customViolet'>codehirePro</h2>
                  </Link>
                </div>
              </div>
            </div>
            <div className="navmenu mb-16 hidden w-full cursor-pointer flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-300/20 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none md:flex-nowrap lg:m-0 lg:flex lg:w-6/12 lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="text-[#74767e] lg:pr-4">
                <ul className="flex text-base font-medium py-2">
                  <li className="relative flex items-center">
                    <Link to={`/${lowerCase(`${seller?.username}`)}/${`${seller?.id}`}/manage_orders`} className="px-3">
                      <span>Orders</span>
                    </Link>
                  </li>
                  <li className="relative flex items-center">
                    <Link to={`/${lowerCase(`${seller?.username}`)}/${`${seller?.id}`}/manage_earnings`} className="px-3">
                      <span>Earnings</span>
                    </Link>
                  </li>
                  <li className="relative flex cursor-pointer items-center">
                    <DashBoardButton
                      className="px-4 text-base font-medium"
                      onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      label={
                        <>
                          <img
                            src={
                              authUser?.profilePicture
                                ? CLOUDINARY_PICTURE_URL(authUser?.profilePublicId as string)
                                : 'src/assets/profile-1.png'
                            }
                            alt="profile"
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          {authUser?.username === authUsername && (
                            <span className="absolute top-0  right-3 h-3 w-3 rounded-full border-white bg-green-700 "></span>
                          )}
                        </>
                      }
                    />
                    <Transition
                      show={isDropdownOpen}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <div className=" absolute -right-48 top-[1.9rem] z-50 mt-5 w-96">
                        <SettingsDropDown
                          authUser={authUser}
                          seller={seller}
                          buyer={buyer}
                          setIsDropdownOpen={setIsDropdownOpen}
                          type="seller"
                        />
                      </div>
                    </Transition>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default DashBoardHeader;
