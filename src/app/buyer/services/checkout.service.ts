import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CartService } from './cart.service';
import { environment } from 'src/environments/environment';
import { PlaceOrderReqBody } from '../types/product.types';
import { SimpleResBody } from 'src/app/shared/types/shared';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private cartService: CartService) {}

  getTotalAmt() {
    return this.cartService.getProdsTotalAmt();
  }

  placeOrder(data: PlaceOrderReqBody) {
    return this.http.post<SimpleResBody>(`${this.baseUrl}orders`, data);
  }
}
