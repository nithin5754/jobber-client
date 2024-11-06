import { IAuthUser } from "src/features/auth/interfaces/auth.interface";

export interface IReduxState {
   authUser:IAuthUser;
   header:string;
   logout:boolean;
   buyer:object;
   seller:object;
   showCategoryContainer:boolean;
   notification:object
};