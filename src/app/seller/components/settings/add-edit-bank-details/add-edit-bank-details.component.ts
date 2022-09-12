import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ShopService } from 'src/app/seller/services/shop.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SelectOption } from 'src/app/shared/types/shared';
import { Shop } from 'src/app/seller/models/shop.model';
import { NotificationsService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-edit-bank-details',
  templateUrl: './add-edit-bank-details.component.html',
  styleUrls: ['./add-edit-bank-details.component.scss'],
})
export class AddEditBankDetailsComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  bankDetailsForm!: FormGroup;
  bankOpts: SelectOption[] = [
    { label: '~~~ Select Bank ~~~', value: '' },
    { label: 'UBA', value: 'UBA' },
    { label: 'GT Bank', value: 'GT Bank' },
  ];
  accTypeOpts: SelectOption[] = [
    { label: '~~~ Select Account Type ~~~', value: '' },
    { label: 'Savings', value: 'Savings' },
    { label: 'Current', value: 'Current' },
  ];

  enteredBankName = '';
  enteredAccName = '';
  enteredAccType = '';
  enteredAccNo = '';

  shop?: Shop | null;
  shopId!: string;

  loading = false;

  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getShop();
    this.initForm();
    this.listenForChanges();
  }

  listenForChanges() {
    this.bankDetailsForm
      .get('bankName')
      ?.valueChanges.pipe(takeUntil(this.subs$))
      .subscribe({
        next: (val) => (this.enteredBankName = val),
      });

    this.bankDetailsForm
      .get('accountName')
      ?.valueChanges.pipe(takeUntil(this.subs$))
      .subscribe({ next: (val) => (this.enteredAccName = val) });

    this.bankDetailsForm
      .get('accountType')
      ?.valueChanges.pipe(takeUntil(this.subs$))
      .subscribe({ next: (val) => (this.enteredAccType = val) });

    this.bankDetailsForm
      .get('accountNumber')
      ?.valueChanges.pipe(takeUntil(this.subs$))
      .subscribe({ next: (val) => (this.enteredAccNo = val) });
  }

  initForm() {
    const accDetails = this.shop?.paymentDetails.bankAccountDetails;

    this.bankDetailsForm = new FormGroup({
      bankName: new FormControl(accDetails?.bankName || '', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      accountName: new FormControl(accDetails?.accountName || '', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      accountType: new FormControl(accDetails?.accountType || '', [
        Validators.required,
      ]),
      accountNumber: new FormControl(accDetails?.accountNumber || '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
      ]),
    });

    if (this.shop?.paymentDetails.bankAccountDetails) {
      const { bankName, accountName, accountType, accountNumber } =
        this.shop?.paymentDetails.bankAccountDetails;

      this.enteredBankName = bankName;
      this.enteredAccName = accountName;
      this.enteredAccType = accountType;
      this.enteredAccNo = accountNumber;
    }
  }

  getShop() {
    const shopId = this.userService.currentUser?.shops[0].id!;
    this.shopService
      .getShop(shopId)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.shop = res.data;
          this.shopId = shopId;
        },
      });
  }

  onSubmit() {
    this.loading = true;
    this.shopService
      .updateBankAccDetails(this.bankDetailsForm.value, this.shopId)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: () => {
          this.notifService.add(
            'Bank details updated successfully!',
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
