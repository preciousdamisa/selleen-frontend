import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GetProductsResBody } from 'src/app/seller/types/product';
import {
  ApproveEntityReqBody,
  SimpleReqQuery,
} from 'src/app/shared/types/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminProductsService {
  private baseUrl = `${environment.apiUrl}`;

  productsChanged = new Subject<void>();

  constructor(private http: HttpClient) {}

  getProducts(data: SimpleReqQuery) {
    const params = new HttpParams({ fromObject: { ...data } });

    return this.http.get<GetProductsResBody>(`${this.baseUrl}admin/products`, {
      params,
    });
  }

  approveProduct(data: ApproveEntityReqBody, prodId: string) {
    return this.http
      .patch(`${this.baseUrl}admin/products/${prodId}/approve`, data)
      .pipe(tap(() => this.productsChanged.next()));
  }
}
