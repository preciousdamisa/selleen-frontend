import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() borderRadius = '4px';
  @Input() width = '100%';
  @Input() classes = '';
}
