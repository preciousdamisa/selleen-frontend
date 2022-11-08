import { Component, Input, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ShopByAlias } from '../../types/buyer.types';

@Component({
  selector: 'app-shop-profile-card',
  templateUrl: './shop-profile-card.component.html',
  styleUrls: ['./shop-profile-card.component.scss'],
})
export class ShopProfileCardComponent implements OnInit {
  @Input() shop!: ShopByAlias;

  shopLogo?: string;

  ngOnInit(): void {
    if (this.shop.logo) {
      this.shopLogo = environment.sellenAwsBucketUrl + this.shop.logo.url;
    }
  }
}
