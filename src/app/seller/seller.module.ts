import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { SharedModule } from '../shared/shared.module';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { SellerDashboardComponent } from './pages/seller-dashboard/seller-dashboard.component';
import { SellerSettingsComponent } from './pages/seller-settings/seller-settings.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ProductComponent } from './pages/product/product.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { SellerNavComponent } from './componennts/seller-nav/seller-nav.component';

@NgModule({
  declarations: [SellerSignupComponent, SellerHomeComponent, SellerDashboardComponent, SellerSettingsComponent, SalesComponent, ProductComponent, ShippingComponent, WalletComponent, SellerNavComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class SellerModule {}
