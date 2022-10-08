import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { CartProduct } from '../../types/product.types';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  products: CartProduct[] = [];
  prodsTotalAmt = 0;

  constructor(
    private router: Router,
    private cartService: CartService,
    private modalService: ModalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.listenForProdsChange();
    this.getProdsTotalAmt();
  }

  getProducts() {
    this.products = this.cartService.cart;
  }

  listenForProdsChange() {
    this.subs = this.cartService.cartUpdated$.subscribe({
      next: () => {
        this.getProducts();
        this.getProdsTotalAmt();
      },
    });
  }

  getProdsTotalAmt() {
    this.prodsTotalAmt = this.cartService.getProdsTotalAmt();
  }

  emptyCart() {
    this.cartService.clearCart();
  }

  onContinue(checkoutView: TemplateRef<any>) {
    // if (!this.userService.currentUser) {
    //   // this.router.navigateByUrl('/login');
    //   return;
    // }
    this.modalService.close();
    this.modalService.open({ view: checkoutView });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
