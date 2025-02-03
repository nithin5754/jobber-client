import { useAuthDetails } from "src/features/auth/reducers/auth.reducer";
import { useAppSelector } from "src/store/store";
import Header from "../header/components/Header";
import HomeHeader from "../header/components/HomeHeader";

import Footer from "./Footer";
import { FC, ReactNode } from "react";


interface IFooterLayoutProps {
  children:ReactNode
}

const FooterLayout:FC<IFooterLayoutProps> = ({children}) => {
    const authUser = useAppSelector(useAuthDetails);

  return (
   <div>
   
   {
    !authUser||!authUser.username?(
      <Header
      navClass={
        'navbar peer-checked:navbar-active  top-0 z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur  dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none'
      }/>
    ):<HomeHeader />
   }
   {children}
   <Footer/>
   </div>
  )
}
export default FooterLayout