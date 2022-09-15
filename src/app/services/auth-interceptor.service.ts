import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';

import { AdminAuthService } from 'src/app/admin/services/admin-auth.service';
import { UserService } from '../shared/services/user.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private adminService: AdminAuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('api/admin')) {
      return this.adminService.admin$.pipe(
        take(1),
        exhaustMap((admin) => {
          if (admin?.token) {
            const modReq = req.clone({
              headers: new HttpHeaders().set('x-auth-token', admin.token),
            });
            return next.handle(modReq);
          } else {
            return next.handle(req);
          }
        })
      );
    }

    return this.userService.user$.pipe(
      take(1),
      exhaustMap((user) => {
        if (user?.token) {
          const modReq = req.clone({
            headers: new HttpHeaders().set('x-auth-token', user.token),
          });
          return next.handle(modReq);
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
