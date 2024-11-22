
import { Dispatch, SetStateAction } from 'react';
import { IAuthUser } from "src/features/auth/interfaces/auth.interface";
import { IBuyer } from "src/features/buyer/interfaces/buyer.interfaces";

export interface IHeader {
  navClass: string;
}


export interface IHeaderModalProps {
  login:boolean;
  register:boolean;
  forgotPassword:boolean;
}



export interface IHomeHeaderProps {
  authUser?:IAuthUser;
  showCategoryContainer?: boolean;
  style?:string;
  type?: string;
  buyer?:IBuyer;
  setIsDropdownOpen?: Dispatch<SetStateAction<boolean>>;
  
 
  
}