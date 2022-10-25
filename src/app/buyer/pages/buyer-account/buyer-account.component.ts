import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-buyer-account',
  templateUrl: './buyer-account.component.html',
  styleUrls: ['./buyer-account.component.scss'],
})
export class BuyerAccountComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  user!: User;

  isDesktop = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.currentUser!;
    this.listenToWindowchange();
  }

  listenToWindowchange() {
    this.checkWidth(window.innerWidth);

    this.subs = fromEvent(window, 'resize').subscribe({
      next: (evt: any) => {
        this.checkWidth(evt.target.innerWidth);
      },
    });
  }

  checkWidth(width: number) {
    this.isDesktop = width > 640;
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
