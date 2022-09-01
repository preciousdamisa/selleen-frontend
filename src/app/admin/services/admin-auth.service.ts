import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { exhaustMap, tap, take } from 'rxjs/operators';

import {
  AdminSignupReqBody,
  GetAdminResBody,
} from 'src/app/admin/types/admin-auth';
import { AuthReqBody, AuthResBody } from 'src/app/shared/types/shared';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private baseUrl = `${environment.apiUrl}`;

  admin$ = new BehaviorSubject<Admin | null>(null);

  private timerRef: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(data: AdminSignupReqBody) {
    return this.http
      .post<AuthResBody>(`${this.baseUrl}admins/auth/signup`, data)
      .pipe(
        take(1),
        exhaustMap((res) => this.handleGetAdmin(res))
      );
  }

  login(data: AuthReqBody) {
    return this.http
      .post<AuthResBody>(`${this.baseUrl}admins/auth/login`, data)
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
          const expDate = new Date(authRes.data.tokenExpirationDate * 1000);

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

          localStorage.setItem('adminData', JSON.stringify(admin));

          this.admin$.next(admin);
          this.router.navigate(['/admin']);

          this.autoLogout(expDate);
        })
      );
  }

  autoLogin() {
    const adminData = localStorage.getItem('adminData');
    if (!adminData) return;

    const parsedAdmin = JSON.parse(adminData);

    const admin = Admin.fromJson(parsedAdmin);
    if (!admin.token) return;

    this.admin$.next(admin);

    this.autoLogout(new Date(parsedAdmin.tokenExpirationDate));
  }

  autoLogout(tokenExpDate: Date) {
    const remainingTime = tokenExpDate.getTime() - new Date().getTime();

    this.timerRef = setTimeout(() => {
      this.logout();
    }, remainingTime);
  }

  logout() {
    this.router.navigate(['/admin/login']);

    localStorage.removeItem('adminData');
    if (this.timerRef) {
      clearTimeout(this.timerRef);
      this.timerRef = null;
    }
  }
}
