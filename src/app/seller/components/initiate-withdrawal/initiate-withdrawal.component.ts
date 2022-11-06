import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ShopService } from '../../services/shop.service';
import { NotificationsService } from 'src/app/services/notification.service';
import { BankAccountDetails } from '../../types/shop';
import { SellerWalletService } from '../../services/seller-wallet.service';

@Component({
  selector: 'app-initiate-withdrawal',
  templateUrl: './initiate-withdrawal.component.html',
  styleUrls: ['./initiate-withdrawal.component.scss'],
})
export class InitiateWithdrawalComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  @Output() refetch = new EventEmitter<void>();

  bankAccDetails?: BankAccountDetails;
  shopId!: string;
  form!: FormGroup;
  loading = false;

  constructor(
    private shopService: ShopService,
    private notifService: NotificationsService,
    private walletService: SellerWalletService
  ) {}

  ngOnInit(): void {
    this.bankAccDetails =
      this.shopService.currentShop?.paymentDetails?.bankAccountDetails;
    this.shopId = this.shopService.currentShop?._id!;

    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      amount: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.loading = true;
    const data = { ...this.form.value, shopId: this.shopId };
    this.subs = this.walletService.initiateWithdrawal(data).subscribe({
      next: () => {
        this.loading = false;
        this.notifService.add(
          'Withdrawal request sent successfully!',
          'success'
        );
        this.form.reset();
        this.refetch.emit();
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
