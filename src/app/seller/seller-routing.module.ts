import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { UserLoginComponent } from '../shared/pages/user-login/user-login.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { SellerDashboardComponent } from './pages/seller-dashboard/seller-dashboard.component';
import { SellerAuthGuard } from './services/seller-auth.guard';

const routes: Routes = [
  {
    path: 'seller',
    children: [
      {
        path: '',
        component: SellerHomeComponent,
        canActivate: [SellerAuthGuard],
        pathMatch: 'full',
        children: [{ path: '', component: SellerDashboardComponent }],
      },
      { path: 'signup', component: SellerSignupComponent },
      { path: 'login', component: UserLoginComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
