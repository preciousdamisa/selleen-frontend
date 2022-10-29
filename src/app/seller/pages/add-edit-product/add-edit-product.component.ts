import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { ErrorModalService } from 'src/app/services/error-modal.service';
import { NotificationsService } from 'src/app/services/notification.service';
import { SimpleResBody } from 'src/app/shared/types/shared';
import { SellerProductsService } from '../../services/seller-products.service';
import { ShopService } from '../../services/shop.service';
import { Product, ProductFeature } from '../../types/product';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  subs?: Subscription;

  form!: FormGroup;
  editMode = false;
  productImages: File[] = [];
  previewUrls: string[] = [];
  product: Product | null = null;
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodService: SellerProductsService,
    private shopService: ShopService,
    private notifService: NotificationsService,
    private errModal: ErrorModalService
  ) {}

  ngOnInit(): void {
    if (this.prodService.selectedProduct) {
      this.editMode = true;
      this.product = this.prodService.selectedProduct;
    }

    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(this.product?.name || '', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      price: new FormGroup({
        original: new FormControl(this.product?.price.original || '', [
          Validators.min(100),
        ]),
        sales: new FormControl(this.product?.price.sales || '', [
          Validators.required,
          Validators.min(100),
        ]),
      }),
      numberInStock: new FormControl(this.product?.numberInStock || ''),
      features: new FormArray([]),
      description: new FormControl(this.product?.description || '', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });

    if (this.editMode) {
      this.product?.features.forEach((feat) => {
        this.onAddFeature(feat);
      });
    }
  }

  get features() {
    return this.form.get('features') as FormArray;
  }

  onAddFeature(feat?: ProductFeature) {
    const control = new FormGroup({
      name: new FormControl(feat?.name || '', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      details: new FormControl(feat?.details || '', [
        Validators.required,
        Validators.maxLength(250),
      ]),
    });
    this.features.push(control);
  }

  onRemoveFeature(i: number) {
    this.features.removeAt(i);
  }

  onSelectImages(images: File[]) {
    this.productImages = [];

    console.log(images.length);

    if (images.length > 3) {
      this.errModal.open('Maximum of three (3) images can be provided.');
      return;
    }

    this.productImages = images;
  }

  onPreviewUrls(urls: string[]) {
    this.previewUrls = [];
    if (this.previewUrls.length > 3) return;
    this.previewUrls = urls;
  }

  onSubmit() {
    this.loading = true;
    const data = this.form.value;
    data.shopId = this.shopService.currentShop?._id;

    let req: Observable<SimpleResBody>;
    let phrase: string;

    if (this.editMode) {
      req = this.prodService.editProduct(data, this.product?._id!);
      phrase = 'edited';
    } else {
      req = this.prodService.addProduct(data, this.productImages);
      phrase = 'added';
    }

    this.subs = req.subscribe({
      next: () => {
        this.loading = false;
        this.notifService.add(`Product ${phrase} successfully!`, 'success');
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.prodService.selectedProduct = null;
    this.subs?.unsubscribe();
  }
}
