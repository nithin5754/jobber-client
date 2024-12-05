import { FC, lazy, LazyExoticComponent, ReactElement, Suspense } from 'react';
import { IProfileTabsProps } from 'src/features/seller/interfaces/seller.interface';

import { IDropdownProps } from 'src/shared/shared.interface';

const ProfileTabsDropDown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));


const ProfileTabs: FC<IProfileTabsProps> = ({ type, setType }): ReactElement => {
  return (
    <>
      <div className="sm:hidden bg-white border-grey">
        <Suspense fallback={'loading ..'}>
          <ProfileTabsDropDown text="" maxHeight="300" values={['OverView', 'Active Gigs', 'Reviews & Ratings']} />
        </Suspense>
      </div>
      <ul className={`hidden divide-x divide-gray-200 text-center text-sm font-medium text-gray-500 shadow dark:text-gray-400 sm:flex
        `}>
        <li
          className="w-full"
          onClick={() => {
            if (setType) {
              setType('OverView');
            }
          }}
        >
          <div className={`inline-block w-full p-4 text-gray-600 focus:outline-none  ${type==='OverView'?'bg-customPurple/60  ':'bg-white'}`}>Overview</div>
        </li>
        <li
          className="w-full"
          onClick={() => {
            if (setType) {
              setType('Active Gigs');
            }
          }}
        >
         <div className={`inline-block w-full p-4 text-gray-600 focus:outline-none  ${type==='Active Gigs'?'bg-customPurple/60   ':'bg-white'}`}>Active Gigs</div>
        </li>
        <li
          className="w-full"
          onClick={() => {
            if (setType) {
              setType('Reviews & Ratings');
            }
          }}
        >
           <div className={`inline-block w-full p-4 text-gray-600 focus:outline-none  ${type==='Reviews & Ratings'?'bg-customPurple/60  ':'bg-white'}`}>Reviews & Ratings</div>
        </li>
      </ul>
    </>
  );
};
export default ProfileTabs;
