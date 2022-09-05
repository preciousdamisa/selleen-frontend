import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ColorThemeService } from '../../services/color-theme.service';
import { ColorTheme } from '../../types/color-theme';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  @Input() message?: string;
  @Input() link?: string;

  subs?: Subscription;
  colorTheme?: ColorTheme;

  constructor(private colorThemeService: ColorThemeService) {}

  ngOnInit(): void {
    this.subs = this.colorThemeService.getTheme().subscribe({
      next: (theme) => {
        this.colorTheme = theme;
      },
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
