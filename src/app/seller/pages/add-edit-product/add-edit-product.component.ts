import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NotificationsService } from 'src/app/services/notification.service';
import { ProdMgtService } from '../../services/prod-mgt.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  form!: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodService: ProdMgtService,
    private shopService: ShopService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      price: new FormGroup({
        original: new FormControl('', [
          Validators.min(100),
          Validators.max(1000000),
        ]),
        sales: new FormControl('', [
          Validators.required,
          Validators.min(100),
          Validators.max(1000000),
        ]),
      }),
      numberInStock: new FormControl(''),
      features: new FormArray([]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });
  }

  get features() {
    return this.form.get('features') as FormArray;
  }

  onAddFeature() {
    const feat = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      details: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
    });
    this.features.push(feat);
  }

  onRemoveFeature(i: number) {
    this.features.removeAt(i);
  }

  onSubmit() {
    this.loading = true;
    const data = this.form.value;
    data.shopId = this.shopService.currentShop?._id;

    this.subs = this.prodService.addProduct(data).subscribe({
      next: () => {
        this.loading = false;
        this.notifService.add('Product added successfully!', 'success');
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
