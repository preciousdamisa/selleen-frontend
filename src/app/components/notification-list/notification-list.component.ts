import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationsService } from 'src/app/services/notification.service';
import { Command } from 'src/app/types';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  messages?: Command[];

  constructor(private notifsServ: NotificationsService) {}

  ngOnInit(): void {
    this.subs = this.notifsServ.messagesOut.subscribe({
      next: (msgs) => {
        this.messages = msgs;
      },
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
