

import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, ReactElement, Suspense, useRef, useState } from 'react';
import { FaCamera, FaChevronLeft, FaEye, FaEyeSlash, FaSpinner, FaTimes } from 'react-icons/fa';
import { IModalBgProps } from 'src/shared/modal/interfaces/modal.interface';
import { IAlertProps, IButtonProps, IDropdownProps, ITextInputProps } from 'src/shared/shared.inferface';
import { ISignUpPayload } from '../interfaces/auth.interface';
import { countriesList } from 'src/shared/utils/utils.service';
import { checkImage, readAsBase64 } from 'src/shared/utils/image-utils.service';
import useAuthSchema from '../hooks/useAuthSchema';
import { registerUserSchema } from '../schemas/register.step.schemas';
import { useSignUpMutation } from '../services/auth.service';

const RegisterModalBg: LazyExoticComponent<FC<IModalBgProps>> = lazy(() => import('src/shared/modal/ModalBg'));
const RegisterAlert: LazyExoticComponent<FC<IAlertProps>> = lazy(() => import('src/shared/alert/Alert'));
const RegisterButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const RegisterTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));
const DropDown: LazyExoticComponent<FC<IDropdownProps>> = lazy(() => import('src/shared/dropdown/DropDown'));
const Register: FC<IModalBgProps> = ({ onClose }): ReactElement => {
  const [step, setStep] = useState<1 | 2>(1);
  const [country, setCountry] = useState(countriesList()[0]);
  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
  const [profileImage, setProfileImage] = useState('https://placehold.co/330/220?text=Profile+Image');

  const [showImageSelect, setShowImageSelect] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<ISignUpPayload>({
    browserName: '',
    country: '',
    deviceType: '',
    email: '',
    password: '',
    profilePicture: '',
    username: ''
  });

  const [signUp,{isLoading}]=useSignUpMutation()


  const [schemaValidation,validationErrors] = useAuthSchema({ schema: registerUserSchema, userInfo });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (event: ChangeEvent): Promise<void> => {
    let target: HTMLInputElement = event.target as HTMLInputElement;
    if (target.files) {
      let file: File = target.files[0];
      const isValid: boolean = checkImage(file, 'image');

      if (isValid) {
        const dataImage: string | ArrayBuffer | null = await readAsBase64(file);

        setProfileImage(`${dataImage}`);
        setUserInfo({ ...userInfo, profilePicture: `${dataImage}` });
      }
    }
    setShowImageSelect(false);
  };

  const handleSubmit = async () => {
    let isValid: boolean = await schemaValidation();
    if (isValid) {
      let result=await signUp(userInfo).unwrap()

      console.log(result)
    }else{
      console.log("validation"+isValid);
      console.log("errors msg:",validationErrors);
      
      
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
            <Suspense>
              <RegisterAlert type="error" message="{alertMessage}" />
            </Suspense>
          </div>

          {step === 1 && (
            <div className="relative px-5 py-5">
              <div>
                <label htmlFor="username" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Username
                </label>
                <Suspense>
                  {' '}
                  <RegisterTextInput
                    id="username"
                    name="username"
                    type="text"
                    value={userInfo.username}
                    onChange={(e: ChangeEvent) => setUserInfo({ ...userInfo, username: (e.target as HTMLInputElement).value })}
                    className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-gray-700 bg-gray-300/50 focus:outline-none"
                    placeholder="Enter username"
                  />
                </Suspense>
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Email
                </label>
                <Suspense>
                  {' '}
                  <RegisterTextInput
                    id="email"
                    name="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e: ChangeEvent) => setUserInfo({ ...userInfo, email: (e.target as HTMLInputElement).value })}
                    className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-gray-700 bg-gray-300/50 focus:outline-none"
                    placeholder="Enter email"
                  />
                </Suspense>
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-bold leading-tight tracking-normal text-gray-800">
                  Password
                </label>
                <div className="relative mb-5 mt-2">
                  <div className="absolute right-0 flex h-full cursor-pointer items-center pr-3 text-gray-600">
                    {passwordType === 'password' ? (
                      <FaEyeSlash className="icon icon-tabler icon-tabler-info-circle" onClick={() => setPasswordType('text')} />
                    ) : (
                      <FaEye className="icon icon-tabler icon-tabler-info-circle" onClick={() => setPasswordType('password')} />
                    )}
                  </div>
                  <Suspense>
                    {' '}
                    <RegisterTextInput
                      id="password"
                      name="password"
                      type={passwordType}
                      value={userInfo.password}
                      onChange={(e: ChangeEvent) => setUserInfo({ ...userInfo, password: (e.target as HTMLInputElement).value })}
                      className="mb-5 mt-2 flex h-10 w-full items-center rounded border border-gray-300 pl-3 text-sm font-normal text-gray-600 focus:border focus:border-gray-700 bg-gray-300/50 focus:outline-none"
                      placeholder="Enter password"
                    />
                  </Suspense>
                </div>
              </div>
              <Suspense>
                {' '}
                <RegisterButton
                  disabled={!userInfo.password || !userInfo.email || !userInfo.username}
                  className={`text-md block w-full cursor-pointer rounded  px-8 py-2 text-center font-bold text-white  focus:outline-none ${!userInfo.password || !userInfo.email || !userInfo.username ? 'cursor-not-allowed bg-customPurple/50' : 'cursor-pointer bg-customPurple hover:bg-customViolet'}`}
                  label="Continue"
                  onClick={() => setStep(2)}
                />
              </Suspense>
            </div>
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
                  disabled={!userInfo.profilePicture || !userInfo.country}
                  className={`text-md block w-full cursor-pointer rounded  px-8 py-2 text-center font-bold text-white  focus:outline-none ${!userInfo.profilePicture || !userInfo.country ? 'cursor-not-allowed bg-customPurple/50' : 'cursor-pointer bg-customPurple hover:bg-customViolet'}`}
                  label={isLoading?<FaSpinner className='animate-spin '/>:"SIGNUP"}
                  onClick={handleSubmit}
                />
              </Suspense>
            </div>
          )}
          <hr />
          <div className="px-5 py-4">
            <div className="ml-2 flex w-full justify-center text-sm font-medium">
              <div className="flex justify-center">
                Already a memeber? <p className="ml-2 flex cursor-pointer text-blue-600 hover:underline">Sign In</p>
              </div>
            </div>
          </div>
        </div>
      </RegisterModalBg>
    </Suspense>
  );
};
export default Register;
  