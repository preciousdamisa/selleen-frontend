import { Address, Creator, Image } from 'src/app/shared/types/shared';
import {
  PaymentDetails,
  PersonalId,
  ShopRelation,
  ShopStatus,
  SocialMediaLink,
} from '../types/shop';

export class Shop {
  constructor(
    public _id: string,
    public name: string,
    public alias: string,
    public description: string,
    public email: string,
    public logo: Image,
    public coverImages: Image[],
    public creator: Creator,
    public owners: ShopRelation[],
    public supportStaff: ShopRelation[],
    public supportLines: string[],
    public tags: string[],
    public address: Address,
    public rating: number,
    public socialMediaLinks: SocialMediaLink[],
    public personalIds: PersonalId[],
    public approved: boolean,
    public approval: { comment: string },
    public status: ShopStatus,
    public paymentDetails: PaymentDetails
  ) {}
}
