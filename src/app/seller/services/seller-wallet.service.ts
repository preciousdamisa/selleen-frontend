import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { SimpleReqQuery } from '../../shared/types/shared';
import { GetTransactionsResBody } from '../types/transaction';

@Injectable({
  providedIn: 'root',
})
export class SellerWalletService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getTransactions(shopId: string, data: SimpleReqQuery) {
    const params = new HttpParams({ fromObject: { ...data } });

    return this.http.get<GetTransactionsResBody>(
      `${this.baseUrl}transactions/shop/${shopId}`,
      {
        params,
      }
    );
  }
}
