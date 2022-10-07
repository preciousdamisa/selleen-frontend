import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SellerOrdersService } from 'src/app/seller/services/seller-orders.service';
import { Order } from 'src/app/seller/types/order';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationsService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit, OnDestroy {
  @Input() order!: Order;

  subs?: Subscription;
  loading = false;

  constructor(
    private orderService: SellerOrdersService,
    private notifService: NotificationsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  get productsTotal() {
    return this.order.products.map((p) => p.amount).reduce((a, b) => a + b, 0);
  }

  onUpdateStatus() {
    this.loading = true;
    this.subs = this.orderService
      .updateOrderStatus({
        orderId: this.order._id,
        status: 'Processed',
      })
      .subscribe({
        next: () => {
          this.notifService.add('Order status updated successfully', 'success');
          this.modalService.close();
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
