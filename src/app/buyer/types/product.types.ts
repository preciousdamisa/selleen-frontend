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
