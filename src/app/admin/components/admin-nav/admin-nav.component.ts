import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminAuthService } from '../../services/admin-auth.service';

import { AdminNavService } from '../../services/admin-nav.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss'],
})
export class AdminNavComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  open = true;

  constructor(
    private adminNavService: AdminNavService,
    private adminAuthService: AdminAuthService
  ) {}

  ngOnInit(): void {
    this.subs = this.adminNavService.show.subscribe({
      next: (show) => {
        this.open = show;
      },
    });
  }

  onLogout() {
    this.adminAuthService.logout();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
