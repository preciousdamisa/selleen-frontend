import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminSellerSharedModule } from '../shared/admin-seller-shared.module';
import { SharedModule } from '../shared/shared.module';

import { AdminSignupComponent } from './pages/admin-signup/admin-signup.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AdminPageHeaderComponent } from './components/admin-page-header/admin-page-header.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminSettingsComponent } from './pages/admin-settings/admin-settings.component';
import { ShopApprovalComponent } from './components/shop/shop-approval/shop-approval.component';
import { ShopDataComponent } from './components/shop/shop-data/shop-data.component';
import { ShopBankDataComponent } from './components/shop/shop-bank-data/shop-bank-data.component';
import { ShopKycDataComponent } from './components/shop/shop-kyc-data/shop-kyc-data.component';
import { ShopInfoComponent } from './components/shop/shop-info/shop-info.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { ProductApprovalComponent } from './components/product-approval/product-approval.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductDataComponent } from './components/product-data/product-data.component';

@NgModule({
  declarations: [
    AdminSignupComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    AdminNavComponent,
    PaymentComponent,
    AdminPageHeaderComponent,
    ShopsComponent,
    UsersComponent,
    AdminSettingsComponent,
    ShopApprovalComponent,
    ShopDataComponent,
    ShopBankDataComponent,
    ShopKycDataComponent,
    ShopInfoComponent,
    AdminProductsComponent,
    ProductApprovalComponent,
    ProductInfoComponent,
    ProductDataComponent,
  ],
  imports: [AdminRoutingModule, AdminSellerSharedModule, SharedModule],
})
export class AdminModule {}
