import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TabBarService } from 'src/app/shared/services/tab-bar.service';
import { Tab } from 'src/app/shared/types/shared';
import { BuyerService } from '../../services/buyer.service';
import { CartService } from '../../services/cart.service';
import { BuyerProduct, BuyerProductDetails } from '../../types/buyer.types';

@Component({
  selector: 'app-buyer-product-details',
  templateUrl: './buyer-product-details.component.html',
  styleUrls: ['./buyer-product-details.component.scss'],
})
export class BuyerProductDetailsComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  productId!: string;
  product!: BuyerProductDetails;
  loading = false;
  quantity = 0;

  tabs: Tab[] = [
    { name: 'Description', id: 'description' },
    { name: 'Delivery', id: 'delivery' },
  ];
  currentTabId = 'description';

  constructor(
    private route: ActivatedRoute,
    private buyerService: BuyerService,
    private cartService: CartService,
    private tabBarService: TabBarService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.subs$)).subscribe({
      next: (params) => {
        this.productId = params['productId'];
        this.fetchProduct();
      },
    });

    this.listenForTabChange();
  }

  listenForTabChange() {
    this.tabBarService.tabSwitched.pipe(takeUntil(this.subs$)).subscribe({
      next: (id) => {
        this.currentTabId = id;
      },
    });
  }

  fetchProduct() {
    this.loading = true;
    this.buyerService
      .getProduct(this.productId)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (prod) => {
          this.product = prod;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  onModifyQty(opr: 'Add' | 'Sub') {
    if (opr === 'Add') this.quantity++;
    else if (opr === 'Sub' && this.quantity > 0) {
      this.quantity--;
    }
  }

  onAddToCart() {
    const prod: BuyerProduct = {
      name: this.product.name,
      price: this.product.price,
      images: this.product.images,
      _id: this.product._id,
      shop: this.product.shop,
    };

    this.cartService.addToCart(prod, this.quantity);
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
