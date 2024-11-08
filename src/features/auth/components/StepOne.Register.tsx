import { ChangeEvent, FC, ForwardRefExoticComponent, lazy, LazyExoticComponent, Suspense } from "react"
import {  IStepProps } from "../interfaces/auth.interface"
import {  IButtonProps,  ITextInputProps } from "src/shared/shared.inferface";
import { FaEye, FaEyeSlash } from "react-icons/fa";




const RegisterButton: LazyExoticComponent<FC<IButtonProps>> = lazy(() => import('src/shared/button/Button'));
const RegisterTextInput: LazyExoticComponent<
  ForwardRefExoticComponent<Omit<ITextInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>
> = lazy(() => import('src/shared/inputs/TextInput'));




const StepOne:FC<IStepProps> = ({setUserInfo,userInfo,setPasswordType,passwordType,setStep}) => {
  return (
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
  )
}
export default StepOne