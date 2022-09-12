import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() size = '0.75rem';
  @Input() labelSize = '0.75rem';

  @Input() control: any;
  @Input() label = '';
  @Input() id = '';
  @Input() disabled = false;
}
