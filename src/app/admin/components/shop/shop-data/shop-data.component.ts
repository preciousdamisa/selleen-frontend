import { Component, Input } from '@angular/core';
import { Shop } from 'src/app/seller/types/shop';

@Component({
  selector: 'app-shop-data',
  templateUrl: './shop-data.component.html',
  styleUrls: ['./shop-data.component.scss'],
})
export class ShopDataComponent {
  @Input() shop!: Shop;
}
