import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';

import { CartService } from './cart.service';
import { environment } from 'src/environments/environment';
import { SimpleResBody } from 'src/app/shared/types/shared';
import { BankTransferResBody } from '../types/payment.types';
import { SaveOrderReqBody } from '../types/order.types';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private cartService: CartService) {}

  getTotalAmt() {
    return this.cartService.getProdsTotalAmt();
  }

  getBankTransferDetails(data: {
    order: SaveOrderReqBody;
    email: string;
    totalAmount: number;
  }) {
    return this.http
      .put<SimpleResBody>(`${this.baseUrl}orders/save-order`, data.order)
      .pipe(
        take(1),
        exhaustMap(() =>
          this.http.get<BankTransferResBody>(
            `${this.baseUrl}payments/bank-transfer-details`,
            {
              params: new HttpParams({
                fromObject: { email: data.email, amount: data.totalAmount },
              }),
            }
          )
        )
      );
  }
}
