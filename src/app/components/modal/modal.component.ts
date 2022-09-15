import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShowModalData } from 'src/app/types';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  subs?: Subscription;
  showModalData: ShowModalData = { view: null, size: 'md', centered: false };

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.subs = this.modalService.show.subscribe({
      next: (data) => {
        this.showModalData = { ...this.showModalData, ...data };
      },
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
