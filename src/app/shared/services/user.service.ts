import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { exhaustMap, tap, take } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { AuthReqBody, AuthResBody } from '../types/shared';
import { GetUserResBody } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiUrl}`;

  user$ = new BehaviorSubject<User | null>(null);

  private timerRef: any;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: AuthReqBody) {
    return this.http.post<AuthResBody>(`${this.baseUrl}users/login`, data).pipe(
      take(1),
      exhaustMap((res) => this.handleGetUser(res))
    );
  }

  handleGetUser(res: AuthResBody) {
    const authRes = res;

    return this.http
      .get<GetUserResBody>(`${this.baseUrl}users/me`, {
        headers: { 'x-auth-token': res.data.token },
      })
      .pipe(
        tap((res) => {
          const expDate = new Date(authRes.data.tokenExpirationDate * 1000);

          const user = new User(
            res.data._id,
            res.data.name,
            res.data.phone,
            res.data.email,
            res.data.hasShop,
            authRes.data.token,
            expDate
          );

          localStorage.setItem('userData', JSON.stringify(user));

          this.user$.next(user);
          this.router.navigate([user.hasShop ? '' : '/seller']);

          this.autoLogout(expDate);
        })
      );
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) return;

    const parsedUser = JSON.parse(userData);

    const user = User.fromJson(parsedUser);
    if (!user.token) return;

    this.user$.next(user);

    this.autoLogout(new Date(parsedUser.tokenExpirationDate));
  }

  autoLogout(tokenExpDate: Date) {
    const remainingTime = tokenExpDate.getTime() - new Date().getTime();

    this.timerRef = setTimeout(() => {
      this.logout();
    }, remainingTime);
  }

  logout() {
    this.router.navigate(['']);

    localStorage.removeItem('userData');
    if (this.timerRef) {
      clearTimeout(this.timerRef);
      this.timerRef = null;
    }
  }
}
