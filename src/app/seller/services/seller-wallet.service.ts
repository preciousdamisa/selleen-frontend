import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { SimpleReqQuery } from '../../shared/types/shared';
import {
  GetBalanceResBody,
  GetTransactionsResBody,
  InitiateWithdrawalReqBody,
} from '../types/transaction';

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

  getBalance(shopId: string) {
    return this.http.get<GetBalanceResBody>(
      `${this.baseUrl}transactions/shop/${shopId}/balance`
    );
  }

  getTotalWithdrawal(shopId: string) {
    return this.http.get<GetBalanceResBody>(
      `${this.baseUrl}transactions/shop/${shopId}/total-withdrawal`
    );
  }

  getTotalRevenue(shopId: string) {
    return this.http.get<GetBalanceResBody>(
      `${this.baseUrl}transactions/shop/${shopId}/total-revenue`
    );
  }

  initiateWithdrawal(data: InitiateWithdrawalReqBody) {
    return this.http.post(
      `${this.baseUrl}transactions/shop/initiate-withdrawal`,
      data
    );
  }
}
