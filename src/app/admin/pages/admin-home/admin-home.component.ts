import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  template: `<section>
    <app-admin-nav></app-admin-nav>
    <router-outlet></router-outlet>
  </section> `,
})
export class AdminHomeComponent {}
