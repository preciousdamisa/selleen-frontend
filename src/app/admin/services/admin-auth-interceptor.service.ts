import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';

import { AdminAuthService } from './admin-auth.service';

@Injectable()
export class AdminAuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AdminAuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.admin$.pipe(
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
}
