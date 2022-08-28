import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './components/card/card.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    CardComponent,
    InputComponent,
    ButtonComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CardComponent, InputComponent, ButtonComponent, SpinnerComponent],
})
export class SharedModule {}
