import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { SellerModule } from './seller/seller.module';
import { BuyerModule } from './buyer/buyer.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BuyerModule,
    AdminModule,
    SellerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
