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
import { SellerDashboardHeaderComponent } from './components/seller-dashboard-header/seller-dashboard-header.component';
import { ProductsComponent } from './pages/products/products.component';
import { TabComponent } from './components/tab/tab.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { LogoBannerImagesComponent } from './components/settings/logo-banner-images/logo-banner-images.component';
import { AddEditShopInfoComponent } from './components/settings/add-edit-shop-info/add-edit-shop-info.component';
import { AddEditProdVariationComponent } from './components/settings/add-edit-prod-variation/add-edit-prod-variation.component';

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
    SellerDashboardHeaderComponent,
    ProductsComponent,
    TabComponent,
    TabBarComponent,
    LogoBannerImagesComponent,
    AddEditShopInfoComponent,
    AddEditProdVariationComponent,
  ],
  imports: [
    SellerRoutingModule,
    BuyerSellerSharedModule,
    AdminSellerSharedModule,
  ],
})
export class SellerModule {}
