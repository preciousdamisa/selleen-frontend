import { Component, OnInit } from '@angular/core';

import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  constructor(private adminAuthService: AdminAuthService) {}

  ngOnInit(): void {
    this.adminAuthService.autoLogin();
  }
}
