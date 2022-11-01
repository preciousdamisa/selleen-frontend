import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SellerSignupReqBody } from '../types/seller-auth';
import { AuthResBody } from 'src/app/shared/types/shared';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
@Injectable({
  providedIn: 'root',
})
export class SellerService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private userService: UserAuthService) {}

  signup(data: SellerSignupReqBody) {
    return this.http
      .post<AuthResBody>(`${this.baseUrl}users/sellers/signup`, data)
      .pipe(
        take(1),
        exhaustMap((res) => this.userService.handleGetUser(res))
      );
  }
}
