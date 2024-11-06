import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, Suspense, useState } from 'react';
import { FaEye, FaSpinner, FaTimes } from 'react-icons/fa';

import { IModalBgProps } from 'src/shared/modal/interfaces/modal.interface';

import { IAlertProps, IButtonProps, IResponse, ITextInputProps } from 'src/shared/shared.inferface';
import { ISignInPayload } from '../interfaces/auth.interface';
import { useAppDispatch } from 'src/store/store';
import { loginUserSchema } from '../schemas/register.step.schemas';
import useAuthSchema from '../hooks/useAuthSchema';
import { useSigInMutation } from '../services/auth.service';
import { addAuthUser } from '../reducers/auth.reducer';
import { saveToSessionStorage } from 'src/shared/utils/utils.service';
import { updateLogout } from '../reducers/logout.reducer';

const LoginModalBg: LazyExoticComponent<FC<IModalBgProps>> = lazy(() => import('src/shared/modal/ModalBg'));
const LoginAlert: LazyExoticComponent<FC<IAlertProps>> = lazy(() => import('src/shared/alert/Alert'));
const LoginButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const LoginTextInput: LazyExoticComponent<ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>> =
  lazy(() => import('src/shared/inputs/TextInput'));

const LoginModal: FC<IModalBgProps> = ({ onClose, onToggle, onTogglePassword }): ReactElement => {
  const [alertMessage, setAlertMessage] = useState<string>('');

  const [signIn, { isLoading }] = useSigInMutation();

  const [userInfo, setUserInfo] = useState<ISignInPayload>({
    username: '',
    password: '',
    browserName: '',
    deviceType: ''
  });

  const [schemaValidation, validationError] = useAuthSchema({ schema: loginUserSchema, userInfo });

  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      const isValid: boolean = await schemaValidation();

      if (isValid) {
        const formData = new FormData();
        formData.append('username', userInfo.username);
        formData.append('password', userInfo.password);

        let result: IResponse = await signIn(formData).unwrap();

        if (result) {
          dispatch(addAuthUser(result.user));
          dispatch(updateLogout(false));
          saveToSessionStorage(JSON.stringify(true), JSON.stringify(result.user?.username));
        } else {
          setAlertMessage(validationError[0].password || validationError[0].username);
        }
      }
    } catch (error) {
      setAlertMessage(error?.data?.message);
    }
  };

  return (
    <Suspense>
      <LoginModalBg>
        <div className="relative top-[20%] mx-auto w-11/12 max-w-md rounded-lg bg-white md:w-2/3">
          <div className="relative px-5 py-5">
            <div className="mb-5 flex justify-between text-2xl font-bold text-gray-600">
              <h1 className="flex w-full justify-center">Sign In to Jobber</h1>
              <Suspense>
                <LoginButton
                  onClick={onClose}
                  testId="closeModal"
                  className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
                  type="button"
                  label={<FaTimes className="icon icon-tabler icon-tabler-x" />}
                />
              </Suspense>
            </div>
            {alertMessage && (
              <Suspense>
                <LoginAlert type="error" message={alertMessage} />
              </Suspense>
            )}
            <div>
              <label htmlFor="email or username" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Email or username
              </label>
              <Suspense>
                <LoginTextInput
                  id="username"
                  name="username"
                  type="text"
                  value={userInfo.username}
                  onChange={(e: ChangeEvent) => setUserInfo({ ...userInfo, username: (e.target as HTMLInputElement).value })}
                  className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                  placeholder="Enter username"
                />
              </Suspense>
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Password
              </label>
              <div className="relative mb-2 mt-2">
                <div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600">
                  <FaEye />
                </div>
                <Suspense>
                  <LoginTextInput
                    id="password"
                    name="password"
                    type="password"
                    value={userInfo.password}
                    onChange={(e: ChangeEvent) => setUserInfo({ ...userInfo, password: (e.target as HTMLInputElement).value })}
                    className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                    placeholder="Enter password"
                  />
                </Suspense>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="mb-6 ml-2 cursor-pointer text-sm text-customPurple hover:underline dark:text-customPurple">
                Forgot Password?
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <Suspense>
                <LoginButton
                  testId="submit"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="text-md block w-full cursor-pointer rounded bg-customPurple px-8 py-2 text-center 
          font-bold text-white hover:bg-customPurple focus:outline-none"
                  label={isLoading ? <FaSpinner className="animate-spin " /> : 'LOGIN'}
                />
              </Suspense>
            </div>
          </div>
          <hr />
          <div className="px-5 py-4">
            <div className="ml-2 flex w-full justify-center text-sm font-medium">
              <div className="flex justify-center">
                Not yet a memeber? <p className="ml-2 flex cursor-pointer text-customPurple hover:underline">Join Now</p>
              </div>
            </div>
          </div>
        </div>
      </LoginModalBg>
    </Suspense>
  );
};
export default LoginModal;