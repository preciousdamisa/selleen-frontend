import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { NotificationsService } from 'src/app/services/notification.service';
import CustomValidators from 'src/app/shared/utils/custom-validators';

@Component({
  selector: 'app-change-seller-password',
  templateUrl: './change-seller-password.component.html',
  styleUrls: ['./change-seller-password.component.scss'],
})
export class ChangeSellerPasswordComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  pwForm!: FormGroup;
  loading = false;

  constructor(
    private userService: UserAuthService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.pwForm = new FormGroup(
      {
        oldPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      CustomValidators.mustMatch('newPassword', 'confirmPassword')
    );
  }

  onSubmit() {
    this.loading = true;
    delete this.pwForm.value.confirmPassword;

    this.subs = this.userService.changePassword(this.pwForm.value).subscribe({
      next: () => {
        this.notifService.add('Password changed successfully!', 'success');
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
