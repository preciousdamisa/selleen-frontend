import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { UserAuthService } from '../../shared/services/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class SellerAuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserAuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userService.user$.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user && user.hasShop;
        if (isAuth) return true;
        return this.router.createUrlTree(['/seller/shop/login']);
      })
    );
  }
}
