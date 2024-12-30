import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, Suspense, useState } from 'react';
import { FaEye, FaEyeSlash, FaSpinner, FaTimes } from 'react-icons/fa';
import { IModalBgProps } from 'src/shared/modal/interfaces/modal.interface';
import { IAlertProps, IButtonProps, IResponse, ITextInputProps } from 'src/shared/shared.interface';
import { FETCH_STATUS, IResetPassword } from '../interfaces/auth.interface';

import { resetPasswordSchema } from '../schemas/register.step.schemas';
import useAuthSchema from '../hooks/useAuthSchema';
import { useResetPasswordMutation } from '../services/auth.service';
import { useSearchParams } from 'react-router-dom';



const LoginModalBg: LazyExoticComponent<FC<IModalBgProps>> = lazy(() => import('src/shared/modal/ModalBg'));
const LoginAlert: LazyExoticComponent<FC<IAlertProps>> = lazy(() => import('src/shared/alert/Alert'));
const LoginButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const LoginTextInput: LazyExoticComponent<ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>> =
  lazy(() => import('src/shared/inputs/TextInput'));

const ResetPasswordModal: FC<IModalBgProps> = ({ onClose }): ReactElement => {
  const [alertMessage, setAlertMessage] = useState<string>('');

  const [passwordType, setPasswordType] = useState<{
    password: 'password' | 'text';
    confirm_password: 'password' | 'text';
  }>({
    confirm_password: 'password',
    password: 'password'
  });
  const [searchParams] = useSearchParams({});
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [status,setStatus]=useState<string>(FETCH_STATUS.IDLE)

  const [userInfo, setUserInfo] = useState<IResetPassword>({
    confirmPassword: '',
    password: ''
  });

  const [schemaValidation, validationError] = useAuthSchema({ schema: resetPasswordSchema, userInfo });


  const handleSubmit = async () => {
    try {
      const isValid: boolean = await schemaValidation();

      setStatus(FETCH_STATUS.IDLE)
      let fetchData:IResetPassword={
        token:searchParams.get('v_token')?.toString() as string,
        confirmPassword:userInfo.confirmPassword,
        password:userInfo.password
      }

      if (isValid) {
        let result: IResponse = await resetPassword(fetchData).unwrap();
        if (result&&result.message) {
          setStatus(FETCH_STATUS.SUCCESS)
          setAlertMessage(result.message);
          setUserInfo({
            confirmPassword: '',
            password: ''
          });
        }
      } else {
        setStatus(FETCH_STATUS.ERROR)
        setAlertMessage(validationError[0].password || validationError[0].username);
      }
    } catch (error) {
      setStatus(FETCH_STATUS.ERROR)
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
                <LoginAlert type={status} message={alertMessage} />
              </Suspense>
            )}

            <div>
              <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Password
              </label>
              <div className="relative mb-2 mt-2">
                <div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600">
                  {passwordType.password === 'password' ? (
                    <FaEyeSlash
                      className="icon icon-tabler icon-tabler-info-circle"
                      onClick={() => setPasswordType({ ...passwordType, password: 'text' })}
                    />
                  ) : (
                    <FaEye
                      className="icon icon-tabler icon-tabler-info-circle"
                      onClick={() => setPasswordType({ ...passwordType, password: 'password' })}
                    />
                  )}
                </div>
                <Suspense>
                  <LoginTextInput
                    id="password"
                    name="password"
                    type={passwordType.password}
                    value={userInfo.password}
                    onChange={(e: ChangeEvent) => setUserInfo({ ...userInfo, password: (e.target as HTMLInputElement).value })}
                    className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                    placeholder="Enter password"
                  />
                </Suspense>
              </div>
            </div>

            {/* confirm password section start here  */}

            <div>
              <label htmlFor="confirm_password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Confirm Password
              </label>
              <div className="relative mb-2 mt-2">
                <div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600">
                  {passwordType.confirm_password === 'password' ? (
                    <FaEyeSlash className="icon icon-tabler icon-tabler-info-circle"    onClick={() => setPasswordType({ ...passwordType, confirm_password: 'password' })}/>
                  ) : (
                    <FaEye className="icon icon-tabler icon-tabler-info-circle"    onClick={() => setPasswordType({ ...passwordType, confirm_password: 'password' })} />
                  )}
                </div>
                <Suspense>
                  <LoginTextInput
                    id="confirm_password"
                    name="password"
                    type={passwordType.confirm_password}
                    value={userInfo.confirmPassword}
                    onChange={(e: ChangeEvent) => setUserInfo({ ...userInfo, confirmPassword: (e.target as HTMLInputElement).value })}
                    className="flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                    placeholder="Confirm password"
                  />
                </Suspense>
              </div>
            </div>
            <div className="flex w-full items-center justify-center">
              <Suspense>
                <LoginButton
                  testId="submit"
                  disabled={!userInfo.confirmPassword || !userInfo.password}
                  onClick={handleSubmit}
                  className={`text-md block w-full cursor-pointer rounded  px-8 py-2 text-center 
          font-bold text-white ${!userInfo.password || !userInfo.confirmPassword ? 'cursor-not-allowed bg-customPurple/50' : 'cursor-pointer bg-customPurple hover:bg-customViolet'}`}
                  label={isLoading ? <FaSpinner className="animate-spin " /> : 'RESET PASSWORD'}
                />
              </Suspense>
            </div>
          </div>
          <hr />
        </div>
      </LoginModalBg>
    </Suspense>
  );
};
export default ResetPasswordModal;
