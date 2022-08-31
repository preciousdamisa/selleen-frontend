import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AdminSignupComponent } from './pages/admin-signup/admin-signup.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';

@NgModule({
  declarations: [
    AdminSignupComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    AdminNavComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class AdminModule {}
