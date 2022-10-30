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
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ListTileComponent } from './components/list-tile/list-tile.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { TabComponent } from './components/tab/tab.component';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { LocationPromptComponent } from './components/location-prompt/location-prompt.component';

import { TooltipDirective } from './directives/tooltip.directive';
import { OutsideClickDirective } from './directives/outside-click.directive';

import { SpacePipe } from './pipes/space.pipe';
import { FilePicker2Component } from './components/file-picker2/file-picker2.component';

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
    TooltipComponent,
    TooltipDirective,
    OutsideClickDirective,
    ListTileComponent,
    LocationPromptComponent,
    ViewOrderComponent,
    TabBarComponent,
    TabComponent,
    PageWrapperComponent,
    FilePicker2Component,
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
    ListTileComponent,
    TooltipDirective,
    OutsideClickDirective,
    SpacePipe,
    LocationPromptComponent,
    ViewOrderComponent,
    TabBarComponent,
    TabComponent,
    PageWrapperComponent,
  ],
})
export class SharedModule {}
