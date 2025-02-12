

export interface IReview {
  id?: string;
  gigId: string;
  reviewerId: string;
  sellerId: string;
  review: string;
  reviewerImage: string;
  rating: number;
  orderId: string;
  createdAt: Date | string;
  reviewerUsername: string;
  country: string;
  reviewType?: string;
}



export interface IOrderReviewModal {
  buyerReview: boolean;
  sellerReview: boolean;
  buyerPanel: boolean;
  sellerPanel: boolean;
}


export interface IRatingCategoryItem {
  value: number;
  count: number;
}

export interface IRatingCategories {
  five: IRatingCategoryItem;
  four: IRatingCategoryItem;
  three: IRatingCategoryItem;
  two: IRatingCategoryItem;
  one: IRatingCategoryItem;
}

export interface IRatingTypes {
  [key: string]: string;
}
