import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Address, SimpleResBody } from '../types/shared';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private authService: UserAuthService) {}

  updatePhone(data: { phone: string }) {
    return this.http
      .patch<SimpleResBody>(`${this.baseUrl}users/me/update-phone`, data)
      .pipe(
        take(1),
        exhaustMap(() => this.getUser())
      );
  }

  updateAddress(data: Address) {
    return this.http
      .patch<SimpleResBody>(`${this.baseUrl}users/me/update-address`, data)
      .pipe(
        take(1),
        exhaustMap(() => this.getUser())
      );
  }

  getUser() {
    const user = this.authService.currentUser!;

    return this.authService.handleGetUser(
      {
        data: {
          id: user._id,
          token: user.token!,
          tokenExpirationDate: user.tokenExpirationDate.getTime() / 1000,
        },
        message: 'Success',
      },
      { navigate: false, setLogoutTimer: false }
    );
  }
}
