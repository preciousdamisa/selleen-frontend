import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { Shop } from 'src/app/seller/models/shop.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ShopService } from 'src/app/seller/services/shop.service';
import { SelectOption } from 'src/app/shared/types/shared';

@Component({
  selector: 'app-add-edit-shop-info',
  templateUrl: './add-edit-shop-info.component.html',
  styleUrls: ['./add-edit-shop-info.component.scss'],
})
export class AddEditShopInfoComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  user?: User | null;
  shop?: Shop | null;

  stateSelectOpts: SelectOption[] = [
    { label: '~~ Select State ~~', value: '' },
    { label: 'Abuja', value: 'Abuja' },
    { label: 'Delta', value: 'Delta' },
    { label: 'Edo', value: 'Edo' },
    { label: 'Lagos', value: 'Lagos' },
  ];
  countrySelectOpts: SelectOption[] = [
    { label: '~~ Select Country ~~', value: '' },
    { label: 'Nigeria', value: 'Nigeria' },
  ];

  shopInfoForm!: FormGroup;
  loading = false;
  enteredAlias = '';

  constructor(
    private userService: UserService,
    private shopService: ShopService
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
    this.userService.user$
      .pipe(takeUntil(this.subs$))
      .subscribe({ next: (user) => (this.user = user) });
  }

  getShop() {
    this.shopService
      .getShop(this.user?.shops[0].id!)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.shop = res.data;
        },
      });
  }

  initForm() {
    this.shopInfoForm = new FormGroup({
      ownersName: new FormControl(
        this.user?.name.first + ' ' + this.user?.name.last || ''
      ),
      shopName: new FormControl(this.shop?.name),
      alias: new FormControl(this.shop?.alias || '', [
        Validators.required,
        Validators.pattern(/^[a-z0-9-]*$/),
        Validators.maxLength(50),
      ]),
      email: new FormControl(this.shop?.email || ''),
      supportLines: new FormArray([], [Validators.required]),
      address: new FormGroup({
        full: new FormControl(
          this.shop?.address.full || '',
          Validators.required
        ),
        city: new FormControl(
          this.shop?.address.city || '',
          Validators.required
        ),
        state: new FormControl(
          this.shop?.address.state || '',
          Validators.required
        ),
        country: new FormControl(
          this.shop?.address.country || '',
          Validators.required
        ),
      }),
      description: new FormControl(this.shop?.description || '', [
        Validators.required,
        Validators.maxLength(250),
      ]),
    });

    this.enteredAlias = this.shop?.alias || '';
    this.onAddSupportLine(this.shop?.supportLines);
  }

  get supportLines() {
    return this.shopInfoForm.get('supportLines') as FormArray;
  }

  onAddSupportLine(lines?: string[]) {
    if (lines && lines.length > 0) {
      this.shop?.supportLines.forEach((line) => {
        this.supportLines.push(new FormControl(line, Validators.required));
      });
    } else {
      this.supportLines.push(
        new FormControl('', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$'),
        ])
      );
    }
  }

  onRemoveSupportLine(index: number) {
    if (this.supportLines.controls.length < 2) return;
    this.supportLines.removeAt(index);
  }

  onSubmit() {
    this.loading = true;
    const { alias, supportLines, address, description } =
      this.shopInfoForm.value;

    this.shopService
      .updateShop(
        { alias, supportLines, address, description },
        this.shop?._id!
      )
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: () => {
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
