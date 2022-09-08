import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColorThemeService } from 'src/app/shared/services/color-theme.service';
import { ColorTheme } from 'src/app/shared/types/color-theme';

import { Tab } from '../../types/seller-shared';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
})
export class TabBarComponent implements OnInit, OnDestroy {
  @Input() tabs: Tab[] = [];
  @Input() currentTabId = '';

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
