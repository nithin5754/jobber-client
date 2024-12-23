import { Dispatch, SetStateAction } from 'react';
import { ISeller } from 'src/features/seller/interfaces/seller.interface';

export interface IGigInfo {
  total: number | string;
  title: string;
  bgColor: string;
}

export interface IShowGigModal {
  image: boolean;
  cancel: boolean;
}

export interface IGigCardItems {
  gig: ISellerGig;
  linkTarget: boolean;
  showEditIcon: boolean;
}



export interface IGigsProps {
  type?: string;
  gig?: ISellerGig;
  gigArray?:ISellerGig[]
}
export interface ISelectedBudget {
  minPrice: string;
  maxPrice: string;
}

export interface ISellerGig {
  id?: string;
  sellerId?: string;
  title: string;
  username?: string;
  profilePicture?: string;
  email?: string;
  description: string;
  active?: boolean;
  categories: string;
  subCategories: string[];
  tags: string[];
  ratingsCount?: number;
  ratingSum?: number;
  // ratingCategories?: IRatingCategories;
  expectedDelivery: string;
  basicTitle: string;
  basicDescription: string;
  price: number;
  coverImage: string;
  createdAt?: Date | string;
  sortId?: number;
}

export type GigType = string | string[] | number | unknown | undefined;

export interface ICreateGig extends Record<string, GigType> {
  // [key: string]: string | string[] | number | undefined;
  sellerId: string;
  title: string;
  categories: string;
  description: string;
  subCategories: string[];
  tags: string[];
  price: number;
  coverImage: string;
  expectedDelivery: string;
  basicTitle: string;
  basicDescription: string;
}

export interface IGigTextLength {
  gigTitle: number;
  basicTitle: number;
  basicDescription: number;
  fullDescription: number;
}

export const GIG_MAX_LENGTH: IGigTextLength = {
  gigTitle: 80,
  basicTitle: 40,
  basicDescription: 100,
  fullDescription: 1200
};

export interface ITagsInputProps {
  title: string;
  placeholder: string;
  gigInfo: ICreateGig;
  tags: string[];
  itemName: string;
  itemInput: string;
  inputErrorMessage: boolean;
  counterText: string;
  setItem: Dispatch<SetStateAction<string[]>>;
  setItemInput: Dispatch<SetStateAction<string>>;
  setGigInfo: Dispatch<SetStateAction<ICreateGig>>;
}

export interface IAllowedGigItem {
  gigTitle: string;
  basicTitle: string;
  basicDescription: string;
  descriptionCharacters: string;
}

export interface IQuilDescription {
  setAllowedLength: Dispatch<SetStateAction<IAllowedGigItem>>;
  allowedLength: IAllowedGigItem;
  gig: ICreateGig;
  setGig: Dispatch<SetStateAction<ICreateGig>>;
}


export interface IGigCreateCoverImg {


  gig: ICreateGig;
  setGig: Dispatch<SetStateAction<ICreateGig>>;
  setIsCoverPage:Dispatch<React.SetStateAction<File | null>>
  isCoverPage: File | null
}

export interface IReduxSellerGig {
  type: string;
  payload: boolean;
}


export interface IGigContext {
  gig: ISellerGig;
  seller: ISeller;
  isSuccess?: boolean;
  isLoading?: boolean;
}



export interface IGigTopProps {
  gigs: ISellerGig[];
  title?: string;
  subTitle?: string;
  category?: string;
  width: string;
  type: string;
}