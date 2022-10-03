import { NgModule } from '@angular/core';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerSellerSharedModule } from '../shared/buyer-seller-shared.module';

import { BuyerHomeComponent } from './pages/buyer-home/buyer-home.component';
import { BuyerNavComponent } from './components/buyer-nav/buyer-nav.component';
import { BuyerProductsComponent } from './pages/buyer-products/buyer-products.component';
import { BuyerProductComponent } from './components/buyer-product/buyer-product.component';
import { FooterComponent } from './components/footer/footer.component';
import { BuyerProductSearchComponent } from './components/buyer-product-search/buyer-product-search.component';
import { CartComponent } from './components/cart/cart.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    BuyerHomeComponent,
    BuyerNavComponent,
    BuyerProductsComponent,
    BuyerProductComponent,
    FooterComponent,
    BuyerProductSearchComponent,
    CartComponent,
    CartProductComponent,
    CheckoutComponent,
  ],
  imports: [BuyerRoutingModule, BuyerSellerSharedModule],
})
export class BuyerModule {}
