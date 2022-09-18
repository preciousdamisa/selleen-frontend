import { Component, Input, OnInit } from '@angular/core';

import { Product } from 'src/app/seller/types/product';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.scss'],
})
export class ProductDataComponent implements OnInit {
  @Input() product!: Product;
  constructor() {}

  ngOnInit(): void {}
}
