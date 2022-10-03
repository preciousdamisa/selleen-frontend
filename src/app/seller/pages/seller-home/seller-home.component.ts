import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-home',
  template: `<main>
    <app-seller-nav></app-seller-nav>
    <router-outlet></router-outlet>
  </main>`,
})
export class SellerHomeComponent {}
