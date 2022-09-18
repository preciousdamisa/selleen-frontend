import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminSignupComponent } from './pages/admin-signup/admin-signup.component';
import { UsersComponent } from './pages/users/users.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { AdminSettingsComponent } from './pages/admin-settings/admin-settings.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';

import { AdminAuthGuard } from './services/admin-auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        canActivate: [AdminAuthGuard],
        children: [
          { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: AdminDashboardComponent },
          { path: 'products', component: AdminProductsComponent },
          { path: 'shops', component: ShopsComponent },
          { path: 'users', component: UsersComponent },
          { path: 'payment', component: PaymentComponent },
          { path: 'settings', component: AdminSettingsComponent },
        ],
      },
      { path: 'signup', component: AdminSignupComponent },
      { path: 'login', component: AdminLoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
