import { NgModule } from '@angular/core';

import { SharedModule } from './shared.module';

import { UserLoginComponent } from './pages/user-login/user-login.component';

@NgModule({
  declarations: [UserLoginComponent],
  imports: [SharedModule],
  exports: [SharedModule, UserLoginComponent],
})
export class BuyerSellerSharedModule {}
