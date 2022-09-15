import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DropdownItem } from 'src/app/shared/types/shared';
import { AdminShopService } from '../../services/admin-shop.service';
import { ModalService } from 'src/app/services/modal.service';
import { Shop } from 'src/app/seller/types/shop';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  shops: Shop[] = [];
  selectedShop!: Shop;
  gettingShops = false;

  dropdownItems: DropdownItem[] = [
    { id: 'approve-shop', name: 'Approve', iconName: 'bi-check-circle' },
    { id: 'disapprove-shop', name: 'Disapprove', iconName: 'bi-x-circle' },
    { id: 'view-shop', name: 'View', iconName: 'bi-eye' },
  ];

  constructor(
    private shopService: AdminShopService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getShops();
  }

  getShops() {
    this.gettingShops = true;
    this.shopService
      .getShops({ pageSize: 10, pageNumber: 1 })
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: ({ data }) => {
          this.shops = data;
          this.gettingShops = false;
        },
        error: () => {
          this.gettingShops = false;
        },
      });
  }

  onSelectItem(
    itemId: string,
    shop: Shop,
    shopApprovalView: any,
    shopDetailsView: any
  ) {
    this.selectedShop = shop;

    if (itemId === 'view-shop') {
      this.modalService.open({
        view: shopDetailsView,
        size: 'lg',
      });
    } else {
      this.modalService.open({ view: shopApprovalView, size: 'md' });
    }
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
