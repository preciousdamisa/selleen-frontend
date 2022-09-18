import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


import { Product } from 'src/app/seller/types/product';
import { Tab } from 'src/app/shared/types/shared';
import { TabBarService } from 'src/app/shared/services/tab-bar.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  @Input() product!: Product;

  subs?: Subscription;

  tabs: Tab[] = [
    { name: 'Details', id: 'prod-details' },
    { name: 'Approval', id: 'prod-approval' },
  ];
  currentTabId = 'prod-details';

  constructor(private tabBarService: TabBarService) {}

  ngOnInit(): void {
    this.listenForTabChange();
  }

  listenForTabChange() {
    this.subs = this.tabBarService.tabSwitched.subscribe({
      next: (id) => {
        this.currentTabId = id;
      },
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
