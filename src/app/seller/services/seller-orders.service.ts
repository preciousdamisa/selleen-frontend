import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SimpleReqQuery } from 'src/app/shared/types/shared';
import { environment } from 'src/environments/environment';
import { GetOrdersResBody } from '../types/order';

@Injectable({
  providedIn: 'root',
})
export class SellerOrdersService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}
  getOrders(data: SimpleReqQuery, shopId: string) {
    const params = new HttpParams({ fromObject: { ...data } });

    return this.http.get<GetOrdersResBody>(
      `${this.baseUrl}orders/shop/${shopId}`,
      { params }
    );
  }
}
