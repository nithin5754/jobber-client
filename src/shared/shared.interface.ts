import { ChangeEvent, CSSProperties, Dispatch, KeyboardEvent, ReactNode, SetStateAction } from 'react';
import { IAuthUser, ISignUpPayload } from 'src/features/auth/interfaces/auth.interface';
import { IBuyer } from 'src/features/buyer/interfaces/buyer.interfaces';
import { IConversation, IMessage } from 'src/features/chat/interface/chat.interface';
import { ISellerGig } from 'src/features/gigs/interface/gigi.interface';
import { ISeller } from 'src/features/seller/interfaces/seller.interface';


export type validationErrorsType =
| ISignUpPayload

export interface IResponse {
  message?:string;
  token?:string;
  user?:IAuthUser;
  buyer?:IBuyer;
  gig?:ISellerGig;
  gigArray?:ISellerGig[]
  totalGigLength?:number
  seller?:ISeller,
  sellerArray?:ISeller[],
  browserName?: string;
  conversations?: IConversation[] | IMessage[];
  messages?: IMessage[];
  messageData?: IMessage;
  conversationId?: string;
  deviceType?: string;
}
export interface IHtmlParserProps {
  input: string;
}

export type AuthEndPointsTypes =
 |'REGISTER'
 | 'LOGIN'
 | 'VERIFY_EMAIL'
 | 'FORGOT_PASSWORD'
 |'RESET_PASSWORD'
 | 'CURRENT_USER'
| 'SIGN_OUT'
| 'RESEND_EMAIL'


 
export interface IButtonProps {
  label?: string |ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  id?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event?: any) => void;
  role?:string;
  disabled?: boolean;
  testId?: string;
}


export interface ITextInputProps {
  id?: string;
  name?: string;
  type?: string;
  value?: string | number;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
  readOnly?: boolean;
  checked?: boolean;
  accept?:string;
  rows?: number;
  autoFocus?: boolean;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  onChange?: (event: ChangeEvent) => void;
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyUp?: () => void;
  onKeyDown?: (event: KeyboardEvent) => void
}


export interface IAlertProps {
  type: string;
  message: string;
}


export interface IAlertTypes {
  [key: string]: string;
  success: string;
  error: string;
  warning: string;
}


export interface IDropdownProps {
  text: string;
  values: string[];
  maxHeight: string;
  mainClassNames?: string;
  dropdownClassNames?: string;
  showSearchInput?: boolean;
  style?: CSSProperties;
  setValue?: Dispatch<SetStateAction<string>>;
  onClick?: (item: string) => void;
}



export interface IBannerProps {

  bgColor:string;
  text:string;
  showLink:boolean;
  linkText:string;
  onClick?:()=>void;

}



export interface ISliderImagesText {
  header: string;
  subHeader: string;
}


export interface IStartRatingProps {
   value?:number;
   size?:number;
   setReviewRating?:Dispatch<SetStateAction<number>>
}



export interface IBreadCrumbProps {
  breadCrumbItems: string[];
}


export interface IGigCardItemModal {
  overlay: boolean;
  deleteApproval: boolean;
}

