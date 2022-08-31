import { Component, OnInit } from '@angular/core';

import { AdminAuthService } from './admin/services/admin-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private adminAuthService: AdminAuthService) {}

  ngOnInit(): void {
    this.adminAuthService.autoLogin();
  }
}
