import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { exhaustMap, take, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Shop } from '../models/shop.model';
import { SimpleResBody } from 'src/app/shared/types/shared';
import { GetShopByIdResBody, UpdateShopReqBody } from '../types/shop';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private baseUrl = `${environment.apiUrl}`;

  shop$ = new BehaviorSubject<Shop | null>(null);
  currentShop?: Shop;
  shopUpdated = false;

  constructor(private http: HttpClient) {}

  getShop(id: string) {
    let req: Observable<GetShopByIdResBody>;

    const storageResult = this.lookupStorage();

    if (storageResult && !this.shopUpdated) req = storageResult;
    else req = this.http.get<GetShopByIdResBody>(`${this.baseUrl}shops/${id}`);

    return req.pipe(tap((res) => this.handleShop(res)));
  }

  lookupStorage(): Observable<GetShopByIdResBody> | null {
    const shopData = localStorage.getItem('shopData');
    if (!shopData) return null;

    const parsedShopData = JSON.parse(shopData);

    return new Observable<GetShopByIdResBody>((subscriber) => {
      subscriber.next(parsedShopData);
      subscriber.complete();
    });
  }

  handleShop(res: GetShopByIdResBody) {
    const shop = new Shop(
      res.data._id,
      res.data.name,
      res.data.alias,
      res.data.description,
      res.data.email,
      res.data.logo,
      res.data.coverImages,
      res.data.creator,
      res.data.owners,
      res.data.supportStaff,
      res.data.supportLines,
      res.data.tags,
      res.data.address,
      res.data.rating,
      res.data.socialMediaLinks,
      res.data.personalIds,
      res.data.approved,
      res.data.approval,
      res.data.status,
      res.data.paymentDetails
    );

    this.shop$.next(shop);
    this.currentShop = shop;
    this.shopUpdated = false;

    localStorage.setItem('shopData', JSON.stringify(res));
  }

  updateShop(data: UpdateShopReqBody, shopId: string) {
    return this.http
      .patch<SimpleResBody>(`${this.baseUrl}shops/${shopId}`, data)
      .pipe(
        take(1),
        tap(() => (this.shopUpdated = true)),
        exhaustMap(() => this.getShop(shopId))
      );
  }
}
