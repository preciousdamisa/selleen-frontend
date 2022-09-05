import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared.module';

import { UserLoginComponent } from './pages/user-login/user-login.component';
import { TodoComponent } from './components/todo/todo.component';
import { UserAuthInterceptorService } from './services/user-auth-interceptor.service';

@NgModule({
  declarations: [UserLoginComponent, TodoComponent],
  imports: [SharedModule],
  exports: [SharedModule, UserLoginComponent, TodoComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserAuthInterceptorService,
      multi: true,
    },
  ],
})
export class BuyerSellerSharedModule {}
