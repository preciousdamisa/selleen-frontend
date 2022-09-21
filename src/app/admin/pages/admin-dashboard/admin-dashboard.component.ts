import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AdminAuthService } from '../../services/admin-auth.service';
import { Admin } from '../../models/admin.model';
import { AdminDashboardService } from '../../services/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  admin?: Admin | null;
  buyerCount?: string;
  sellerCount?: string;
  prodCount?: string;

  constructor(
    private adminAuthService: AdminAuthService,
    private dashboardService: AdminDashboardService
  ) {}

  ngOnInit(): void {
    this.admin = this.adminAuthService.currentAdmin;

    this.fetchBuyerCount();
    this.fetchSellerCount();
    this.fetchProdCount();
  }

  fetchBuyerCount() {
    this.dashboardService
      .getBuyerCount()
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.buyerCount = res.data.count.toString();
        },
      });
  }

  fetchSellerCount() {
    this.dashboardService
      .getSellerCount()
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.sellerCount = res.data.count.toString();
        },
      });
  }

  fetchProdCount() {
    this.dashboardService
      .getProductCount()
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.prodCount = res.data.count.toString();
        },
      });
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
