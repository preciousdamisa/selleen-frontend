import { Component, OnInit } from '@angular/core';

import { AdminAuthService } from './admin/services/admin-auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private adminAuthService: AdminAuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.adminAuthService.autoLogin();
    this.userService.autoLogin();
  }
}
