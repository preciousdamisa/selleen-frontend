import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { SimpleReqQuery } from 'src/app/shared/types/shared';
import { ApproveShopReqBody, GetShopsResBody } from '../types/admin-shop';

@Injectable({
  providedIn: 'root',
})
export class AdminShopService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getShops(data: SimpleReqQuery) {
    const params = new HttpParams({ fromObject: { ...data } });

    return this.http.get<GetShopsResBody>(`${this.baseUrl}admin/shops`, {
      params,
    });
  }

  approveShop(data: ApproveShopReqBody, shopId: string) {
    return this.http.patch(
      `${this.baseUrl}admin/shops/${shopId}/approve`,
      data
    );
  }
}
