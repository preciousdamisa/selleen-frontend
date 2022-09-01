import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { SellerSignupReqBody } from '../types/seller-auth';
import { AuthResBody } from 'src/app/shared/types/shared';

@Injectable({
  providedIn: 'root',
})
export class SellerAuthService {
  private baseUrl = `${environment.apiUrl}`;

  // admin$ = new BehaviorSubject<Admin | null>(null);

  private timerRef: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(data: SellerSignupReqBody) {
    return this.http.post<AuthResBody>(
      `${this.baseUrl}users/sellers/signup`,
      data
    );
  }
}
