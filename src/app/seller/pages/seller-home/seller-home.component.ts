import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-home',
  template: `<section>
    <app-seller-nav></app-seller-nav>
    <router-outlet></router-outlet>
  </section>`,
})
export class SellerHomeComponent {}
