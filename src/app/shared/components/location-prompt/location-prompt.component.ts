import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalService } from 'src/app/services/modal.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-prompt',
  templateUrl: './location-prompt.component.html',
  styleUrls: ['./location-prompt.component.scss'],
})
export class LocationPromptComponent implements OnDestroy {
  subs?: Subscription;

  constructor(
    private locService: LocationService,
    private modalService: ModalService
  ) {}

  onGetLocation() {
    this.subs = this.locService.getCurrentLocation().subscribe({
      next: () => {
        this.modalService.close();
      },
      error: () => {
        this.modalService.close();
      },
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
