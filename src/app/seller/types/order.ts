import { Address, Name } from 'src/app/shared/types/shared';

export interface Shop {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  shopId: string;
  price: number;
  quantity: number;
  amount: number;
}

export interface Order {
  _id: string;
  shortId: string;
  shop: Shop;
  user: {
    _id: string;
    name: Name;
    phone: string;
    address: Address;
  };
  delivery: { method: string };
  status: 'Processing' | 'En Route' | 'Delivered';
  products: Product[];
  totalAmount: number;
  createdAt: string;
}

export interface GetOrdersResBody {
  message: string;
  data: Order[];
}
