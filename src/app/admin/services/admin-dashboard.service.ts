import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GetEntityCountResBody } from 'src/app/shared/types/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getBuyerCount() {
    return this.http.get<GetEntityCountResBody>(
      `${this.baseUrl}admin/buyers/count`
    );
  }

  getSellerCount() {
    return this.http.get<GetEntityCountResBody>(
      `${this.baseUrl}admin/sellers/count`
    );
  }

  getProductCount() {
    return this.http.get<GetEntityCountResBody>(
      `${this.baseUrl}admin/products/count`
    );
  }
}
