import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  template: `<main>
    <app-admin-nav></app-admin-nav>
    <router-outlet></router-outlet>
  </main> `,
})
export class AdminHomeComponent {}
