import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SimpleResBody } from 'src/app/shared/types/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdMgtService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  addProduct(data: any) {
    return this.http.post<SimpleResBody>(`${this.baseUrl}shop/products`, data);
  }
}
