import { IAuthUser } from "src/features/auth/interfaces/auth.interface";
import { IBuyer } from "src/features/buyer/interfaces/buyer.interfaces";









export const initialAuthUserValues:IAuthUser = {
  profilePublicId:null,
  country: null,
  createdAt: null,
  email: null,
  emailVerificationToken: null,
  emailVerified: null,
  id: null,
  passwordResetExpires: null,
  passwordResetToken: null,
  profilePicture: null,
  updatedAt: null,
  username: null
};



export const initialBuyerDetailsValue:IBuyer={
  country:'',
  email:'',
  id:'',
  isSeller:false,
  profilePicture:'',
  username:'',
  purchasedGigs: [],
  createdAt: "",
  updatedAt: ""
}

