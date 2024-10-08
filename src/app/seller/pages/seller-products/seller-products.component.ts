import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { DropdownItem } from 'src/app/shared/types/shared';
import { SellerProductsService } from '../../services/seller-products.service';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.scss'],
})
export class SellerProductsComponent implements OnInit {
  subs?: Subscription;
  products: Product[] = [];
  loading = false;

  dropdownItems: DropdownItem[] = [
    { id: 'view', name: 'View', iconName: 'bi-eye' },
    { id: 'edit', name: 'Edit', iconName: 'bi-pencil-square' },
    { id: 'copy', name: 'Copy Link', iconName: 'bi-link-45deg fs-3' },
    { id: 'delete', name: 'Delete', iconName: 'bi-trash' },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodService: SellerProductsService,
    private shopService: ShopService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  onSelectItem(id: string) {
    if (id === 'edit') this.onEditProduct();
  }

  onSelectProduct(p: Product) {
    this.prodService.selectedProduct = p;
  }

  onActionButtonClicked(id: string) {
    if (id === 'edit') this.onEditProduct();
  }

  getProducts() {
    const shopId = this.shopService.currentShop?._id!;
    this.loading = true;

    this.subs = this.prodService
      .getProducts({ pageNumber: 1, pageSize: 10 }, shopId)
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

  onAddProduct() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  onEditProduct() {
    this.router.navigate(['./edit'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
