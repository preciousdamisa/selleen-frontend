import { Component, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/shared/services/user.service';
import { SellerNavService } from '../../services/seller-nav.service';

@Component({
  selector: 'app-seller-nav',
  templateUrl: './seller-nav.component.html',
  styleUrls: ['./seller-nav.component.scss'],
})
export class SellerNavComponent implements OnInit {
  subs$ = new Subject<void>();
  open = true;
  showNav = true;
  previousScrollY = 0;

  constructor(
    private sellerNavService: SellerNavService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.listenForNavStatusChange();
  }

  @HostListener('window:scroll') getScrollHeight() {
    if (window.scrollY > this.previousScrollY) {
      this.showNav = false;
      this.previousScrollY = window.scrollY;
    } else {
      this.showNav = true;
      this.previousScrollY = window.scrollY;
    }
  }

  listenForNavStatusChange() {
    this.sellerNavService.show.pipe(takeUntil(this.subs$)).subscribe({
      next: (show) => {
        this.open = show;
      },
    });
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
