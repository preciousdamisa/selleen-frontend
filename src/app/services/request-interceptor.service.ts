import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpHeaders,
  HttpRequest,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AdminAuthService } from 'src/app/admin/services/admin-auth.service';
import { UserService } from '../shared/services/user.service';
import { ErrorModalService } from './error-modal.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private adminService: AdminAuthService,
    private errModalService: ErrorModalService
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
            return next
              .handle(modReq)
              .pipe(catchError((res) => this.handleError(res)));
          } else {
            return next
              .handle(req)
              .pipe(catchError((res) => this.handleError(res)));
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
          return next
            .handle(modReq)
            .pipe(catchError((res) => this.handleError(res)));
        } else {
          return next
            .handle(req)
            .pipe(catchError((res) => this.handleError(res)));
        }
      })
    );
  }

  handleError(res: HttpErrorResponse) {
    const errMsg = res.error.message;

    this.errModalService.open(errMsg);
    return throwError(() => new Error(errMsg));
  }
}
