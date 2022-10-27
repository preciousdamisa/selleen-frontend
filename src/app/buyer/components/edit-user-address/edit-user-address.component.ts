import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ModalService } from 'src/app/services/modal.service';
import { NotificationsService } from 'src/app/services/notification.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SelectOption } from 'src/app/shared/types/shared';

@Component({
  selector: 'app-edit-user-address',
  templateUrl: './edit-user-address.component.html',
  styleUrls: ['./edit-user-address.component.scss'],
})
export class EditUserAddressComponent implements OnInit, OnDestroy {
  subs?: Subscription;

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
    private authService: UserAuthService,
    private userService: UserService,
    private notifService: NotificationsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser!;

    this.form = new FormGroup({
      address: new FormGroup({
        full: new FormControl(user.address?.full || '', Validators.required),
        city: new FormControl(user.address?.city || ''),
        state: new FormControl(user.address?.state || '', Validators.required),
        country: new FormControl(
          user.address?.country || '',
          Validators.required
        ),
      }),
    });
  }

  onSubmit() {
    this.loading = true;

    this.subs = this.userService.updateAddress(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.notifService.add('Saved successfully!', 'success');
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
