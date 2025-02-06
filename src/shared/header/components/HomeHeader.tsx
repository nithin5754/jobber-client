import { Transition } from '@headlessui/react';
import { FC, lazy, LazyExoticComponent, Suspense, useRef } from 'react';
import { FaAngleLeft, FaAngleRight, FaBars, FaRegBell, FaRegEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';

import { IButtonProps } from 'src/shared/shared.interface';
import { categories, firstLetterUppercase, replaceSpacesWithDash } from 'src/shared/utils/utils.service';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';        
import { IHomeHeaderProps } from '../interface/header.interface';
import { useResendEmailMutation } from 'src/features/auth/services/auth.service';
import Banner from 'src/shared/banner/Banner';
import { IBuyer } from 'src/features/buyer/interfaces/buyer.interfaces';
import { useGetBuyerDetails } from 'src/features/buyer/reducer/buyer.reducer';
import { CLOUDINARY_PICTURE_URL } from 'src/shared/utils/constant.api';
import useDetectOutsideClick from 'src/shared/hooks/useDetectOutsideClick';
import { ISeller } from 'src/features/seller/interfaces/seller.interface';
import { useGetSellerDetails } from 'src/features/seller/reducers/seller.reducer';
import { updateCategoryContainer } from '../reducer/category.reducer';
import { updateHeader } from '../reducer/header.reducer';
import HeaderSearchInput from './HeaderSearchInput';
import MessageDropdown from './MessageDrpdown';
// import photo from 'src/assets/jobber-logo-transparent.png'
const HomeHeaderButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const HomeHeaderSettings: LazyExoticComponent<FC<IHomeHeaderProps>> = lazy(() => import('src/shared/header/components/SettingsDropDown'));

const HomeHeader: FC<IHomeHeaderProps> = ({ showCategoryContainer }) => {
  const authUser: IAuthUser | undefined = useAppSelector(useAuthDetails);
  const buyerDetails: IBuyer | undefined = useAppSelector(useGetBuyerDetails);
  const sellerDetails: ISeller | undefined = useAppSelector(useGetSellerDetails);

  const [resendEmail, { error }] = useResendEmailMutation();
  const notificationDropdownRef = useRef<HTMLDivElement | null>(null);
  const messageDropdownRef = useRef<HTMLDivElement | null>(null);
  const orderDropdownRef = useRef<HTMLDivElement | null>(null);
  const settingsDropdownRef = useRef<HTMLDivElement | null>(null);
  const navElement = useRef<HTMLDivElement | null>(null);

  const [isSettingsDropdown, setIsSettingsDropdown] = useDetectOutsideClick(settingsDropdownRef, false);
  const [isMessageDropdownOpen, setIsMessageDropdownOpen] = useDetectOutsideClick(messageDropdownRef, false);
  const [isNotificationDropdownOpen, _setIsNotificationDropdownOpen] = useDetectOutsideClick(notificationDropdownRef, false);
  const [isOrderDropdownOpen, _setIsOrderDropdownOpen] = useDetectOutsideClick(orderDropdownRef, false);
  const dispatch = useAppDispatch();

  const handleResendEmail = async () => {
    if (authUser && authUser.email) {
      let result = await resendEmail({ email: authUser?.email }).unwrap();
      if (!result) {
        console.log(error);
      }
      console.log(result.message);
    }
  };

  const handleToggle = (): void => {
    setIsSettingsDropdown(!isSettingsDropdown);
    setIsMessageDropdownOpen(false)
  };

  const toggleMessageDropDown=():void=>{
    setIsMessageDropdownOpen(!isMessageDropdownOpen)
   setIsSettingsDropdown(false)
  }

  return (
    <header>
      <nav className="navbar peer-checked:navbar-active relative z-[120] w-full border-b bg-white shadow-2xl shadow-gray-600/5 backdrop-blur dark:shadow-none">
        {authUser && !authUser.emailVerified && (
          <Suspense fallback={'loading...'}>
            <Banner
              bgColor={'bg-warning'}
              text={'Please verify your email before you proceed.'}
              showLink={true}
              linkText={'Resend Email'}
              onClick={handleResendEmail}
            />
          </Suspense>
        )}
        <div className="m-auto px-6 xl:container md:px-12 lg:px-6">
          <div className="flex flex-wrap items-center justify-between  gap-6 md:gap-0 md:py-3 lg:py-5">
            <div className="flex w-full gap-x-4 lg:w-3/12">
              <div className="hidden w-full md:flex">
                <label htmlFor="hbr" className="peer-checked:hamburger relative z-20 -ml-4 block cursor-pointer p-6 lg:hidden">
                  <Suspense fallback={'loading...'}>
                    <HomeHeaderButton
                      className="m-auto flex h-0.5 w-5 items-center rounded transition duration-300"
                      label={<FaBars className="h-6 w-6 text-customPurple" />}
                    />
                  </Suspense>
                </label>
                <div className="w-full gap-x-4 md:flex">
                  <Link
                    to="/"
                    onClick={() => {
                      dispatch(updateHeader('home'));
                      dispatch(updateCategoryContainer(true));
                    }}
                    className="relative z-10 flex cursor-pointer justify-center self-center text-2xl font-semibold text-black lg:text-3xl"
                  >
                 {/* <img src={`${photo}`} alt="" width={150} />
                  */}
                           <h2 className='hover:text-customPurple text-customViolet'>codehirePro</h2>
                  </Link>
          
                </div>
              </div>
              {/* <!-- Add MobileHeaderSearchInput component here --> */}
            </div>
            <div className="mb-16 hidden w-full cursor-pointer flex-wrap items-center justify-end space-y-8 rounded-full border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-300/20 dark:border-gray-700/80 dark:bg-gray-800/80 dark:shadow-none md:flex-nowrap lg:m-0 lg:flex lg:w-7/12 lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="text-[#c3bdbd] lg:pr-4 w-full flex-1">
                <ul className="flex  flex-1  text-base font-medium">
               <div className="flex w-[50%]   ml-[3px]  ">
               <li className=" z-50 flex w-full  cursor-pointer   ">
                <HeaderSearchInput/>

                </li>
               </div>
               <div className="flex w-[50%]    justify-center gap-2 ">
               <li className="relative   z-50 flex cursor-pointer items-center">
                    <Suspense fallback={'loading..'}>
                      <HomeHeaderButton
                        className="relative px-4"
                        label={
                          <>
                            <FaRegBell />
                            <span className="absolute -top-1 right-0 mr-3 inline-flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#ff62ab]"></span>
                          </>
                        }
                      />
                    </Suspense>
                    <Transition
                      ref={notificationDropdownRef}
                      show={isNotificationDropdownOpen}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <div className="absolute right-0 mt-5 w-96">{/* <!-- NotificationDropdown --> */}</div>
                    </Transition>
                  </li>
                  <li className="relative z-50 flex cursor-pointer items-center">
                    <Suspense fallback={'loading...'}>
                      <HomeHeaderButton
                      onClick={toggleMessageDropDown}
                        className="relative px-4"
                        label={
                          <>
                            <FaRegEnvelope />
                            <span className="absolute -top-1 right-0 mr-2 inline-flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#ff62ab]"></span>
                          </>
                        }
                      />
                    </Suspense>
                    <Transition
                      ref={messageDropdownRef}
                      show={isMessageDropdownOpen}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <div className=" absolute right-0 mt-5 top-[1.9rem] w-96"><MessageDropdown setIsMessageDropdownOpen={setIsMessageDropdownOpen}/></div>
                    </Transition>
                  </li>
                  <li className="relative z-50 flex cursor-pointer items-center">
                    <Suspense fallback={'loading'}>
                      <HomeHeaderButton
                        className="px-3"
                        label={
                          <>
                            <span>Orders</span>
                          </>
                        }
                      />
                    </Suspense>
                    <Transition
                      ref={orderDropdownRef}
                      show={isOrderDropdownOpen}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <div className="absolute right-0 mt-5 w-96">{/* <!-- OrderDropdown --> */}</div>
                    </Transition>
                  </li>
                  {buyerDetails && !buyerDetails?.isSeller && (
                    <li className="relative flex w-full items-center py-[5px] ">
                      <Link
                        to="/seller_onboarding"
                        className="relative m-auto flex   h-9 items-center justify-center rounded-full bg-customViolet hover:bg-customPurple text-white font-bold sm:px-6 "
                      >
                        <span className='w-full text-[14px] font-medium'>Become a Seller</span>
                      </Link>
                    </li>
                  )}
                  <li className="relative z-50 flex cursor-pointer items-center">
                    <Suspense fallback={'loading..'}>
                      <HomeHeaderButton
                        onClick={handleToggle}
                        className={`relative flex gap-2 px-3 text-base font-medium py-2 `}
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
                            <span className={`flex self-center font-bold `}>{firstLetterUppercase(`${authUser?.username}`as string)||authUser?.username}</span>
                          </>
                        }
                      />
                    </Suspense>
                    <Transition
                      ref={settingsDropdownRef}
                      show={isSettingsDropdown}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <div className=" absolute -right-48 top-[1.9rem] z-50 mt-5 w-96">
                        <Suspense fallback={'loading...'}>
                          <HomeHeaderSettings authUser={authUser} type="buyer" buyer={buyerDetails} seller={sellerDetails} />
                        </Suspense>
                      </div>
                    </Transition>
                  </li>
               </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {showCategoryContainer && (
          <div className="border-grey z-40 hidden w-full border border-x-0 border-b-0 sm:flex">
            <div className="justify-left md:justify-left container mx-auto flex px-6 lg:justify-center">
              <span className="flex w-auto cursor-pointer self-center pr-1 xl:hidden">
                <FaAngleLeft size={20} />
              </span>
              <div
                ref={navElement}
                className="relative inline-block h-full w-full items-center gap-6 overflow-x-auto scroll-smooth whitespace-nowrap py-2 text-sm font-medium lg:flex lg:justify-between"
              >
                {categories().map((category: string) => (
                  <span key={uuidv4()} className="mx-4 cursor-pointer first:ml-0 hover:text-sky-400 lg:mx-0">
                    <Link to={`/categories/${replaceSpacesWithDash(category)}`}>{category}</Link>
                  </span>
                ))}
              </div>
              <span className="flex w-auto cursor-pointer self-center pl-1 xl:hidden">
                <FaAngleRight size={20} />
              </span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
export default HomeHeader;
