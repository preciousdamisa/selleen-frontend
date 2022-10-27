import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

import { ModalService } from 'src/app/services/modal.service';
import { User } from 'src/app/shared/models/user.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-buyer-account',
  templateUrl: './buyer-account.component.html',
  styleUrls: ['./buyer-account.component.scss'],
})
export class BuyerAccountComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  user!: User;

  isDesktop = false;

  constructor(
    private userService: UserAuthService,
    private modalService: ModalService
  ) {}

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

  onUpdateData(view: TemplateRef<any>) {
    this.modalService.open({ view });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
