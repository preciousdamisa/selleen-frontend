import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminSignupComponent } from './pages/admin-signup/admin-signup.component';
import { AdminAuthGuard } from './services/admin-auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        canActivate: [AdminAuthGuard],
        pathMatch: 'full',
        children: [{ path: '', component: AdminDashboardComponent }],
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
