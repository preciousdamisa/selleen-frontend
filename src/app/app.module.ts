import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { ModalComponent } from './components/modal/modal.component';
import { RequestInterceptorService } from './services/request-interceptor.service';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationListComponent,
    ModalComponent,
    ErrorModalComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
