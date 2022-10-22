import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { NotificationsService } from 'src/app/services/notification.service';
import CustomValidators from 'src/app/shared/utils/custom-validators';
import { BuyerService } from '../../services/buyer.service';

@Component({
  selector: 'app-buyer-signup',
  templateUrl: './buyer-signup.component.html',
  styleUrls: ['./buyer-signup.component.scss'],
})
export class BuyerSignupComponent implements OnInit {
  subs?: Subscription;

  form!: FormGroup;
  loading = false;

  constructor(
    private buyerService: BuyerService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup(
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

        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      CustomValidators.mustMatch('password', 'confirmPassword')
    );
  }

  onSubmit() {
    this.loading = true;

    delete this.form.value.confirmPassword;

    this.subs = this.buyerService.signup(this.form.value).subscribe({
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
