import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from '../shared/pages/user-login/user-login.component';
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
      {
        path: 'login',
        component: UserLoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerRoutingModule {}
