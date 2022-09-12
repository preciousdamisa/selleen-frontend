import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SelectOption } from 'src/app/shared/types/shared';
import CustomValidators from 'src/app/shared/utils/custom-validators';
import { AdminAuthService } from '../../services/admin-auth.service';
import { NotificationsService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss'],
})
export class AdminSignupComponent implements OnInit, OnDestroy {
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

  loading = false;

  constructor(
    private adminAuthService: AdminAuthService,
    private notifService: NotificationsService
  ) {}

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
        address: new FormGroup({
          full: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
          state: new FormControl('', Validators.required),
          country: new FormControl('', Validators.required),
        }),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
        agreedToTerms: new FormControl(false),
      },
      CustomValidators.mustMatch('password', 'confirmPassword')
    );
  }

  get firstNameHasError() {
    const { touched, errors } = this.signupForm.get(
      'name.first'
    ) as FormControl;
    return touched && errors;
  }

  get lastNameHasError() {
    const { touched, errors } = this.signupForm.get('name.last') as FormControl;
    return touched && errors;
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
    this.subs = this.adminAuthService.signup(this.signupForm.value).subscribe({
      next: () => {
        this.notifService.add('Signed up successfully!', 'success');
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
