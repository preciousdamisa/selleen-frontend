import { Price, Image, Creator } from 'src/app/shared/types/shared';

export type ProductApprovalStatus = 'InReview' | 'Approved' | 'Disapproved';

export interface GetProductsResBody {
  message: string;
  data: Product[];
}

export interface AddOrEditProductReqBody {
  name: string;
  description: string;
  price: Price;
  shopId: string;
  numberInStock: number;
  features: ProductFeature[];
  variation?: ProductVariation;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: Price;
  images: Image[];
  numberInStock: number;
  features: ProductFeature[];
  status: ProductApprovalStatus;
  approved: boolean;
  approval: { comment: string };
  variation: ProductVariation;
  rating: number;
  createdAt: string;
}

export interface DeleteProdReqParams {
  productId: string;
  shopId: string;
}

export interface ProductReview {
  creator: Creator;
  text: string;
  productId: string;
}

export interface AddProdReviewReqBody {
  text: string;
}

export interface ProductFeature {
  name: string;
  details: string;
}

export interface ProductVariation {
  color: string;
  size: string;
  weight: string;
}
