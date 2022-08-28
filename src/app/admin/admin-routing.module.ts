import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminSignupComponent } from './pages/admin-signup/admin-signup.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminHomeComponent,
        pathMatch: 'full',
        children: [{ path: '', component: AdminDashboardComponent }],
      },
      { path: 'signup', component: AdminSignupComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
