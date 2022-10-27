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
import { BuyerSideNavComponent } from './components/buyer-side-nav/buyer-side-nav.component';
import { BuyerOrdersComponent } from './pages/buyer-orders/buyer-orders.component';
import { BuyerAccountComponent } from './pages/buyer-account/buyer-account.component';
import { BuyerPageWrapperComponent } from './components/buyer-page-wrapper/buyer-page-wrapper.component';
import { EditUserDataComponent } from './components/edit-user-data/edit-user-data.component';
import { EditUserAddressComponent } from './components/edit-user-address/edit-user-address.component';

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
    BuyerSideNavComponent,
    BuyerOrdersComponent,
    BuyerAccountComponent,
    BuyerPageWrapperComponent,
    EditUserDataComponent,
    EditUserAddressComponent,
  ],
  imports: [SharedModule, BuyerRoutingModule, BuyerSellerSharedModule],
})
export class BuyerModule {}
