import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Order } from 'src/app/seller/types/order';
import { ModalService } from 'src/app/services/modal.service';
import { BuyerService } from '../../services/buyer.service';

@Component({
  selector: 'app-buyer-orders',
  templateUrl: './buyer-orders.component.html',
  styleUrls: ['./buyer-orders.component.scss'],
})
export class BuyerOrdersComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  isDesktop = false;
  orders: Order[] = [];
  loading = false;
  selectedOrder!: Order;

  constructor(
    private buyerService: BuyerService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.listenForWindowChange();
    this.getOrders();
  }

  listenForWindowChange() {
    this.checkWidth(window.innerWidth);

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (evt: any) => {
          this.checkWidth(evt.target.innerWidth);
        },
      });
  }

  checkWidth(width: number) {
    this.isDesktop = width > 640;
  }

  getOrders() {
    this.loading = true;

    this.buyerService
      .getOrders({ pageNumber: 1, pageSize: 10, searchText: '' })
      .pipe(takeUntil(this.subs$))
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

  onViewOrder(order: Order, view: TemplateRef<any>) {
    this.selectedOrder = order;
    this.modalService.open({ view });
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
