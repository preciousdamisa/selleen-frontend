import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { BuyerService } from '../../services/buyer.service';

@Component({
  selector: 'app-buyer-product-search',
  templateUrl: './buyer-product-search.component.html',
  styleUrls: ['./buyer-product-search.component.scss'],
})
export class BuyerProductSearchComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  form = new FormGroup({
    searchText: new FormControl(''),
  });

  constructor(private buyerService: BuyerService) {}

  ngOnInit(): void {
    this.form
      .get('searchText')
      ?.valueChanges.pipe(takeUntil(this.subs$), debounceTime(300))
      .subscribe((value) => {
        this.buyerService.fetchingProducts.next(value);
      });
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
