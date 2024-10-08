import { NgModule } from '@angular/core';

import { SellerRoutingModule } from './seller-routing.module';
import { BuyerSellerSharedModule } from '../shared/buyer-seller-shared.module';
import { AdminSellerSharedModule } from '../shared/admin-seller-shared.module';

import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { SellerDashboardComponent } from './pages/seller-dashboard/seller-dashboard.component';
import { SellerSettingsComponent } from './pages/seller-settings/seller-settings.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { SellerNavComponent } from './components/seller-nav/seller-nav.component';
import { LogoBannerImagesComponent } from './components/settings/logo-banner-images/logo-banner-images.component';
import { AddEditShopInfoComponent } from './components/settings/add-edit-shop-info/add-edit-shop-info.component';
import { AddEditProdVariationComponent } from './components/settings/add-edit-prod-variation/add-edit-prod-variation.component';
import { AddEditBankDetailsComponent } from './components/settings/add-edit-bank-details/add-edit-bank-details.component';
import { AddEditKycComponent } from './components/settings/add-edit-kyc/add-edit-kyc.component';
import { ChangeSellerPasswordComponent } from './components/settings/change-seller-password/change-seller-password.component';
import { AddEditProductComponent } from './pages/add-edit-product/add-edit-product.component';
import { SellerPageHeaderComponent } from './components/seller-page-header/seller-page-header.component';
import { SellerProductsComponent } from './pages/seller-products/seller-products.component';
import { SellerProductsHomeComponent } from './pages/seller-products-home/seller-products-home.component';
import { SellerOrdersComponent } from './pages/seller-orders/seller-orders.component';
import { InitiateWithdrawalComponent } from './components/initiate-withdrawal/initiate-withdrawal.component';

@NgModule({
  declarations: [
    SellerSignupComponent,
    SellerHomeComponent,
    SellerDashboardComponent,
    SellerSettingsComponent,
    ShippingComponent,
    WalletComponent,
    SellerNavComponent,
    LogoBannerImagesComponent,
    AddEditShopInfoComponent,
    AddEditProdVariationComponent,
    AddEditBankDetailsComponent,
    AddEditKycComponent,
    ChangeSellerPasswordComponent,
    AddEditProductComponent,
    SellerPageHeaderComponent,
    SellerProductsComponent,
    SellerProductsHomeComponent,
    SellerOrdersComponent,
    InitiateWithdrawalComponent,
  ],
  imports: [
    SellerRoutingModule,
    BuyerSellerSharedModule,
    AdminSellerSharedModule,
  ],
})
export class SellerModule {}
