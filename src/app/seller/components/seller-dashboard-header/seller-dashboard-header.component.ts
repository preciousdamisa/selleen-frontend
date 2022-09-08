import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seller-dashboard-header',
  templateUrl: './seller-dashboard-header.component.html',
  styleUrls: ['./seller-dashboard-header.component.scss'],
})
export class SellerDashboardHeaderComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
}
