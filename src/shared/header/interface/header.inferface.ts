import { IAuthUser } from "src/features/auth/interfaces/auth.interface";


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
 
  
}