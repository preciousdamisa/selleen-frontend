import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { GetBuyerProductsResBody, GetProductsReqQuery } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class BuyerService {
  private baseUrl = `${environment.apiUrl}`;

  fetchingProducts = new Subject<string>();

  constructor(private http: HttpClient) {}

  getProducts(data: GetProductsReqQuery) {
    const params = new HttpParams({ fromObject: { ...data } });

    return this.http.get<GetBuyerProductsResBody>(`${this.baseUrl}products`, {
      params,
    });
  }
}
