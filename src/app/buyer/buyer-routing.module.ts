import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuyerHomeComponent } from './pages/buyer-home/buyer-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BuyerHomeComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerRoutingModule {}
