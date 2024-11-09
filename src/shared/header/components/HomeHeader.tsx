import { Transition } from '@headlessui/react';
import { FC, lazy, LazyExoticComponent, useRef } from 'react';
import { FaAngleLeft, FaAngleRight, FaBars, FaRegBell, FaRegEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IAuthUser } from 'src/features/auth/interfaces/auth.interface';
import { useAuthDetails } from 'src/features/auth/reducers/auth.reducer';

import { IButtonProps } from 'src/shared/shared.inferface';
import { categories, replaceSpacesWithDash } from 'src/shared/utils/utils.service';
import { useAppSelector } from 'src/store/store';
import { v4 as uuidv4 } from 'uuid';
import { IHomeHeaderProps } from '../interface/header.inferface';



const HomeHeaderButton:LazyExoticComponent<FC<IButtonProps>>=lazy(()=>import('src/shared/button/Button'))

const HomeHeader:FC<IHomeHeaderProps> = ({showCategoryContainer}) => {
  const authUser: IAuthUser|undefined = useAppSelector(useAuthDetails);

  const notificationDropdownRef = useRef<HTMLDivElement | null>(null);
  const messageDropdownRef = useRef<HTMLDivElement | null>(null);
  const orderDropdownRef = useRef<HTMLDivElement | null>(null);
  const settingsDropdownRef = useRef<HTMLDivElement | null>(null);
  const navElement = useRef<HTMLDivElement | null>(null);

  const isNotificationDropdownOpen = false;
  const isMessageDropdownOpen = false;
  const isOrderDropdownOpen = false;
  const isSettingsDropdown = false;

  


  return (
    <header>
      <nav className="navbar peer-checked:navbar-active relative z-[120] w-full border-b bg-white shadow-2xl shadow-gray-600/5 backdrop-blur dark:shadow-none">
        {/* <!-- Add Banner component here --> */}
        <div className="m-auto px-6 xl:container md:px-12 lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 md:gap-0 md:py-3 lg:py-5">
            <div className="flex w-full gap-x-4 lg:w-6/12">
              <div className="hidden w-full md:flex">
                <label htmlFor="hbr" className="peer-checked:hamburger relative z-20 -ml-4 block cursor-pointer p-6 lg:hidden">
                  <HomeHeaderButton
                    className="m-auto flex h-0.5 w-5 items-center rounded transition duration-300"
                    label={<FaBars className="h-6 w-6 text-sky-500" />}
                  />
                </label>
                <div className="w-full gap-x-4 md:flex">
                  <Link
                    to="/"
                    className="relative z-10 flex cursor-pointer justify-center self-center text-2xl font-semibold text-black lg:text-3xl"
                  >
                    Jobber
                  </Link>
                  {/* <!-- Add HeaderSearchInput component --> */}
                </div>
              </div>
              {/* <!-- Add MobileHeaderSearchInput component here --> */}
            </div>
            <div className="navmenu mb-16 hidden w-full cursor-pointer flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl shadow-gray-300/20 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none md:flex-nowrap lg:m-0 lg:flex lg:w-6/12 lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="text-[#74767e] lg:pr-4">
                <ul className="flex text-base font-medium">

                       <li className="relative z-50 flex cursor-pointer items-center">
                    <HomeHeaderButton
                      className="relative px-4"
                      label={
                        <>
                          <FaRegBell />
                          <span className="absolute -top-1 right-0 mr-3 inline-flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#ff62ab]"></span>
                        </>
                      }
                    />
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
                      <div className="absolute right-0 mt-5 w-96">
                           {/* <!-- NotificationDropdown --> */}
                      </div>
                    </Transition>
                  </li>
                  <li className="relative z-50 flex cursor-pointer items-center">
                    <HomeHeaderButton
                      className="relative px-4"
                      label={
                        <>
                          <FaRegEnvelope />
                          <span className="absolute -top-1 right-0 mr-2 inline-flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#ff62ab]"></span>
                        </>
                      }
                    />
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
                      <div className="absolute right-0 mt-5 w-96">{/* <!-- MessageDropdown --> */}</div>
                    </Transition>
                  </li>
                  <li className="relative z-50 flex cursor-pointer items-center">
                    <HomeHeaderButton
                      className="px-3"
                      label={
                        <>
                          <span>Orders</span>
                        </>
                      }
                    />
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
                  <li className="relative flex items-center py-[5px] ">
                    <Link
                      to="/seller_onboarding"
                      className="relative ml-auto flex  h-9 items-center justify-center rounded-full bg-customViolet hover:bg-customPurple text-white font-bold sm:px-6 "
                    >
                      <span>Become a Seller</span>
                    </Link>
                  </li>
                  <li className="relative z-50 flex cursor-pointer items-center">
                    <HomeHeaderButton
                      className="relative flex gap-2 px-3 text-base font-medium"
                      label={
                        <>
                          <img src="src/assets/profile-1.png" alt="profile" className="h-7 w-7 rounded-full object-cover" />
                          <span className="flex self-center">{authUser?.username}</span>
                        </>
                      }
                    />
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
                      <div className="absolute -right-48 z-50 mt-5 w-96">{/* <!-- SettingsDropdown --> */}</div>
                    </Transition>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {
          showCategoryContainer&&(

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
          )
        }

      </nav>
    </header>
  );
};
export default HomeHeader;
