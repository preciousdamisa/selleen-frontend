import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() borderRadius = '4px';
  @Input() paddingX = '0.5rem';
  @Input() paddingY = '0.5rem';
  @Input() width = '100%';

  constructor() {}

  ngOnInit(): void {}
}
