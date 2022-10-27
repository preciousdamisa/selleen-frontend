import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { User } from 'src/app/shared/models/user.model';
import { CartService } from '../../services/cart.service';
import { ModalService } from 'src/app/services/modal.service';
import { DropdownItem } from 'src/app/shared/types/shared';

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

  isDesktop = false;

  user?: User | null;
  totalCartItems = 0;

  dropdownItems: DropdownItem[] = [
    { id: 'my-acc', name: 'My Selleen Account', iconName: 'bi-person-check' },
    { id: 'orders', name: 'Orders', iconName: 'bi-cart4' },
  ];

  constructor(
    private router: Router,
    private userService: UserAuthService,
    private cartService: CartService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.listenForCartChange();
    this.listenToWindowchange();
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

  listenToWindowchange() {
    this.checkWidth(window.innerWidth);

    fromEvent(window, 'resize')
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (evt: any) => {
          this.checkWidth(evt.target.innerWidth);
        },
      });
  }

  checkWidth(width: number) {
    this.isDesktop = width > 640;
  }

  onSelectDropdownItem(id: string) {
    switch (id) {
      case 'my-acc':
        this.router.navigateByUrl('/account');
        break;
      case 'orders':
        this.router.navigateByUrl('/orders');
        break;
    }
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

  onOpenView(view: TemplateRef<any>) {
    this.modalService.open({ view, side: true });
  }

  onStartSelling() {
    this.router.navigateByUrl('/seller/shop');
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
