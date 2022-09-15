import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Tab } from 'src/app/shared/types/shared';
import { TabBarService } from '../../../shared/services/tab-bar.service';

@Component({
  selector: 'app-seller-settings',
  templateUrl: './seller-settings.component.html',
  styleUrls: ['./seller-settings.component.scss'],
})
export class SellerSettingsComponent implements OnInit, OnDestroy {
  subs?: Subscription;

  tabs: Tab[] = [
    { name: 'Shop', id: 'shop-id' },
    { name: 'Bank', id: 'bank-id' },
    { name: 'KYC', id: 'kyc-id' },
    { name: 'Password', id: 'pw-id' },
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
