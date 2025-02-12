import { IAuthUser } from "src/features/auth/interfaces/auth.interface";
import { IBuyer } from "src/features/buyer/interfaces/buyer.interfaces";
import { ICreateGig } from "src/features/gigs/interface/gigi.interface";
import { IRatingTypes } from "src/features/order/interfaces/review.interface";
import { ISeller } from "src/features/seller/interfaces/seller.interface";









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


export const emptySellerData:ISeller={
  id: '',
  profilePublicId: '',
  fullName: '',
  profilePicture: '',
  username: '',
  email: '',
  description: '',
  country: '',
  oneliner: '',
  skills: [],
  ratingsCount: 0,
  ratingSum: 0,
  recentDelivery: '',
  languages: [],
  responseTime: 0,
  experience: [],
  education: [],
  socialLinks: [],
  certificates: [],
  ongoingJobs: 0,
  completedJobs: 0,
  cancelledJobs: 0,
  totalEarnings: 0,
  totalGigs: 0,
  paypal: '',
  createdAt: ''
}


export const emptyGigData: ICreateGig = {
  title: '',
  categories: '',
  description: '',
  subCategories: [],
  tags: [],
  price: 0,   
  coverImage: '',
  expectedDelivery: 'Expected Delivery',
  basicTitle: '',
  basicDescription: '',
  sellerId: ''
};

export const ratingTypes: IRatingTypes = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5'
};