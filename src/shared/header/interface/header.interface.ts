
import { Dispatch, SetStateAction } from 'react';
import { IAuthUser } from "src/features/auth/interfaces/auth.interface";
import { IBuyer } from "src/features/buyer/interfaces/buyer.interfaces";
import { ISeller } from 'src/features/seller/interfaces/seller.interface';

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
  seller?:ISeller;
  setIsDropdownOpen?: Dispatch<SetStateAction<boolean>>;
  setIsOrderDropdownOpen?: Dispatch<SetStateAction<boolean>>;
  setIsMessageDropdownOpen?: Dispatch<SetStateAction<boolean>>;
  setIsNotificationDropdownOpen?: Dispatch<SetStateAction<boolean>>;
 
  
}


export interface IReduxHeader {
  type: string;
  payload: string;
}

export interface IReduxShowCategory {
  type: string;
  payload: boolean;
}
