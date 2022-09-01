import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SellerSignupComponent],
  imports: [
    CommonModule,
    SellerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class SellerModule {}
