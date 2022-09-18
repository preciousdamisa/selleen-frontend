import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Product } from 'src/app/seller/types/product';
import { ModalService } from 'src/app/services/modal.service';
import { DropdownItem } from 'src/app/shared/types/shared';
import { AdminProductsService } from '../../services/admin-products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  products: Product[] = [];
  loading = false;
  selectedProd!: Product;

  dropdownItems: DropdownItem[] = [
    { id: 'view', name: 'View', iconName: 'bi-eye' },
    { id: 'delete', name: 'Delete', iconName: 'bi-trash' },
  ];

  constructor(
    private prodService: AdminProductsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.listenForProductsChange();
  }

  listenForProductsChange() {
    this.prodService.productsChanged.pipe(takeUntil(this.subs$)).subscribe({
      next: () => {
        this.getProducts();
      },
    });
  }

  onSelectItem(id: string, prod: Product, view: any) {
    this.selectedProd = prod;

    if (id === 'view') {
      this.modalService.open({ view });
    }
  }

  getProducts() {
    this.loading = true;

    this.prodService
      .getProducts({ pageNumber: 1, pageSize: 10 })
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

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
