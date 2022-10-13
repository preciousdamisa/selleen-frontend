import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BuyerService } from '../../services/buyer.service';
import { BuyerProduct } from '../../types/buyer.types';
import { GetProductsReqQuery } from '../../types/product.types';

@Component({
  selector: 'app-buyer-products',
  templateUrl: './buyer-products.component.html',
  styleUrls: ['./buyer-products.component.scss'],
})
export class BuyerProductsComponent implements OnInit, OnDestroy {
  @Input() forShop = false;
  @Input() shopId?: string;

  subs$ = new Subject<void>();

  prodsQuery: GetProductsReqQuery = {
    pageNumber: 1,
    pageSize: 10,
    searchText: '',
  };
  products: BuyerProduct[] = [];
  loading = false;

  constructor(private buyerService: BuyerService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.listenForSearch();
  }

  listenForSearch() {
    this.buyerService.fetchingProducts.pipe(takeUntil(this.subs$)).subscribe({
      next: (value) => {
        this.prodsQuery.searchText = value;
        this.fetchProducts();
      },
    });
  }

  fetchProducts() {
    this.loading = true;
    this.buyerService
      .getProducts(this.prodsQuery, {
        forShop: this.forShop,
        shopId: this.shopId,
      })
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (prods) => {
          this.products = prods;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
