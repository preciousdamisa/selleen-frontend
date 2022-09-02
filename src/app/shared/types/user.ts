import { CartProduct } from 'src/app/buyer/types/product';
import { Name, Address } from './shared';

export interface GetUserResBody {
  message: string;
  data: {
    _id: string;
    name: Name;
    phone: string;
    email: string;
    address: Address;
    cart: CartProduct[];
    hasShop: boolean;
  };
}
