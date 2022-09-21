import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-home',
  template: `<section>
    <app-buyer-nav></app-buyer-nav>
    <router-outlet></router-outlet>
  </section> `,
})
export class BuyerHomeComponent {}
