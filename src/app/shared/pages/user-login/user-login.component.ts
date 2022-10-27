import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  subs?: Subscription;

  forSeller = false;
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.getRouteData();
    this.initForm();
  }

  getRouteData() {
    this.forSeller = this.route.snapshot.data['forSeller'];
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      rememberMe: new FormControl(true),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    delete this.loginForm.value.rememberMe;

    this.loading = true;
    this.subs = this.userService.login(this.loginForm.value).subscribe({
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
