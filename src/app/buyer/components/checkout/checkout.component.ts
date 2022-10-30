import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ModalService } from 'src/app/services/modal.service';
import { User } from 'src/app/shared/models/user.model';
import { LocationService } from 'src/app/shared/services/location.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { SelectOption } from 'src/app/shared/types/shared';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { SaveOrderReqBody } from '../../types/order.types';
import { BankTransferAuthorizationData } from '../../types/payment.types';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('bankAccDetails') bankAccDetailsView?: TemplateRef<any>;

  subs?: Subscription;
  user!: User;
  totalAmt = 0;
  transferAuthorizationData!: BankTransferAuthorizationData;

  form!: FormGroup;
  loading = false;

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

  constructor(
    private userService: UserAuthService,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private locService: LocationService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser!;

    this.initForm();
    this.getTotalAmt();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormGroup({
        first: new FormControl(this.user?.name.first, Validators.required),
        last: new FormControl(this.user?.name.last, Validators.required),
      }),
      phone: new FormControl(this.user?.phone, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]*$'),
      ]),
      address: new FormGroup({
        full: new FormControl(this.user?.address?.full, Validators.required),
        city: new FormControl(this.user?.address?.city),
        state: new FormControl(this.user?.address?.state, Validators.required),
        country: new FormControl(
          this.user?.address?.country,
          Validators.required
        ),
      }),
      delivery: new FormGroup({
        medium: new FormControl('', Validators.required),
      }),
      note: new FormControl('', Validators.maxLength(500)),
    });
  }

  getTotalAmt() {
    this.totalAmt = this.checkoutService.getTotalAmt();
  }

  onSubmit() {
    this.loading = true;
    const products = this.cartService.cart;
    const loc = this.locService.currentLocation;

    const data: SaveOrderReqBody = {
      ...this.form.value,
      products,
      coords: { lat: loc?.latitude, lng: loc?.longitude },
    };

    this.subs = this.checkoutService
      .getBankTransferDetails({
        order: data,
        email: this.user.email,
        totalAmount: this.totalAmt,
      })
      .subscribe({
        next: (res) => {
          this.transferAuthorizationData = res.data.meta.authorization;
          this.loading = false;
          this.modalService.close();
          this.modalService.open({ view: this.bankAccDetailsView! });
          this.cartService.clearCart();
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
