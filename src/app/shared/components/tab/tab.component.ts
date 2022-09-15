import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { ColorThemeService } from 'src/app/shared/services/color-theme.service';
import { ColorTheme } from 'src/app/shared/types/color-theme';
import { TabBarService } from '../../services/tab-bar.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input() text = '';
  @Input() active = false;
  @Input() tabId = '';

  subs?: Subscription;
  colorTheme?: ColorTheme;

  constructor(
    private tabBarService: TabBarService,
    private colorThemeService: ColorThemeService
  ) {}

  ngOnInit(): void {
    this.subs = this.colorThemeService.getTheme().subscribe({
      next: (theme) => {
        this.colorTheme = theme;
      },
    });
  }

  onSwitchTab() {
    this.tabBarService.tabSwitched.next(this.tabId);
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
