import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from '../shared/pages/user-login/user-login.component';
import { BuyerAccountComponent } from './pages/buyer-account/buyer-account.component';
import { BuyerHomeComponent } from './pages/buyer-home/buyer-home.component';
import { BuyerOrdersComponent } from './pages/buyer-orders/buyer-orders.component';
import { BuyerProductDetailsComponent } from './pages/buyer-product-details/buyer-product-details.component';
import { BuyerSignupComponent } from './pages/buyer-signup/buyer-signup.component';
import { BuyerStartComponent } from './pages/buyer-start/buyer-start.component';
import { ShopComponent } from './pages/shop/shop.component';

import { BuyerAuthGuard } from './services/buyer-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BuyerHomeComponent,
    children: [
      { path: '', component: BuyerStartComponent, pathMatch: 'full' },
      {
        path: 'account',
        canActivate: [BuyerAuthGuard],
        component: BuyerAccountComponent,
      },
      {
        path: 'orders',
        canActivate: [BuyerAuthGuard],
        component: BuyerOrdersComponent,
      },
    ],
  },
  {
    path: 'login',
    component: UserLoginComponent,
  },
  {
    path: 'signup',
    component: BuyerSignupComponent,
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
