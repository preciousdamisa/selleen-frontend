import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-header',
  templateUrl: './admin-dashboard-header.component.html',
  styleUrls: ['./admin-dashboard-header.component.scss'],
})
export class AdminDashboardHeaderComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
}
