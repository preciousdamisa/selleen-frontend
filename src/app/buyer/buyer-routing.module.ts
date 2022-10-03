import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from '../shared/pages/user-login/user-login.component';
import { BuyerHomeComponent } from './pages/buyer-home/buyer-home.component';
import { BuyerProductsComponent } from './pages/buyer-products/buyer-products.component';

const routes: Routes = [
  {
    path: '',
    component: BuyerHomeComponent,
    children: [{ path: '', component: BuyerProductsComponent }],
  },
  {
    path: 'login',
    component: UserLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerRoutingModule {}
