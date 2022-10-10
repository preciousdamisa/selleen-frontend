import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from '../shared/pages/user-login/user-login.component';
import { BuyerHomeComponent } from './pages/buyer-home/buyer-home.component';
import { BuyerProductDetailsComponent } from './pages/buyer-product-details/buyer-product-details.component';
import { BuyerStartComponent } from './pages/buyer-start/buyer-start.component';
import { ShopComponent } from './pages/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BuyerStartComponent,
    children: [{ path: '', component: BuyerHomeComponent }],
  },
  {
    path: 'login',
    component: UserLoginComponent,
  },
  {
    path: ':alias/products/:productName/:productId',
    component: BuyerProductDetailsComponent,
  },
  { path: ':alias', component: ShopComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerRoutingModule {}
