import { NgModule } from '@angular/core';

import { SellerRoutingModule } from './seller-routing.module';
import { BuyerSellerSharedModule } from '../shared/buyer-seller-shared.module';
import { AdminSellerSharedModule } from '../shared/admin-seller-shared.module';

import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { SellerDashboardComponent } from './pages/seller-dashboard/seller-dashboard.component';
import { SellerSettingsComponent } from './pages/seller-settings/seller-settings.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ProductComponent } from './pages/product/product.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { SellerNavComponent } from './componennts/seller-nav/seller-nav.component';
import { SellerDashboardHeaderComponent } from './components/seller-dashboard-header/seller-dashboard-header.component';

@NgModule({
  declarations: [
    SellerSignupComponent,
    SellerHomeComponent,
    SellerDashboardComponent,
    SellerSettingsComponent,
    SalesComponent,
    ProductComponent,
    ShippingComponent,
    WalletComponent,
    SellerNavComponent,
    SellerDashboardHeaderComponent,
  ],
  imports: [
    SellerRoutingModule,
    BuyerSellerSharedModule,
    AdminSellerSharedModule,
  ],
})
export class SellerModule {}
