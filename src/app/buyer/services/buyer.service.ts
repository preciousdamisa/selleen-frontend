import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  GetBuyerProductsResBody,
  GetShopByAliasResBody,
  GetBuyerProductResBody,
} from '../types/buyer.types';
import { GetProductsReqQuery } from '../types/product.types';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  private baseUrl = `${environment.apiUrl}`;

  fetchingProducts = new Subject<string>();

  constructor(private http: HttpClient) {}

  getProducts(
    data: GetProductsReqQuery,
    opts?: { forShop: boolean; shopId?: string }
  ) {
    const params = new HttpParams({ fromObject: { ...data } });
    const url = `${this.baseUrl}${
      opts?.forShop ? 'products/shop/' + opts?.shopId : 'products'
    }`;
    return this.http.get<GetBuyerProductsResBody>(url, {
      params,
    });
  }

  getProduct(id: string) {
    return this.http.get<GetBuyerProductResBody>(
      `${this.baseUrl}products/${id}`
    );
  }

  getShop(alias: string) {
    return this.http.get<GetShopByAliasResBody>(
      `${this.baseUrl}shops/alias/${alias}`
    );
  }
}
