import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { Shop } from 'src/app/seller/models/shop.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { ShopService } from 'src/app/seller/services/shop.service';
import { SelectOption } from 'src/app/shared/types/shared';
import { NotificationsService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-edit-shop-info',
  templateUrl: './add-edit-shop-info.component.html',
  styleUrls: ['./add-edit-shop-info.component.scss'],
})
export class AddEditShopInfoComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  user?: User | null;
  shop?: Shop | null;

  stateOpts: SelectOption[] = [
    { label: '~~ Select State ~~', value: '' },
    { label: 'Abuja', value: 'Abuja' },
    { label: 'Delta', value: 'Delta' },
    { label: 'Edo', value: 'Edo' },
    { label: 'Lagos', value: 'Lagos' },
  ];
  countryOpts: SelectOption[] = [
    { label: '~~ Select Country ~~', value: '' },
    { label: 'Nigeria', value: 'Nigeria' },
  ];

  shopInfoForm!: FormGroup;
  loading = false;
  enteredAlias = '';

  constructor(
    private userService: UserAuthService,
    private shopService: ShopService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getShop();
    this.initForm();
    this.onAliasChange();
  }

  onAliasChange() {
    this.shopInfoForm
      .get('alias')
      ?.valueChanges.pipe(takeUntil(this.subs$))
      .subscribe({
        next: (value) => {
          this.enteredAlias = value;
        },
      });
  }

  getUser() {
    this.user = this.userService.currentUser;
  }

  getShop() {
    this.shop = this.shopService.currentShop;
  }

  initForm() {
    this.shopInfoForm = new FormGroup({
      ownerName: new FormControl(
        this.user?.name.first + ' ' + this.user?.name.last || ''
      ),
      shopName: new FormControl(this.shop?.name),
      alias: new FormControl(this.shop?.alias || '', [
        Validators.required,
        Validators.pattern(/^[a-z0-9-]*$/),
        Validators.maxLength(50),
      ]),
      email: new FormControl(this.shop?.email || ''),
      contactLines: new FormArray([], [Validators.required]),
      address: new FormGroup({
        full: new FormControl(
          this.shop?.address?.full || '',
          Validators.required
        ),
        city: new FormControl(this.shop?.address?.city || ''),
        state: new FormControl(
          this.shop?.address?.state || '',
          Validators.required
        ),
        country: new FormControl(
          this.shop?.address?.country || '',
          Validators.required
        ),
      }),
      description: new FormControl(this.shop?.description || '', [
        Validators.required,
        Validators.maxLength(250),
      ]),
    });

    this.enteredAlias = this.shop?.alias || '';
    this.onAddContactLine(this.shop?.contactLines);
  }

  get contactLines() {
    return this.shopInfoForm.get('contactLines') as FormArray;
  }

  onAddContactLine(lines?: string[]) {
    const validators = [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern('^[0-9]*$'),
    ];

    if (lines && lines.length > 0) {
      this.shop?.contactLines.forEach((line) => {
        this.contactLines.push(new FormControl(line, validators));
      });
    } else {
      this.contactLines.push(new FormControl('', validators));
    }
  }

  onRemoveContactLine(index: number) {
    if (this.contactLines.controls.length < 2) return;
    this.contactLines.removeAt(index);
  }

  onSubmit() {
    this.loading = true;
    const { alias, contactLines, address, description } =
      this.shopInfoForm.value;

    this.shopService
      .updateShop(
        { alias, contactLines, address, description },
        this.shop?._id!
      )
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: () => {
          this.notifService.add(
            'Shop Information updated successfully!',
            'success'
          );
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
