import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, Suspense, useRef, useState } from 'react';
import { FaCamera, FaChevronLeft, FaSpinner, FaTimes } from 'react-icons/fa';
import { IModalBgProps } from 'src/shared/modal/interfaces/modal.interface';
import { IAlertProps, IButtonProps, IDropdownProps, ITextInputProps } from 'src/shared/shared.interface';
import { FETCH_STATUS, ISignUpPayload, IStepProps } from '../interfaces/auth.interface';
import { countriesList, saveToSessionStorage } from 'src/shared/utils/utils.service';
import { readAsBase64 } from 'src/shared/utils/image-utils.service';
import useAuthSchema from '../hooks/useAuthSchema';
import { registerUserSchema } from '../schemas/register.step.schemas';
import { useSignUpMutation } from '../services/auth.service';
import { useAppDispatch } from 'src/store/store';
import { addAuthUser } from '../reducers/auth.reducer';
import { updateLogout } from '../reducers/logout.reducer';
import { updateCategoryContainer } from 'src/shared/header/reducer/category.reducer';
import { updateHeader } from 'src/shared/header/reducer/header.reducer';

const RegisterModalBg: LazyExoticComponent<FC<IModalBgProps>> = lazy(() => import('src/shared/modal/ModalBg'));
const RegisterAlert: LazyExoticComponent<FC<IAlertProps>> = lazy(() => import('src/shared/alert/Alert'));
const RegisterButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const RegisterTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));
const DropDown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));

const RegisterStepOne: LazyExoticComponent<FC<IStepProps>> = lazy(() => import('src/features/auth/components/StepOne.Register'));

