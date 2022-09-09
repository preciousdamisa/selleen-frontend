import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Shop } from 'src/app/seller/models/shop.model';
import { ShopService } from 'src/app/seller/services/shop.service';

@Component({
  selector: 'app-add-edit-kyc',
  templateUrl: './add-edit-kyc.component.html',
  styleUrls: ['./add-edit-kyc.component.scss'],
})
export class AddEditKycComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  currentShop?: Shop;
  linksForm!: FormGroup;
  loading = false;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getShop();
    this.initForms();
  }

  getShop() {
    this.currentShop = this.shopService.currentShop;
  }

  initForms() {
    const validators = [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(500),
    ];

    this.linksForm = new FormGroup({
      facebook: new FormGroup({
        name: new FormControl('Facebook'),
        url: new FormControl('', validators),
      }),
      instagram: new FormGroup({
        name: new FormControl('Instagram'),
        url: new FormControl('', validators),
      }),
      twitter: new FormGroup({
        name: new FormControl('Twitter'),
        url: new FormControl('', validators),
      }),
    });

    const smLinks = this.currentShop?.socialMediaLinks;
    if (smLinks && smLinks.length > 0) {
      smLinks.forEach((link) => {
        const linkInForm = this.linksForm.get(link.name.toLowerCase());
        if (linkInForm?.get('name')?.value === link.name) {
          linkInForm?.get('url')?.setValue(link.url);
        }
      });
    }
  }

  get formIsValid() {
    return (
      this.linksForm.get('facebook.url')?.value ||
      this.linksForm.get('instagram.url')?.value ||
      this.linksForm.get('twitter.url')?.value
    );
  }

  onSubmit() {
    this.loading = true;
    const { facebook, instagram, twitter } = this.linksForm.value;
    const links = [facebook, instagram, twitter].filter(
      (link) => link.url !== ''
    );

    this.subs = this.shopService
      .updateSMLinks({ links }, this.currentShop?._id!)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.loading = false;
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
