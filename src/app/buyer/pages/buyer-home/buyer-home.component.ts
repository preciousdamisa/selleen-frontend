import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-shome',
  template: `<app-buyer-nav></app-buyer-nav>
    <router-outlet></router-outlet>
    <app-footer></app-footer>`,
})
export class BuyerHomeComponent {}
