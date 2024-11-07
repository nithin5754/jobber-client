import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, Suspense, useState } from 'react';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import { IModalBgProps } from 'src/shared/modal/interfaces/modal.interface';
import { IAlertProps, IButtonProps, IResponse, ITextInputProps } from 'src/shared/shared.inferface';
import { FETCH_STATUS } from '../interfaces/auth.interface';
import { useForgotPasswordMutation } from '../services/auth.service';



const LoginModalBg: LazyExoticComponent<FC<IModalBgProps>> = lazy(() => import('src/shared/modal/ModalBg'));
const LoginAlert: LazyExoticComponent<FC<IAlertProps>> = lazy(() => import('src/shared/alert/Alert'));
const LoginButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const LoginTextInput: LazyExoticComponent<ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>> =
  lazy(() => import('src/shared/inputs/TextInput'));

const ForgotPasswordModal: FC<IModalBgProps> = ({ onClose}): ReactElement => {
  const [alertMessage, setAlertMessage] = useState<string>('');

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [status,setStatus]=useState<string>(FETCH_STATUS.IDLE)

  const [email,setEmail]=useState<string>('')


  const handleSubmit = async () => {
    setStatus(FETCH_STATUS.IDLE)
    try {

    if(email){
      let result: IResponse = await forgotPassword(email).unwrap();

       if(result&&result.message){
        setStatus(FETCH_STATUS.SUCCESS)
        setAlertMessage(result.message )
       }
      
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
              <h1 className="flex w-full justify-center">Forgot Password</h1>
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
              <label htmlFor="email or username" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                Email or username
              </label>
              <Suspense>
                <LoginTextInput
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e: ChangeEvent) => setEmail((e.target as HTMLInputElement).value)}
                  className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-sky-500/50 focus:outline-none"
                  placeholder="Enter email"
                />
              </Suspense>
            </div>
          
            <div className="flex w-full items-center justify-center">
              <Suspense>
                <LoginButton
                  testId="submit"
                  disabled={!email||isLoading}
                  onClick={handleSubmit}
                  className={`text-md block w-full cursor-pointer rounded  px-8 py-2 text-center 
          font-bold text-white ${!email ? 'cursor-not-allowed bg-customPurple/50' : 'cursor-pointer bg-customPurple hover:bg-customViolet'}`}
                  label={isLoading ? <FaSpinner className="animate-spin " /> : 'SENT AN EMAIL'}
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
export default ForgotPasswordModal;
  