import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SellerWalletService } from '../../services/seller-wallet.service';
import { ShopService } from '../../services/shop.service';
import { Transaction } from '../../types/transaction';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  shopId!: string;
  transactions: Transaction[] = [];
  loadingTransactions = false;

  constructor(
    private shopService: ShopService,
    private walletService: SellerWalletService
  ) {}

  ngOnInit(): void {
    this.shopId = this.shopService.currentShop?._id!;
    this.getTransactions();
  }

  getTransactions() {
    this.loadingTransactions = true;

    this.walletService
      .getTransactions(this.shopId, {
        pageNumber: 1,
        pageSize: 10,
        searchText: '',
      })
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.transactions = res.data;
          this.loadingTransactions = false;
        },
        error: () => {
          this.loadingTransactions = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
