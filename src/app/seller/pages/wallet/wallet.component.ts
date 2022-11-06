import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ModalService } from 'src/app/services/modal.service';
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
  balance?: string;
  totalWithdrawal?: string;
  totalRevenue?: string;

  constructor(
    private shopService: ShopService,
    private walletService: SellerWalletService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.shopId = this.shopService.currentShop?._id!;
    this.getTransactions();
    this.getBalance();
    this.getTotalWithdrawal();
    this.getTotalRevenue();
  }

  getBalance() {
    this.walletService
      .getBalance(this.shopId)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.balance = String(res.data);
        },
      });
  }

  getTotalWithdrawal() {
    this.walletService
      .getTotalWithdrawal(this.shopId)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.totalWithdrawal = String(res.data);
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

  onWithdraw(view: TemplateRef<any>) {
    this.modalService.open({ view });
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
