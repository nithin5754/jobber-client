import { FC, ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { applicationLogout } from 'src/shared/utils/utils.service';
import { useAppDispatch } from 'src/store/store';
import { IHomeHeaderProps } from '../interface/header.interface';

const SettingsDropDown: FC<IHomeHeaderProps> = ({ buyer, type, authUser, setIsDropdownOpen }): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = (): void => {
    if (setIsDropdownOpen) {
      setIsDropdownOpen(false);
    }
    applicationLogout(dispatch, navigate);
  };
  return (
    <div className="border-grey w-44 divide-y divide-gray-100 rounded border bg-white shadow-md">
      <ul className="text-gray-700s py-2 text-sm" aria-labelledby="avatarButton">
        {buyer?.isSeller && (
          <li className="mx-3 mb-1">
            <Link
              to=""
              className="block w-full cursor-pointer rounded bg-sky-500 px-4s py-2 text-center font-bold text-white hover:bg-sky-400 focus:outline-none"
            >
              {type === 'selling' ? 'Switch to Buying' : 'Switch to Selling'}
            </Link>
          </li>
        )}   
        <li>
          <Link to="" className="block px-4 py-2 hover:text-sky-400">
            Add a new gig
          </Link>
        </li>
        <li>
          <Link to="" className="block px-4 py-2 hover:text-sky-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="" className="block px-4 py-2 hover:text-sky-400">
            Profile
          </Link>
        </li>
        <li>
          <Link to="" className="block px-4 py-2 hover:text-sky-400">
            Settings
          </Link>
        </li>
      </ul>
      <div className="py-1">
        <div className="block px-4 py-2 text-sm hover:text-sky-400" onClick={onLogout}>
          Sign out
        </div>
      </div>
    </div>
  );
};
export default SettingsDropDown;
