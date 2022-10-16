import { Address, Coords, Name } from 'src/app/shared/types/shared';
import { CartProduct } from './product.types';

export type DeliveryMedium = 'Pickup' | 'Rider' | 'Driver';

export interface SaveOrderReqBody {
  name: Name;
  phone: string;
  address: Address;
  note?: string;
  coords: Coords;
  products: CartProduct[];
  delivery: {
    medium: DeliveryMedium;
  };
}
