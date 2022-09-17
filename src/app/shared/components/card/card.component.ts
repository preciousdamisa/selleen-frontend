import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() borderRadius = '4px';
  @Input() width = '100%';
  @Input() classes = '';

  constructor() {}

  ngOnInit(): void {}
}
