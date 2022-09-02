import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { UserLoginComponent } from '../shared/pages/user-login/user-login.component';

const routes: Routes = [
  {
    path: 'seller',
    children: [
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
