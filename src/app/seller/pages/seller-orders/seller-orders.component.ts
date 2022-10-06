import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalService } from 'src/app/services/modal.service';
import { DropdownItem } from 'src/app/shared/types/shared';
import { SellerOrdersService } from '../../services/seller-orders.service';
import { ShopService } from '../../services/shop.service';
import { Order } from '../../types/order';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.scss'],
})
export class SellerOrdersComponent implements OnInit, OnDestroy {
  subs?: Subscription;

  loading = false;
  orders: Order[] = [];
  selectedOrder?: Order;

  dropdownItems: DropdownItem[] = [
    { id: 'view', name: 'View', iconName: 'bi-eye' },
    {
      id: 'update-status',
      name: 'Update Status',
      iconName: 'bi-pencil-square',
    },
  ];

  constructor(
    private ordersService: SellerOrdersService,
    private shopService: ShopService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    const shopId = this.shopService.currentShop?._id!;
    this.loading = true;
    this.subs = this.ordersService
      .getOrders({ pageNumber: 1, pageSize: 10, searchText: '' }, shopId)
      .subscribe({
        next: (res) => {
          this.orders = res.data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  onSelectItem(id: string, order: Order, view: TemplateRef<any>) {
    this.selectedOrder = order;

    if (id === 'view') {
      this.modalService.open({ view });
    }
  }

  onActionButtonClicked(id: string) {}

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
