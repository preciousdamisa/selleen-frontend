import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Shop } from '../types/shop';
import { ShopService } from './shop.service';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ShopResolverService implements Resolve<Shop> {
  constructor(
    private userService: UserService,
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
