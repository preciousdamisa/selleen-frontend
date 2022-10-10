import { Address, Coords, Name } from 'src/app/shared/types/shared';

export interface CartProduct {
  name: string;
  productId: string;
  price: number;
  quantity: number;
  shopId: string;
}

export interface AddToCartReqBody {
  productId: string;
  quantity: number;
}

export interface AddToCartResBody {
  message: string;
  data: CartProduct[];
}

export interface GetProductsReqQuery {
  searchText: string;
  pageNumber: number;
  pageSize: number;
  lat?: number;
  lng?: number;
}

export interface PlaceOrderReqBody {
  name: Name;
  phone: string;
  address: Address;
  note?: string;
  coords: Coords;
  products: CartProduct[];
}
