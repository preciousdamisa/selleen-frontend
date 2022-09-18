import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SimpleReqQuery, SimpleResBody } from 'src/app/shared/types/shared';
import { environment } from 'src/environments/environment';
import {
  AddOrEditProductReqBody,
  GetProductsResBody,
  Product,
} from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class SellerProductsService {
  private baseUrl = `${environment.apiUrl}`;

  private _selectedProduct: Product | null = null;

  constructor(private http: HttpClient) {}

  get selectedProduct() {
    return this._selectedProduct;
  }

  set selectedProduct(p) {
    this._selectedProduct = p;
  }

  addProduct(data: AddOrEditProductReqBody) {
    return this.http.post<SimpleResBody>(`${this.baseUrl}shop/products`, data);
  }

  editProduct(data: AddOrEditProductReqBody, prodId: string) {
    return this.http.put<SimpleResBody>(
      `${this.baseUrl}shop/products/${prodId}`,
      data
    );
  }

  getProducts(data: SimpleReqQuery, shopId: string) {
    const params = new HttpParams({ fromObject: { ...data } });

    return this.http.get<GetProductsResBody>(
      `${this.baseUrl}shop/products/${shopId}`,
      { params }
    );
  }
}
