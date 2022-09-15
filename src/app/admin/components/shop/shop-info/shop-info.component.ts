import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Shop } from 'src/app/seller/types/shop';
import { TabBarService } from 'src/app/shared/services/tab-bar.service';
import { Tab } from 'src/app/shared/types/shared';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.scss'],
})
export class ShopInfoComponent implements OnInit {
  @Input() shop!: Shop;

  subs?: Subscription;

  tabs: Tab[] = [
    { name: 'Shop', id: 'shop-id' },
    { name: 'Bank', id: 'bank-id' },
    { name: 'KYC', id: 'kyc-id' },
  ];
  currentTabId = 'shop-id';

  constructor(private tabBarService: TabBarService) {}

  ngOnInit(): void {
    this.listenForTabChange();
  }

  listenForTabChange() {
    this.tabBarService.tabSwitched.subscribe({
      next: (id) => {
        this.currentTabId = id;
      },
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
