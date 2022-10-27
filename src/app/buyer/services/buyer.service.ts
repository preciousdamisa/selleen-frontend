import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take, exhaustMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import {
  GetBuyerProductsResBody,
  GetShopByAliasResBody,
  GetBuyerProductResBody,
  BuyerSignupReqBody,
} from '../types/buyer.types';
import { GetProductsReqQuery } from '../types/product.types';
import {
  AuthResBody,
  Image,
  SimpleReqQuery,
} from 'src/app/shared/types/shared';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { GetOrdersResBody } from 'src/app/seller/types/order';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  private baseUrl = `${environment.apiUrl}`;

  fetchingProducts = new Subject<string>();

  constructor(private http: HttpClient, private userService: UserAuthService) {}

  signup(data: BuyerSignupReqBody) {
    return this.http
      .post<AuthResBody>(`${this.baseUrl}users/buyers/signup`, data)
      .pipe(
        take(1),
        exhaustMap((res) => this.userService.handleGetUser(res))
      );
  }

  getProducts(
    data: GetProductsReqQuery,
    opts?: { forShop: boolean; shopId?: string }
  ) {
    const params = new HttpParams({ fromObject: { ...data } });
    const url = `${this.baseUrl}${
      opts?.forShop ? 'products/shop/' + opts?.shopId : 'products'
    }`;
    return this.http
      .get<GetBuyerProductsResBody>(url, {
        params,
      })
      .pipe(
        map((res) => {
          const modifiedProds = res.data.map((prod) => {
            const modifiedImages = this.tranformImageUrls(prod.images);
            return { ...prod, images: modifiedImages };
          });

          return modifiedProds;
        })
      );
  }

  getProduct(id: string) {
    return this.http
      .get<GetBuyerProductResBody>(`${this.baseUrl}products/${id}`)
      .pipe(
        map((res) => {
          const modifiedImages = this.tranformImageUrls(res.data.images);
          return { ...res.data, images: modifiedImages };
        })
      );
  }

  tranformImageUrls(images: Image[]) {
    return images.map((img) => ({
      ...img,
      url: environment.sellenAwsBucketUrl + img.url,
    }));
  }

  getShop(alias: string) {
    return this.http.get<GetShopByAliasResBody>(
      `${this.baseUrl}shops/alias/${alias}`
    );
  }

  getOrders(data: SimpleReqQuery) {
    const params = new HttpParams({ fromObject: { ...data } });

    return this.http.get<GetOrdersResBody>(`${this.baseUrl}orders/me`, {
      params,
    });
  }
}
