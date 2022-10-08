import { SocialMediaLink } from 'src/app/seller/types/shop';
import { Address, Image } from 'src/app/shared/types/shared';

export interface ShopByAlias {
  _id: string;
  name: string;
  alias: string;
  description: string;
  image: Image;
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
