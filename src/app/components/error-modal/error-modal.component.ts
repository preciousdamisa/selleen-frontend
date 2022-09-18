import { Component, OnDestroy, OnInit } from '@angular/core';

import { ErrorModalService } from 'src/app/services/error-modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  opened = false;
  message?: string;

  constructor(private errModal: ErrorModalService) {}

  ngOnInit(): void {
    this.subs = this.errModal.show.subscribe({
      next: (show) => {
        this.opened = show.display;
        this.message = show.message;
      },
    });
  }

  onDismiss() {
    this.errModal.close();
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
