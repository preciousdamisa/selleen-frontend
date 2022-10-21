import { ProductFeature, ProductVariation } from 'src/app/seller/types/product';
import { SocialMediaLink } from 'src/app/seller/types/shop';
import { Address, Image, Price } from 'src/app/shared/types/shared';

export interface ShopByAlias {
  _id: string;
  name: string;
  alias: string;
  description: string;
  logo: Image;
  banners: Image[];
  contactLines: string[];
  address: Address;
  rating: number;
  socialMediaLinks: SocialMediaLink[];
  createdAt: string;
}

export interface GetShopByAliasResBody {
  message: string;
  data: ShopByAlias;
}

export interface BuyerProduct {
  _id: string;
  name: string;
  price: Price;
  images: Image[];
  shop: { id: string; name: string; alias: string };
}

export interface GetBuyerProductsResBody {
  message: string;
  data: BuyerProduct[];
}

export interface BuyerProductDetails {
  _id: string;
  name: string;
  description: string;
  price: Price;
  images: Image[];
  shop: { id: string; name: string; alias: string };
  features: ProductFeature[];
  variation: ProductVariation;
  rating?: number;
}

export interface GetBuyerProductResBody {
  message: string;
  data: BuyerProductDetails;
}
