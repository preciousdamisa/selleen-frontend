import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-tile',
  templateUrl: './list-tile.component.html',
  styleUrls: ['./list-tile.component.scss'],
})
export class ListTileComponent implements OnInit {
  @Input() classes: string = '';
  @Input() iconName?: string;
  @Input() imageUrl?: string;
  @Input() imageAltText?: string;

  constructor() {}

  ngOnInit(): void {}
}
