import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-seller-page-header',
  templateUrl: './seller-page-header.component.html',
  styleUrls: ['./seller-page-header.component.scss'],
})
export class SellerPageHeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() showShopStatus = false;

  shopLogo!: string;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopLogo =
      environment.sellenAwsBucketUrl + this.shopService.currentShop!.logo.url;
  }
}
