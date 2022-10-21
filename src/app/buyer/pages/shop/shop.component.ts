import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

import { BuyerService } from '../../services/buyer.service';
import { ShopByAlias } from '../../types/buyer.types';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit, OnDestroy {
  subs?: Subscription;

  shop!: ShopByAlias;
  alias!: string;
  loading = false;

  banner!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private buyerService: BuyerService
  ) {}

  ngOnInit(): void {
    const url: UrlSegment[] = this.route.snapshot.url;

    if (this.determineRoute(url)) {
      this.router.navigateByUrl('/admin/dashboard');
      return;
    }

    this.alias = this.route.snapshot.params['alias'];
    this.getShop();
  }

  determineRoute(url: UrlSegment[]): boolean {
    let isAdminRoute = false;
    url.forEach((urlSeg) => {
      if (urlSeg.path === 'admin') {
        isAdminRoute = true;
      }
    });

    return isAdminRoute;
  }

  getShop() {
    this.loading = true;
    this.subs = this.buyerService.getShop(this.alias).subscribe({
      next: (res) => {
        this.shop = res.data;
        this.banner = environment.sellenAwsBucketUrl + this.shop.banners[0].url;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
