import { CartProduct } from 'src/app/buyer/types/product.types';
import { UserShop } from 'src/app/seller/types/shop';
import { Name, Address } from './shared';

export interface GetUserResBody {
  message: string;
  data: {
    _id: string;
    name: Name;
    phone: string;
    email: string;
    address?: Address;
    cart: CartProduct[];
    hasShop: boolean;
    shops: UserShop[];
  };
}

export interface ChangePwReqBody {
  oldPassword: string;
  newPassword: string;
}
