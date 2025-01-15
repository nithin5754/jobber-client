import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { ISellerGig } from "src/features/gigs/interface/gigi.interface";
import { IOffer } from "src/features/order/interfaces/order.interface";
import { ISeller } from "src/features/seller/interfaces/seller.interface";

export interface IChatWindowProps {
  chatMessages: IMessage[];
  isError: boolean;
  isLoading: boolean;
  setSkip?: Dispatch<SetStateAction<boolean>>;
}

export interface IChatSellerProps {
  id: string;
  username: string;
  profilePicture: string;
  responseTime: number;
}
export type OnlineUserType = {
  userId: string;
  username: string;
  socketId: string;
};

export interface IChatBuyerProps {
  id: string;
  username: string;
  profilePicture: string;
}
export interface IChatBoxProps {
  seller: IChatSellerProps;
  buyer: IChatBuyerProps;
  gigId: string;
  onClose: () => void;
}

export interface IFilePreviewProps {
  image: string;
  file: File;
  isLoading: boolean;
  message: string;
  handleChange: (event: ChangeEvent) => void;
  onSubmit: (event: FormEvent) => void;
  onRemoveImage: () => void;
}

export interface IMessage {
  id?: string;
  conversationId?: string;
  body?: string;
  url?: string;
  file?: string;
  fileType?: string;
  fileSize?: string;
  fileName?: string;
  gigId?: string;
  sellerId?: string;
  buyerId?: string;
  senderUsername?: string;
  senderPicture?: string;
  receiverUsername?: string;
  receiverPicture?: string;
  isRead?: boolean;
  hasOffer?: boolean;
  offer?: IOffer;
  hasConversationId?: boolean;
  createdAt?: Date | string;
}


export interface IConversation{
  id: string;
  conversationId: string;
  senderUsername: string;
  receiverUsername: string;
}


export interface IChatMessageProps {
  message: IMessage;
  seller?: ISeller;
  gig?: ISellerGig;
}