

export interface IChatSellerProps {
  id: string;
  username: string;
  profilePicture: string;
  responseTime: number;
}

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
