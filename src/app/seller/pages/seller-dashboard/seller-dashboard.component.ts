import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { UserAuthService } from 'src/app/shared/services/user-auth.service';
import { Todo } from 'src/app/shared/types/shared';
import { SellerDashboardService } from '../../services/seller-dashboard.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss'],
})
export class SellerDashboardComponent implements OnInit, OnDestroy {
  subs$ = new Subject<void>();

  user?: User | null;
  buyerCount?: string;
  sellerCount?: string;
  todos: Todo[] = [];
  fetchingTodos = false;

  constructor(
    private userService: UserAuthService,
    private dashService: SellerDashboardService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.fetchTodos();
  }

  getUser() {
    this.userService.user$.pipe(takeUntil(this.subs$)).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  fetchTodos() {
    this.fetchingTodos = true;
    this.dashService
      .getTodos(this.user?.shops[0].id!)
      .pipe(takeUntil(this.subs$))
      .subscribe({
        next: (res) => {
          this.todos = res.data.todos;
          this.fetchingTodos = false;
        },
        error: () => {
          this.fetchingTodos = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.subs$.next();
    this.subs$.complete();
  }
}
