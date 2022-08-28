import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { exhaustMap, tap, take } from 'rxjs/operators';

import {
  AdminSignupReqBody,
  GetAdminResBody,
} from 'src/app/shared/types/admin/admin';
import { AuthResBody } from 'src/app/shared/types/shared';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private baseUrl = `${environment.apiUrl}`;

  admin$ = new BehaviorSubject<Admin | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(data: AdminSignupReqBody) {
    return this.http
      .post<AuthResBody>(`${this.baseUrl}admins/auth/signup`, data)
      .pipe(
        take(1),
        exhaustMap((res) => this.handleGetAdmin(res))
      );
  }

  private handleGetAdmin(res: AuthResBody) {
    const authRes = res;

    return this.http
      .get<GetAdminResBody>(`${this.baseUrl}admins/me`, {
        headers: { 'x-auth-token': res.data.token },
      })
      .pipe(
        tap((res) => {
          const expDate = new Date(
            new Date().getTime() + +authRes.data.expiresIn * 1000
          );

          const admin = new Admin(
            res.data._id,
            res.data.name,
            res.data.email,
            res.data.phone,
            res.data.address,
            res.data.permissions,
            authRes.data.token,
            expDate
          );

          this.admin$.next(admin);
          this.router.navigate(['/admin']);
        })
      );
  }
}
