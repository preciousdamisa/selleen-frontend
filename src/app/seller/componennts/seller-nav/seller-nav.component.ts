import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { SellerNavService } from '../../services/seller-nav.service';

@Component({
  selector: 'app-seller-nav',
  templateUrl: './seller-nav.component.html',
  styleUrls: ['./seller-nav.component.scss'],
})
export class SellerNavComponent implements OnInit {
  subs$ = new Subject<void>();
  open = true;
  user?: User | null;

  constructor(
    private sellerNavService: SellerNavService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.listenForNavStatusChange();
    this.getUser();
  }

  listenForNavStatusChange() {
    this.sellerNavService.show.pipe(takeUntil(this.subs$)).subscribe({
      next: (show) => {
        this.open = show;
      },
    });
  }

  getUser() {
    this.userService.user$.pipe(takeUntil(this.subs$)).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
