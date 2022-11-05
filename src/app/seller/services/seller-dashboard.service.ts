import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  GetOrderCountResBody,
  GetTodosResBody,
} from 'src/app/shared/types/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SellerDashboardService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getTodos(shopId: string) {
    return this.http.get<GetTodosResBody>(
      `${this.baseUrl}users/seller/todos/${shopId}`
    );
  }

  getOrderCount(shopId: string) {
    return this.http.get<GetOrderCountResBody>(
      `${this.baseUrl}orders/shop/${shopId}/count`
    );
  }
}
