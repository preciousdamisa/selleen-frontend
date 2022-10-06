import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { UserLoginComponent } from '../shared/pages/user-login/user-login.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { SellerDashboardComponent } from './pages/seller-dashboard/seller-dashboard.component';
import { SellerSettingsComponent } from './pages/seller-settings/seller-settings.component';
import { SellerOrdersComponent } from './pages/seller-orders/seller-orders.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { AddEditProductComponent } from './pages/add-edit-product/add-edit-product.component';
import { SellerProductsComponent } from './pages/seller-products/seller-products.component';
import { SellerProductsHomeComponent } from './pages/seller-products-home/seller-products-home.component';

import { SellerAuthGuard } from './services/seller-auth.guard';
import { ShopResolverService } from './services/shop-resolver.service';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/seller/shop/dashboard', pathMatch: 'full' },
      { path: 'signup', component: SellerSignupComponent },
      {
        path: 'login',
        component: UserLoginComponent,
        data: { forSeller: true },
      },
      {
        path: 'shop',
        component: SellerHomeComponent,
        canActivate: [SellerAuthGuard],
        resolve: [ShopResolverService],
        children: [
          { path: '', redirectTo: '/seller/shop/dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            component: SellerDashboardComponent,
          },
          {
            path: 'orders',
            component: SellerOrdersComponent,
          },
          {
            path: 'products',
            component: SellerProductsHomeComponent,
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: SellerProductsComponent,
              },
              { path: 'add-edit-product', component: AddEditProductComponent },
            ],
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
