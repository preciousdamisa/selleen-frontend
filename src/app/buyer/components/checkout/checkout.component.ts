import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ModalService } from 'src/app/services/modal.service';
import { NotificationsService } from 'src/app/services/notification.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SelectOption } from 'src/app/shared/types/shared';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { PlaceOrderReqBody } from '../../types/product.types';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  totalAmt = 0;

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
    private userService: UserService,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private locService: LocationService,
    private notifService: NotificationsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getTotalAmt();
  }

  initForm() {
    const user = this.userService.currentUser;

    this.form = new FormGroup({
      name: new FormGroup({
        first: new FormControl(user?.name.first, Validators.required),
        last: new FormControl(user?.name.last, Validators.required),
      }),
      phone: new FormControl(user?.phone, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]*$'),
      ]),
      address: new FormGroup({
        full: new FormControl(user?.address?.full, Validators.required),
        city: new FormControl(user?.address?.city),
        state: new FormControl(user?.address?.state, Validators.required),
        country: new FormControl(user?.address?.country, Validators.required),
      }),
      note: new FormControl('', Validators.maxLength(500)),
    });
  }

  getTotalAmt() {
    this.totalAmt = this.checkoutService.getTotalAmt();
  }

  onPlaceOrder() {
    this.loading = true;
    const products = this.cartService.cart;
    const loc = this.locService.currentLocation;

    const data: PlaceOrderReqBody = {
      ...this.form.value,
      products,
      coords: { lat: loc?.latitude, lng: loc?.longitude },
    };

    this.subs = this.checkoutService.placeOrder(data).subscribe({
      next: () => {
        this.loading = false;
        this.notifService.add('Order placed successfully', 'success');
        this.cartService.clearCart();
        this.modalService.close();
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
