import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller-page-header',
  templateUrl: './seller-page-header.component.html',
  styleUrls: ['./seller-page-header.component.scss'],
})
export class SellerPageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
}
