import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { SharedModule } from '../shared/shared.module';

import { BuyerHomeComponent } from './pages/buyer-home/buyer-home.component';
import { BuyerNavComponent } from './components/buyer-nav/buyer-nav.component';

@NgModule({
  declarations: [BuyerHomeComponent, BuyerNavComponent],
  imports: [CommonModule, BuyerRoutingModule, SharedModule],
})
export class BuyerModule {}
