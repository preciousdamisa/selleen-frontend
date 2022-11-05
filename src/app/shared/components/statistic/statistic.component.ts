import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ColorThemeService } from 'src/app/shared/services/color-theme.service';
import { ColorTheme } from 'src/app/shared/types/color-theme';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent implements OnInit {
  @Input() name?: string;
  @Input() text?: string | null;
  @Input() iconName?: string;
  @Input() showCurrencySymbol = true;

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
