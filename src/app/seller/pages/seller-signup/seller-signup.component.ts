import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SelectOption } from 'src/app/shared/types/shared';
import CustomValidators from 'src/app/shared/utils/custom-validators';
import { SellerAuthService } from '../../services/seller-auth.service';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrls: ['./seller-signup.component.scss'],
})
export class SellerSignupComponent implements OnInit, OnDestroy {
  subs?: Subscription;

  signupForm!: FormGroup;
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
  knowOfOpts: SelectOption[] = [
    { label: '~~ Select ~~', value: '' },
    { label: 'WhatsApp', value: 'WhatsApp' },
    { label: 'Facebook', value: 'Facebook' },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'Twitter', value: 'Twitter' },
    { label: 'Selleen Shop Owner', value: 'Selleen Shop Owner' },
    { label: 'Friend', value: 'Friend' },
  ];

  loading = false;

  constructor(private sellerAuthService: SellerAuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signupForm = new FormGroup(
      {
        name: new FormGroup({
          first: new FormControl('', Validators.required),
          last: new FormControl('', Validators.required),
        }),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$'),
        ]),
        shopName: new FormControl('', Validators.required),
        shopEmail: new FormControl('', [Validators.required, Validators.email]),
        shopAddress: new FormGroup({
          full: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
          state: new FormControl('', Validators.required),
          country: new FormControl('', Validators.required),
        }),
        knowOf: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        agreedToTerms: new FormControl(false),
      },
      CustomValidators.mustMatch('password', 'confirmPassword')
    );
  }

  onSubmit() {
    if (
      this.signupForm.invalid ||
      !this.signupForm.get('agreedToTerms')?.value
    ) {
      return;
    }
    delete this.signupForm.value.confirmPassword;
    delete this.signupForm.value.agreedToTerms;

    this.loading = true;
    this.subs = this.sellerAuthService.signup(this.signupForm.value).subscribe({
      next: () => {
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
