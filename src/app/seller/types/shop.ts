import { Address, Creator, Name, Image } from 'src/app/shared/types/shared';

export type ShopStatus = 'InReview' | 'Approved' | 'Suspended';

interface Shop {
  _id: string;
  shortId: string;
  name: string;
  alias: string;
  description: string;
  email: string;
  balance: number;
  logo: Image;
  coverImages: Image[];
  creator: Creator;
  owners: ShopRelation[];
  managers: ShopRelation[];
  supportStaff: ShopRelation[];
  supportLines: string[];
  tags: string[];
  address: Address;
  rating: number;
  socialMediaLinks: SocialMediaLink[];
  personalIds: PersonalId[];
  approved: boolean;
  approval: { comment: string };
  status: 'InReview' | 'Approved' | 'Suspended';
  paymentDetails: PaymentDetails;
}
export interface GetShopByIdResBody {
  message: string;
  data: Shop;
}

export interface UpdateShopReqBody {
  alias: string[];
  supportLines: string[];
  address: Address;
  description: string;
}

export interface UserShop {
  name: string;
  id: string;
}

export interface Role {
  name: 'Owner' | 'Manager' | 'SupportStaff';
  shopId: string;
}

export interface ShopRelation {
  name: Name;
  userId: string;
}

export interface SocialMediaLink {
  name: 'Facebook' | 'Instagram' | 'Twitter';
  url: string;
}

export interface PersonalId {
  type: 'NationalId' | 'PVC' | 'DriverLicense';
  image: {
    url: string;
  };
}

export interface PaymentDetails {
  bankAccountDetails: {
    accountName: string;
    accountType: string;
    accountNumber: string;
  };
}
