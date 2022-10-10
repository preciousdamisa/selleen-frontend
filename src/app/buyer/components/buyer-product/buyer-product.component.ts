import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationsService } from 'src/app/services/notification.service';
import { CartService } from '../../services/cart.service';
import { BuyerProduct } from '../../types/buyer.types';

@Component({
  selector: 'app-buyer-product',
  templateUrl: './buyer-product.component.html',
  styleUrls: ['./buyer-product.component.scss'],
})
export class BuyerProductComponent {
  @Input() product!: BuyerProduct;

  constructor(
    private router: Router,
    private cartService: CartService,
    private notifService: NotificationsService
  ) {}

  onAddToCart() {
    this.cartService.addToCart(this.product);
    this.notifService.add('Added to cart successfully', 'success', {
      duration: 1000,
    });
  }

  onViewDetails() {
    this.router.navigate([
      this.product.shop.alias,
      'products',
      this.product.name,
      this.product._id,
    ]);
  }
}
