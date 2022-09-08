import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { UserLoginComponent } from '../shared/pages/user-login/user-login.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { SellerDashboardComponent } from './pages/seller-dashboard/seller-dashboard.component';
import { SellerSettingsComponent } from './pages/seller-settings/seller-settings.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ProductsComponent } from './pages/products/products.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { ShippingComponent } from './pages/shipping/shipping.component';

import { SellerAuthGuard } from './services/seller-auth.guard';

const routes: Routes = [
  {
    path: 'seller',
    children: [
      { path: '', redirectTo: '/seller/shop/dashboard', pathMatch: 'full' },
      { path: 'signup', component: SellerSignupComponent },
      { path: 'login', component: UserLoginComponent },
      {
        path: 'shop',
        component: SellerHomeComponent,
        canActivate: [SellerAuthGuard],
        children: [
          { path: '', redirectTo: '/seller/shop/dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: SellerDashboardComponent,
          },
          {
            path: 'sales',
            component: SalesComponent,
          },
          {
            path: 'products',
            component: ProductsComponent,
          },
          {
            path: 'shipping',
            component: ShippingComponent,
          },
          {
            path: 'wallet',
            component: WalletComponent,
          },
          { path: 'settings', component: SellerSettingsComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
