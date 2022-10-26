import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-buyer-side-nav',
  templateUrl: './buyer-side-nav.component.html',
  styleUrls: ['./buyer-side-nav.component.scss'],
})
export class BuyerSideNavComponent implements OnInit, OnDestroy {
  subs?: Subscription;

  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.listenForWindowchange();
  }

  listenForWindowchange() {
    this.subs = fromEvent(window, 'resize').subscribe({
      next: (evt: any) => {
        const width = evt.target.innerWidth;
        if (width <= 640) this.modalService.close();
      },
    });
  }

  onCloseNav() {
    this.modalService.close();
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
