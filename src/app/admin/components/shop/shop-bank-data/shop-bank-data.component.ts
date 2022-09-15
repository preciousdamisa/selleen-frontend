import { Component, Input } from '@angular/core';

import { Shop } from 'src/app/seller/types/shop';

@Component({
  selector: 'app-shop-bank-data',
  templateUrl: './shop-bank-data.component.html',
  styleUrls: ['./shop-bank-data.component.scss'],
})
export class ShopBankDataComponent {
  @Input() shop!: Shop;
}
