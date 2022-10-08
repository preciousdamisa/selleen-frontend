import { Component, Input, OnInit } from '@angular/core';

import { ShopByAlias } from '../../types/buyer.types';

@Component({
  selector: 'app-shop-profile-card',
  templateUrl: './shop-profile-card.component.html',
  styleUrls: ['./shop-profile-card.component.scss'],
})
export class ShopProfileCardComponent implements OnInit {
  @Input() shop!: ShopByAlias;

  constructor() {}

  ngOnInit(): void {}
}
