import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SimpleReqQuery } from 'src/app/shared/types/shared';
import { environment } from 'src/environments/environment';
import { GetOrdersResBody, UpdateOrderStatusData } from '../types/order';

import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root',
})
export class SellerOrdersService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private shopService: ShopService) {}
  getOrders(data: SimpleReqQuery) {
    const params = new HttpParams({ fromObject: { ...data } });

    return this.http.get<GetOrdersResBody>(
      `${this.baseUrl}orders/shop/${this.shopService.currentShop?._id}`,
      { params }
    );
  }

  updateOrderStatus(data: UpdateOrderStatusData) {
    return this.http.put(
      `${this.baseUrl}orders/${this.shopService.currentShop?._id}/${data.orderId}`,
      { status: data.status }
    );
  }
}
