import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ModalService } from 'src/app/services/modal.service';
import { NotificationsService } from 'src/app/services/notification.service';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.scss'],
})
export class EditUserDataComponent implements OnInit, OnDestroy {
  subs?: Subscription;

  form!: FormGroup;
  loading = false;

  constructor(
    private authService: UserAuthService,
    private userService: UserService,
    private notifService: NotificationsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const user = this.authService.currentUser!;

    this.form = new FormGroup({
      name: new FormGroup({
        first: new FormControl(user.name.first),
        last: new FormControl(user.name.last),
      }),
      email: new FormControl(user.email),
      phone: new FormControl(user.phone, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  onSubmit() {
    delete this.form.value.name;
    delete this.form.value.email;

    this.loading = true;
    this.subs = this.userService.updatePhone(this.form.value).subscribe({
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
