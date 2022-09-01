import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';

const routes: Routes = [
  {
    path: 'seller',
    children: [{ path: 'signup', component: SellerSignupComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
