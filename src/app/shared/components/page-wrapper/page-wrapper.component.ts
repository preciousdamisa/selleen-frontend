import { Component } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  template: `
    <section id="wrapper" class="p-2">
      <ng-content></ng-content>
    </section>
  `,
  styleUrls: ['./page-wrapper.component.scss'],
})
export class PageWrapperComponent {}
