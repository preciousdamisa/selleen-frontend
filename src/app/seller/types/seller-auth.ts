import * as sharedTypes from '../../shared/types/shared';

export interface SellerSignupReqBody {
  name: sharedTypes.Name;
  email: string;
  phone: string;
  shopName: string;
  shopPhoneNumber: string[];
  shopEmail: string;
  shopAddress: sharedTypes.Address;
  knowOf: string;
  password: string;
  coords: sharedTypes.Coords;
}
