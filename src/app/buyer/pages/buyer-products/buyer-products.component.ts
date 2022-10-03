import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalService } from 'src/app/services/modal.service';
import { LocationService } from 'src/app/shared/services/location.service';

import { BuyerService } from '../../services/buyer.service';
import { GetProductsReqQuery, BuyerProduct } from '../../types/product';

@Component({
  selector: 'app-buyer-products',
  templateUrl: './buyer-products.component.html',
  styleUrls: ['./buyer-products.component.scss'],
})
export class BuyerProductsComponent implements OnInit, OnDestroy {
  @ViewChild('locationPrompt', { static: true })
  locationPrompt!: TemplateRef<any>;

  subs$ = new Subject<void>();

  prodsQuery: GetProductsReqQuery = {
    pageNumber: 1,
    pageSize: 10,
    searchText: '',
  };
  products: BuyerProduct[] = [];
  loading = false;

  constructor(
    private router: Router,
    private buyerService: BuyerService,
    private modalService: ModalService,
    private locService: LocationService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.listenForSearch();
    this.showLocationPrompt(this.locationPrompt);
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
      .getProducts(this.prodsQuery)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.products = res.data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
  }

  onGetAShop() {
    this.router.navigateByUrl('/seller');
  }

  showLocationPrompt(view: TemplateRef<any>) {
    if (!this.locService.allowLocation)
      this.modalService.open({ view, size: 'sm', centered: true });
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
