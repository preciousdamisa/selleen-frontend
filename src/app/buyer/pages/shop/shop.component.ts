import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BuyerService } from '../../services/buyer.service';
import { ShopByAlias } from '../../types/buyer.types';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {
  subs?: Subscription;

  shop!: ShopByAlias;
  alias!: string;
  loading = false;

  constructor(
    private router: ActivatedRoute,
    private buyerService: BuyerService
  ) {}

  ngOnInit(): void {
    this.alias = this.router.snapshot.params['alias'];
    this.getShop();
  }

  getShop() {
    this.loading = true;
    this.subs = this.buyerService.getShop(this.alias).subscribe({
      next: (res) => {
        this.shop = res.data;
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
