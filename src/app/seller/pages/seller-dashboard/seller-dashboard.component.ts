import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { Todo } from 'src/app/shared/types/shared';
import { SellerDashboardService } from '../../services/seller-dashboard.service';
import { SellerWalletService } from '../../services/seller-wallet.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss'],
})
export class SellerDashboardComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  user?: User | null;
  shopId!: string;
  totalRevenue?: string;
  orderCount?: string;
  todos: Todo[] = [];
  fetchingTodos = false;

  constructor(
    private userService: UserAuthService,
    private dashService: SellerDashboardService,
    private walletService: SellerWalletService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.shopId = this.shopService.currentShop?._id!;

    this.getUser();
    this.fetchTodos();
    this.getOrderCount();
    this.getTotalRevenue();
  }

  getUser() {
    this.userService.user$.pipe(takeUntil(this.subs$)).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  getTotalRevenue() {
    this.walletService
      .getTotalRevenue(this.shopId)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.totalRevenue = String(res.data);
        },
      });
  }

  getOrderCount() {
    this.dashService
      .getOrderCount(this.shopId)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.orderCount = String(res.data);
        },
      });
  }

  fetchTodos() {
    this.fetchingTodos = true;
    this.dashService
      .getTodos(this.user?.shops[0].id!)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.todos = res.data.todos;
          this.fetchingTodos = false;
        },
        error: () => {
          this.fetchingTodos = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
