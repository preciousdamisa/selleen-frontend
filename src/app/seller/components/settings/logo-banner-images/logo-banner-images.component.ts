import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo-banner-images',
  templateUrl: './logo-banner-images.component.html',
  styleUrls: ['./logo-banner-images.component.scss'],
})
export class LogoBannerImagesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSelectLogo(file: File) {}

  onSelectBanner(file: File) {}
}
