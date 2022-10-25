import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-buyer-orders',
  templateUrl: './buyer-orders.component.html',
  styleUrls: ['./buyer-orders.component.scss'],
})
export class BuyerOrdersComponent implements OnInit, OnDestroy {
  subs?: Subscription;

  isDesktop = false;

  constructor() {}

  ngOnInit(): void {
    this.listenToWindowchange();
  }

  listenToWindowchange() {
    this.checkWidth(window.innerWidth);

    this.subs = fromEvent(window, 'resize').subscribe({
      next: (evt: any) => {
        this.checkWidth(evt.target.innerWidth);
      },
    });
  }

  checkWidth(width: number) {
    this.isDesktop = width > 640;
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
