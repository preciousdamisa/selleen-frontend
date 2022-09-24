import { Component, Input } from '@angular/core';

import { getInputErrors } from '../../utils/custom-validators';

@Component({
  selector: 'app-input-errors',
  template: `<span
    class="input-error-text"
    *ngFor="let errMsg of inputErrors(label, control!, custom)"
    >{{ errMsg }}</span
  >`,
})
export class InputErrorsComponent {
  @Input() control!: any;
  @Input() label!: string;
  @Input() custom?: { key: string; message: string };

  inputErrors = getInputErrors;
}
