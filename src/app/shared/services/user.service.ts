import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Address } from '../types/shared';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  updatePhone(data: { phone: string }) {
    return this.http.patch(`${this.baseUrl}users/me/update-phone`, data);
  }

  updateAddress(data: Address) {
    return this.http.patch(`${this.baseUrl}users/me/update-address`, data);
  }
}
