import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShopService } from '../../services/shop.service';
import { Shop } from '../../types/shop';

@Component({
  selector: 'app-seller-page-header',
  templateUrl: './seller-page-header.component.html',
  styleUrls: ['./seller-page-header.component.scss'],
})
export class SellerPageHeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() showShopStatus = false;

  shop?: Shop;
  shopLogo?: string;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shop = this.shopService.currentShop;
    
    const url = this.shop?.logo?.url;
    if (url) {
      this.shopLogo = environment.sellenAwsBucketUrl + url;
    }
  }
}
