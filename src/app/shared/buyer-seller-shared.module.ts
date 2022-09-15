import { NgModule } from '@angular/core';

import { SharedModule } from './shared.module';

import { UserLoginComponent } from './pages/user-login/user-login.component';
import { TodoComponent } from './components/todo/todo.component';

@NgModule({
  declarations: [UserLoginComponent, TodoComponent],
  imports: [SharedModule],
  exports: [SharedModule, UserLoginComponent, TodoComponent],
})
export class BuyerSellerSharedModule {}
