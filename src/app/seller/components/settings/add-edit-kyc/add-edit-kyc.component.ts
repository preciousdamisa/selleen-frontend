import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { Shop } from 'src/app/seller/models/shop.model';
import { ShopService } from 'src/app/seller/services/shop.service';
import { NotificationsService } from 'src/app/services/notification.service';
import { SelectOption } from 'src/app/shared/types/shared';

@Component({
  selector: 'app-add-edit-kyc',
  templateUrl: './add-edit-kyc.component.html',
  styleUrls: ['./add-edit-kyc.component.scss'],
})
export class AddEditKycComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  shop?: Shop;
  personalIdForm!: FormGroup;
  idTypes: SelectOption[] = [
    { label: '~~ Select ID Type ~~', value: '' },
    { label: 'National ID', value: 'NationalId' },
    { label: "PVC (Permanent Voter's Card", value: 'PVC' },
    { label: "Driver's License", value: 'DriverLicense' },
  ];

  linksForm!: FormGroup;
  addingSMLinks = false;
  addingId = false;
  selectedId?: File | null;

  constructor(
    private shopService: ShopService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getShop();
    this.initForms();
  }

  getShop() {
    this.shop = this.shopService.currentShop;
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

    const smLinks = this.shop?.socialMediaLinks;
    if (smLinks && smLinks.length > 0) {
      smLinks.forEach((link) => {
        const linkInForm = this.linksForm.get(link.name.toLowerCase());
        if (linkInForm?.get('name')?.value === link.name) {
          linkInForm?.get('url')?.setValue(link.url);
        }
      });
    }

    this.personalIdForm = new FormGroup({
      type: new FormControl('', Validators.required),
    });
  }

  get linksFormIsValid() {
    return (
      this.linksForm.get('facebook.url')?.value ||
      this.linksForm.get('instagram.url')?.value ||
      this.linksForm.get('twitter.url')?.value
    );
  }

  onSubmitId() {
    this.addingId = true;
    this.shopService
      .saveId(this.personalIdForm.value.type, this.selectedId!, this.shop?._id!)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: () => {
          this.notifService.add(
            'Personal ID uploaded successfully!',
            'success'
          );
          this.selectedId = null;
          this.addingId = false;
        },
        error: () => {
          this.addingId = false;
        },
      });
  }

  onSubmitLinks() {
    this.addingSMLinks = true;
    const { facebook, instagram, twitter } = this.linksForm.value;
    const links = [facebook, instagram, twitter].filter(
      (link) => link.url !== ''
    );

    this.shopService
      .updateSMLinks({ links }, this.shop?._id!)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: () => {
          this.notifService.add(
            'Social media link(s) updated successfully!',
            'success'
          );
          this.addingSMLinks = false;
        },
        error: () => {
          this.addingSMLinks = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