const Register: FC<IModalBgProps> = ({ onClose, onToggle }): ReactElement => {
  const [step, setStep] = useState<1 | 2>(1);
  const [country, setCountry] = useState(countriesList()[0]);
  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
  const [profileImage, setProfileImage] = useState('https://placehold.co/330/220?text=Profile+Image');
  const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE);
  const [showImageSelect, setShowImageSelect] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isProfilePicture, setIsProfilePicture] = useState<File | null>(null);
  const [userInfo, setUserInfo] = useState<ISignUpPayload>({
    browserName: '',
    country: '',
    deviceType: '',
    email: '',
    password: '',
    profilePicture: '',
    username: ''
  });

  const dispatch = useAppDispatch();

  const [signUp, { isLoading }] = useSignUpMutation();

  const [schemaValidation, validationErrors] = useAuthSchema({ schema: registerUserSchema, userInfo });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (event: ChangeEvent): Promise<void> => {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.files) {
      let file: File = target.files[0];
      const dataImage: string | ArrayBuffer | null = await readAsBase64(file);
      setProfileImage(`${dataImage}`);
      setIsProfilePicture(file);
    }

    setShowImageSelect(false);
  };

  const handleSubmit = async () => {
    try {
      setAlertMessage('');
      setStatus(FETCH_STATUS.IDLE);
      let isValid: boolean = await schemaValidation();
      if (isProfilePicture && isValid) {
        const formData = new FormData();
        formData.append('username', userInfo.username);
        formData.append('email', userInfo.email);
        formData.append('password', userInfo.password);
        formData.append('country', userInfo.country);
        formData.append('profilePicture', isProfilePicture);
        let result = await signUp(formData).unwrap();
        console.log(result);
        if (result && result.user && result.message) {
          setStatus(FETCH_STATUS.SUCCESS);
          setAlertMessage(result.message as string);
          dispatch(addAuthUser({ authInfo: result.user, token: result.token }));
          dispatch(updateLogout(false));
          saveToSessionStorage(JSON.stringify(true), JSON.stringify(result?.user?.username));
          setUserInfo({
            ...userInfo,
            browserName: '',
            country: '',
            deviceType: '',
            email: '',
            password: '',
            profilePicture: '',
            username: ''
          });
          setProfileImage('');
          setIsProfilePicture(null);
          setCountry(countriesList()[0]);
          dispatch(updateCategoryContainer(true))
          dispatch(updateHeader('home'))
        }
      } else {
        setStatus(FETCH_STATUS.ERROR);
        setAlertMessage(validationErrors[0].email || validationErrors[0].password || validationErrors[0].username);
      }
    } catch (error) {
      setStatus(FETCH_STATUS.ERROR);
      setAlertMessage(error?.data?.message);
    }
  };

  return (
    <Suspense>
      <RegisterModalBg>
        <div className="relative top-[2%] mx-auto w-11/12 max-w-md rounded bg-white md:w-2/3 ">
          <div className="relative px-5 py-5">
            <div className="flex justify-between text-2xl font-bold text-gray-600">
              {step === 2 && (
                <Suspense>
                  <RegisterButton
                    className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
                    type="button"
                    label={<FaChevronLeft className="icon icon-tabler icon-tabler-x" />}
                    onClick={() => setStep(1)}
                  />
                </Suspense>
              )}
              <h1 className="flex w-full justify-center">Join Jobber</h1>
              <Suspense>
                <RegisterButton
                  className="cursor-pointer rounded text-gray-400 hover:text-gray-600"
                  type="button"
                  label={<FaTimes className="icon icon-tabler icon-tabler-x" />}
                  onClick={onClose}
                />
              </Suspense>
            </div>
          </div>
          <div className="flex w-full items-center justify-center px-5 py-5">
            <ol className="flex w-full">
              <li
                className={`flex w-full items-center text-white after:inline-block after:h-1 after:w-full after:border-4 after:border-b ${step === 2 ? " after:border-customPurple after:content-[''] dark:after:border-customPurple" : "after:border-customPurple/50 after:content-[''] dark:after:border-customPurple/50"}`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-customPurple font-bold dark:bg-customPurple lg:h-12 lg:w-12">
                  1
                </span>
              </li>
              <li className="flex items-center">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white lg:h-12 lg:w-12 ${step === 2 ? 'bg-customPurple' : 'bg-customPurple/50'}`}
                >
                  2
                </span>
              </li>
            </ol>
          </div>
          <div className="px-5">
            {alertMessage && (
              <Suspense>
                <RegisterAlert type={status} message={alertMessage} />
              </Suspense>
            )}
          </div>

          {step === 1 && (
            <Suspense>
              <RegisterStepOne
                setUserInfo={setUserInfo}
                userInfo={userInfo}
                setPasswordType={setPasswordType}
                passwordType={passwordType}
                step={step}
                setStep={setStep}
              />
            </Suspense>
          )}

          {step === 2 && (
            <div className="relative px-5 py-5">
              <div className="h-24">
                <label htmlFor="country" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Country
                </label>
                <div id="country" className="relative mb-5 mt-2">
                  <DropDown
                    text={country}
                    maxHeight="200"
                    mainClassNames="absolute bg-white z-50"
                    showSearchInput={true}
                    values={countriesList()}
                    setValue={setCountry}
                    onClick={(item: string) => {
                      setCountry(item);
                      setUserInfo({ ...userInfo, country: item });
                    }}
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="profilePicture" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Profile Picture
                </label>
                <div
                  onMouseEnter={() => setShowImageSelect(true)}
                  onMouseLeave={() => setShowImageSelect(false)}
                  className="relative mb-5 mt-2 w-[20%] cursor-pointer"
                >
                  {profileImage && (
                    <img
                      id="profilePicture"
                      src={profileImage}
                      alt="Profile Picture"
                      className="left-0 top-0 h-20 w-20 rounded-full bg-white object-cover"
                    />
                  )}
                  {!profileImage && (
                    <div className="left-0 top-0 flex h-20 w-20 cursor-pointer justify-center rounded-full bg-[#dee1e7]"></div>
                  )}

                  {showImageSelect && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute left-0 top-0 flex h-20 w-20 cursor-pointer justify-center rounded-full bg-[#dee1e7]"
                    >
                      <FaCamera className="flex self-center" />
                    </div>
                  )}

                  <Suspense>
                    {' '}
                    <RegisterTextInput
                      name="image"
                      ref={fileInputRef}
                      type="file"
                      style={{ display: 'none' }}
                      accept="image/*"
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      onChange={handleChange}
                    />
                  </Suspense>
                </div>
              </div>
              <Suspense>
                {' '}
                <RegisterButton
                  disabled={!isProfilePicture || !userInfo.country}
                  className={`text-md block w-full cursor-pointer rounded  px-8 py-2 text-center font-bold text-white  focus:outline-none ${!isProfilePicture || !userInfo.country ? 'cursor-not-allowed bg-customPurple/50' : 'cursor-pointer bg-customPurple hover:bg-customViolet'}`}
                  label={isLoading ? <FaSpinner className="animate-spin " /> : 'SIGNUP'}
                  onClick={handleSubmit}
                />
              </Suspense>
            </div>
          )}
          <hr />
          <div className="px-5 py-4">
            <div className="ml-2 flex w-full justify-center text-sm font-medium">
              <div className="flex justify-center">
                Already a memeber?{' '}
                <p
                  className="ml-2 flex cursor-pointer text-blue-600 hover:underline"
                  onClick={() => {
                    if (onToggle) {
                      onToggle(true);
                    }
                  }}
                >
                  Sign In
                </p>
              </div>
            </div>
          </div>
        </div>
      </RegisterModalBg>
    </Suspense>
  );
};
export default Register;
