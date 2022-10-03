import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from 'src/app/shared/services/user.service';
import { BuyerNavService } from '../../services/buyer-nav.service';
import { User } from 'src/app/shared/models/user.model';
import { CartService } from '../../services/cart.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-buyer-nav',
  templateUrl: './buyer-nav.component.html',
  styleUrls: ['./buyer-nav.component.scss'],
})
export class BuyerNavComponent implements OnInit {
  subs$ = new Subject<void>();

  open = true;
  showNav = true;
  previousScrollY = 0;

  user?: User | null;
  totalCartItems = 0;

  constructor(
    private router: Router,
    private buyerNavService: BuyerNavService,
    private userService: UserService,
    private cartService: CartService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.listenForNavStatusChange();
    this.getUser();
    this.listenForCartChange();
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
    this.buyerNavService.show.pipe(takeUntil(this.subs$)).subscribe({
      next: (show) => {
        this.open = show;
      },
    });
  }

  getUser() {
    this.userService.user$.pipe(takeUntil(this.subs$)).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  listenForCartChange() {
    this.cartService.cartUpdated$.pipe(takeUntil(this.subs$)).subscribe({
      next: (totalCartItems) => {
        this.totalCartItems = totalCartItems;
      },
    });
  }

  onViewCart(view: TemplateRef<any>) {
    this.modalService.open({ view, side: true });
  }

  onStartSelling() {
    this.router.navigateByUrl('/seller');
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
