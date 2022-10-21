import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-banner-images',
  templateUrl: './logo-banner-images.component.html',
  styleUrls: ['./logo-banner-images.component.scss'],
})
export class LogoBannerImagesComponent implements OnInit {
  logo?: File;
  logoPreviewUrl: any;
  banner?: File;
  bannerPreviewUrl: any;

  constructor() {}

  ngOnInit(): void {}

  onSelectLogo(file: File) {
    this.logoPreviewUrl = null;
    this.logo = file;

    const reader = new FileReader();
    reader.onload = () => (this.logoPreviewUrl = reader.result);
    reader.readAsDataURL(file);
  }

  onSelectBanner(file: File) {
    this.bannerPreviewUrl = null;
    this.banner = file;

    const reader = new FileReader();
    reader.onload = () => (this.bannerPreviewUrl = reader.result);
    reader.readAsDataURL(file);
  }

  onUploadLogo() {

  }

  onUploadBanner() {}
}
