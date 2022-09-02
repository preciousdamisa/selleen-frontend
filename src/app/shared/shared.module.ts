import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './components/card/card.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { TextComponent } from './components/text/text.component';
import { RouterModule } from '@angular/router';
import { LinkComponent } from './components/link/link.component';
import { LogoComponent } from './components/logo/logo.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';

@NgModule({
  declarations: [
    CardComponent,
    InputComponent,
    ButtonComponent,
    SpinnerComponent,
    TextButtonComponent,
    TextComponent,
    LinkComponent,
    LogoComponent,
    UserLoginComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    CardComponent,
    InputComponent,
    ButtonComponent,
    TextButtonComponent,
    TextComponent,
    LinkComponent,
    SpinnerComponent,
    LogoComponent,
  ],
})
export class SharedModule {}
