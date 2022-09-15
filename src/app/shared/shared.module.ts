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
import { InputErrorsComponent } from './components/input-errors/input-errors.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ModalHeaderComponent } from './components/modal-header/modal-header.component';

import { SpacePipe } from './pipes/space.pipe';

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
    InputErrorsComponent,
    CheckboxComponent,
    DropdownComponent,
    SpacePipe,
    ModalHeaderComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    InputComponent,
    ButtonComponent,
    TextButtonComponent,
    TextComponent,
    LinkComponent,
    SpinnerComponent,
    LogoComponent,
    InputErrorsComponent,
    CheckboxComponent,
    DropdownComponent,
    ModalHeaderComponent,
    SpacePipe,
  ],
})
export class SharedModule {}
