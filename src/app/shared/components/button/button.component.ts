import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { ColorThemeService } from '../../services/color-theme.service';
import { ColorTheme } from '../../types/color-theme';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() classes = '';
  @Input() paddingX = '0.5rem';
  @Input() paddingY = '0.5rem';
  @Input() borderRadius = '3px';
  @Input() backgroundColor?: string;
  @Input() fullWidth = false;
  @Input() disabled = false;

  @Output() clicked = new EventEmitter();

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
