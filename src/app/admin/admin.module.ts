import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AdminSignupComponent } from './pages/admin-signup/admin-signup.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { AdminDashboardHeaderComponent } from './components/admin-dashboard-header/admin-dashboard-header.component';
import { AdminPageWrapperComponent } from './components/admin-page-wrapper/admin-page-wrapper.component';
import { StatisticComponent } from './components/statistic/statistic.component';

import { AdminAuthInterceptorService } from './services/admin-auth-interceptor.service';

@NgModule({
  declarations: [
    AdminSignupComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    AdminNavComponent,
    AdminDashboardHeaderComponent,
    AdminPageWrapperComponent,
    StatisticComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminAuthInterceptorService,
      multi: true,
    },
  ],
})
export class AdminModule {}
