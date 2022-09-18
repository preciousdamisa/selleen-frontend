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
    { id: 'edit-prod', name: 'Edit', iconName: 'bi-pencil-square' },
    { id: 'prod-link', name: 'Copy Link', iconName: 'bi-link-45deg fs-3' },
    { id: 'del-prod', name: 'Delete', iconName: 'bi-trash' },
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
    if (id === 'edit-prod') this.gotoAddOrEditPage();
  }

  onSelectProduct(p: Product) {
    this.prodService.selectedProduct = p;
  }

  getProducts() {
    const shopId = this.shopService.currentShop?._id!;
    this.loading = true;

    this.subs = this.prodService
      .getProducts({ pageNumber: 1, pageSize: 10 }, shopId)
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

  onAddProduct() {
    this.gotoAddOrEditPage();
  }

  gotoAddOrEditPage() {
    this.router.navigate(['./add-edit-product'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
