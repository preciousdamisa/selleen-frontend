import { NgModule } from '@angular/core';

import { SellerRoutingModule } from './seller-routing.module';
import { BuyerSellerSharedModule } from '../shared/buyer-seller-shared.module';
import { AdminSellerSharedModule } from '../shared/admin-seller-shared.module';

import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { SellerDashboardComponent } from './pages/seller-dashboard/seller-dashboard.component';
import { SellerSettingsComponent } from './pages/seller-settings/seller-settings.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { SellerNavComponent } from './components/seller-nav/seller-nav.component';
import { ProductsComponent } from './pages/products/products.component';
import { LogoBannerImagesComponent } from './components/settings/logo-banner-images/logo-banner-images.component';
import { AddEditShopInfoComponent } from './components/settings/add-edit-shop-info/add-edit-shop-info.component';
import { AddEditProdVariationComponent } from './components/settings/add-edit-prod-variation/add-edit-prod-variation.component';
import { AddEditBankDetailsComponent } from './components/settings/add-edit-bank-details/add-edit-bank-details.component';
import { AddEditKycComponent } from './components/settings/add-edit-kyc/add-edit-kyc.component';
import { ChangeSellerPasswordComponent } from './components/settings/change-seller-password/change-seller-password.component';
import { ProductsHomeComponent } from './pages/products-home/products-home.component';
import { AddEditProductComponent } from './pages/add-edit-product/add-edit-product.component';
import { SellerPageHeaderComponent } from './components/seller-page-header/seller-page-header.component';

@NgModule({
  declarations: [
    SellerSignupComponent,
    SellerHomeComponent,
    SellerDashboardComponent,
    SellerSettingsComponent,
    SalesComponent,
    ShippingComponent,
    WalletComponent,
    SellerNavComponent,
    ProductsComponent,
    LogoBannerImagesComponent,
    AddEditShopInfoComponent,
    AddEditProdVariationComponent,
    AddEditBankDetailsComponent,
    AddEditKycComponent,
    ChangeSellerPasswordComponent,
    ProductsHomeComponent,
    AddEditProductComponent,
    SellerPageHeaderComponent,
  ],
  imports: [
    SellerRoutingModule,
    BuyerSellerSharedModule,
    AdminSellerSharedModule,
  ],
})
export class SellerModule {}
