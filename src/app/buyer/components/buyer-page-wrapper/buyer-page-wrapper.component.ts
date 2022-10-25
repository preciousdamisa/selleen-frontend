import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-page-wrapper',
  template: `
    <div class="page-wrapper p-3 rounded-1">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./buyer-page-wrapper.component.scss'],
})
export class BuyerPageWrapperComponent {}
