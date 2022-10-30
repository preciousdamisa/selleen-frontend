import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ModalService } from 'src/app/services/modal.service';
import { User } from 'src/app/shared/models/user.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';

@Component({
  selector: 'app-buyer-account',
  templateUrl: './buyer-account.component.html',
  styleUrls: ['./buyer-account.component.scss'],
})
export class BuyerAccountComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();
  user?: User | null;

  isDesktop = false;

  constructor(
    private authService: UserAuthService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.listenToWindowchange();
  }

  getUser() {
    this.authService.user$.pipe(takeUntil(this.subs$)).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  listenToWindowchange() {
    this.checkWidth(window.innerWidth);

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.subs$))
      .subscribe({
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
    this.subs$.next();
    this.subs$.complete();
  }
}
