import { NgModule } from '@angular/core';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerSellerSharedModule } from '../shared/buyer-seller-shared.module';

import { BuyerHomeComponent } from './pages/buyer-home/buyer-home.component';
import { BuyerNavComponent } from './components/buyer-nav/buyer-nav.component';
import { BuyerProductsComponent } from './pages/buyer-products/buyer-products.component';
import { BuyerProductComponent } from './components/buyer-product/buyer-product.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [BuyerHomeComponent, BuyerNavComponent, BuyerProductsComponent, BuyerProductComponent, FooterComponent],
  imports: [BuyerRoutingModule, BuyerSellerSharedModule],
})
export class BuyerModule {}
