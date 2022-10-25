import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from 'src/app/services/modal.service';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-buyer-start',
  templateUrl: 'buyer-start.component.html',
  styleUrls: ['buyer-start.component.scss'],
})
export class BuyerStartComponent implements OnInit {
  @ViewChild('locationPrompt', { static: true })
  locationPrompt!: TemplateRef<any>;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private locService: LocationService
  ) {}

  ngOnInit(): void {
    this.showLocationPrompt(this.locationPrompt);
  }

  onGetAShop() {
    this.router.navigateByUrl('/seller/shop');
  }

  showLocationPrompt(view: TemplateRef<any>) {
    if (!this.locService.allowLocation)
      this.modalService.open({ view, size: 'sm', centered: true });
  }
}
