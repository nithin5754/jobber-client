import { FC } from "react"

import { IHeaderModalProps } from "../header/interface/header.inferface"




const SideBar:FC<{setShowModal:React.Dispatch<React.SetStateAction<IHeaderModalProps>>}&{isOpen:boolean}> = ({isOpen,setShowModal}) => {



  return (
   
    <div
    className={`fixed  left-0 bottom-0 h-full w-[300px] z-20 transform transition-transform duration-300 bg-black/95 lg:hidden ${
      isOpen ? "translate-x-0" : "-translate-x-full "
    }`}
  >
    
      <div className="h-full flex flex-col items-center  justify-center">
      <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
                <ul className="space-y-6 text-base font-medium tracking-wide lg:flex lg:space-y-0 lg:text-sm">
                  <li>
                    <div className="hover:text-primary  dark:hover:text-primaryLight block transition md:px-4">
                      <span className="text-md">Become a Seller</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-8 mb-8"></div>

              <div className="mx-4 ">
                <div
                  onClick={() => setShowModal((item: IHeaderModalProps) => ({ ...item, login: true }))}
                  className=" relative ml-auto flex h-9 items-center justify-center before:absolute
                            before:inset-0 before:rounded-full before:transition before:duration-300
                            hover:before:scale-105 focus:before:bg-sky-600/10 active:duration-75 active:before:scale-95
                            dark:focus:before:bg-sky-400/10 sm:px-6  min-w-[100px] border rounded-md  "
                >
                  <span className="relative  font-semibold text-gray-600 text-xl  dark:text-gray-300 ">Sign In</span>
                </div>
                <div className="my-3"></div>
                <div
                 onClick={() => setShowModal((item: IHeaderModalProps) => ({ ...item, register: true }))}
                  className="relative  ml-auto flex  items-center justify-center rounded-md bg-customViolet/40 hover:bg-customPurple transition-all
                       min-w-[100px]   text-white font-bold sm:px-6 "
                >
                  <span className="relative  text-lg py-2    font-semibold text-white">Sign Up</span>
                </div>
              </div>
      </div>
    
    
    </div>
  )
}
export default SideBar