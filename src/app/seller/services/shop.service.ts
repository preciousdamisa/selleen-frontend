import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Shop } from '../models/shop.model';
import { GetShopByIdResBody } from '../types/shop';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  private baseUrl = `${environment.apiUrl}`;

  shop$ = new BehaviorSubject<Shop | null>(null);
  currentShop?: Shop;

  constructor(private http: HttpClient) {}

  getShop(id: string) {
    return this.http
      .get<GetShopByIdResBody>(`${this.baseUrl}shops/${id}`)
      .pipe(tap((res) => this.handleShop(res)));
  }

  handleShop(res: GetShopByIdResBody) {
    const shop = new Shop(
      res.data._id,
      res.data.name,
      res.data.alias,
      res.data.description,
      res.data.email,
      res.data.balance,
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
  }
}
