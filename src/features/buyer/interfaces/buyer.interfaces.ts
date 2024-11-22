


export interface IBuyer {
  id?:string;
  username?:string;
  email?:string;
  profilePicture?:string;
  country?:string;
  isSeller?:boolean;
  purchasedGigs:string[];
  createdAt:string|Date;
  updatedAt:string|Date;
}



export interface IReduxBuyer {
  payload:IBuyer;
  type?:string
}