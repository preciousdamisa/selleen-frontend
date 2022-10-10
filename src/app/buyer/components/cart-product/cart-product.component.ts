import { Component, Input } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../types/product.types';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
})
export class CartProductComponent {
  @Input() product!: CartProduct;

  constructor(private cartService: CartService) {}

  onIncreaseProdQty(id: string) {
    this.cartService.modifyProductQty(id, 'Add');
  }

  onDecreaseProdQty(id: string) {
    this.cartService.modifyProductQty(id, 'sub');
  }

  onRemoveProd(id: string) {
    this.cartService.removeProduct(id);
  }
}
