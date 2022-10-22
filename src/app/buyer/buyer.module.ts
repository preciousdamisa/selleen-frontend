import { NgModule } from '@angular/core';

import { BuyerRoutingModule } from './buyer-routing.module';
import { BuyerSellerSharedModule } from '../shared/buyer-seller-shared.module';
import { SharedModule } from '../shared/shared.module';

import { BuyerHomeComponent } from './pages/buyer-home/buyer-home.component';
import { BuyerNavComponent } from './components/buyer-nav/buyer-nav.component';
import { BuyerProductsComponent } from './pages/buyer-products/buyer-products.component';
import { BuyerProductComponent } from './components/buyer-product/buyer-product.component';
import { FooterComponent } from './components/footer/footer.component';
import { BuyerProductSearchComponent } from './components/buyer-product-search/buyer-product-search.component';
import { CartComponent } from './components/cart/cart.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ShopProfileCardComponent } from './components/shop-profile-card/shop-profile-card.component';
import { BuyerStartComponent } from './pages/buyer-start/buyer-start.component';
import { BuyerProductDetailsComponent } from './pages/buyer-product-details/buyer-product-details.component';
import { BankAccountDetailsComponent } from './components/bank-account-details/bank-account-details.component';
import { BuyerSignupComponent } from './pages/buyer-signup/buyer-signup.component';

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
    ShopComponent,
    ShopProfileCardComponent,
    BuyerStartComponent,
    BuyerProductDetailsComponent,
    BankAccountDetailsComponent,
    BuyerSignupComponent,
  ],
  imports: [SharedModule, BuyerRoutingModule, BuyerSellerSharedModule],
})
export class BuyerModule {}
