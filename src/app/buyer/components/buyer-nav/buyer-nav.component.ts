import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/shared/services/user.service';
import { BuyerNavService } from '../../services/buyer-nav.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-buyer-nav',
  templateUrl: './buyer-nav.component.html',
  styleUrls: ['./buyer-nav.component.scss'],
})
export class BuyerNavComponent implements OnInit {
  subs$ = new Subject<void>();
  open = true;
  user?: User | null;

  constructor(
    private buyerNavService: BuyerNavService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.listenForNavStatusChange();
    this.getUser();
  }

  listenForNavStatusChange() {
    this.buyerNavService.show.pipe(takeUntil(this.subs$)).subscribe({
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
