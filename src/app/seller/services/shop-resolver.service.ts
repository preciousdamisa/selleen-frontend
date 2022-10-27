import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Shop } from '../types/shop';
import { ShopService } from './shop.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class ShopResolverService implements Resolve<Shop> {
  constructor(
    private userService: UserAuthService,
    private shopService: ShopService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Shop | Observable<Shop> | Promise<Shop> {
    const shopId = this.userService.currentUser?.shops[0].id!;

    return this.shopService.getShop(shopId);
  }
}
