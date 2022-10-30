import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ShopService } from 'src/app/seller/services/shop.service';
import { NotificationsService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-logo-banner-images',
  templateUrl: './logo-banner-images.component.html',
  styleUrls: ['./logo-banner-images.component.scss'],
})
export class LogoBannerImagesComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  logo?: File | null;
  logoPreviewUrl?: string | null;
  updatingLogo = false;

  banner?: File | null;
  bannerPreviewUrl?: string | null;
  updatingBanner = false;

  shopId!: string;

  constructor(
    private shopService: ShopService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.shopId = this.shopService.currentShop!._id;
  }

  onSelectLogo(files: File[]) {
    this.logo = files[0];
  }

  onLogoPreviewUrl(urls: string[]) {
    this.logoPreviewUrl = urls[0];
  }

  onSelectBanner(files: File[]) {
    this.banner = files[0];
  }

  onBannerPreviewUrl(urls: string[]) {
    this.bannerPreviewUrl = urls[0];
  }

  onUpdateLogo() {
    this.updatingLogo = true;
    this.shopService
      .updateLogo(this.logo!, this.shopId)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: () => {
          this.updatingLogo = false;
          this.logo = null;
          this.logoPreviewUrl = null;
          this.notifService.add('Logo updated successfully', 'success');
        },
        error: () => {
          this.updatingLogo = false;
        },
      });
  }

  onUpdateBanner() {
    this.updatingBanner = true;
    this.shopService
      .updateBanner(this.banner!, this.shopId)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: () => {
          this.updatingBanner = false;
          this.banner = null;
          this.bannerPreviewUrl = null;
          this.notifService.add('Banner updated successfully', 'success');
        },
        error: () => {
          this.updatingBanner = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
