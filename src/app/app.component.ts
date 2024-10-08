import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AdminAuthService } from './admin/services/admin-auth.service';
import { CartService } from './buyer/services/cart.service';
import { LocationService } from './shared/services/location.service';
import { UserAuthService } from './shared/services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subs?: Subscription;

  constructor(
    private adminAuthService: AdminAuthService,
    private userService: UserAuthService,
    private cartService: CartService,
    private locService: LocationService
  ) {}

  ngOnInit(): void {
    this.adminAuthService.autoLogin();
    this.userService.autoLogin();
    this.cartService.initializeCart();
    this.getLocation();
  }

  getLocation() {
    this.locService.getLoc();
    this.subs = this.locService.getCurrentLocation().subscribe();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
