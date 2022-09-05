import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';

import { UserService } from './user.service';

@Injectable()
export class UserAuthInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
