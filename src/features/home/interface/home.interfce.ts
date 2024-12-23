import { ISellerGig } from "src/features/gigs/interface/gigi.interface";
import { ISeller } from "src/features/seller/interfaces/seller.interface";




export interface ISliderState  {
  slideShow:string;
  slideIndex:number
}


export interface IHomeProps {
  gigs:ISellerGig[];  
  title: string;
  subTitle?: string;
  category?: string;
}



export interface IFeaturedEdExpertsProps {
  sellers:ISeller[]
}



