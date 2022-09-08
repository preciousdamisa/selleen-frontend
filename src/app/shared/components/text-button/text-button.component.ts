import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ColorThemeService } from '../../services/color-theme.service';
import { ColorTheme } from '../../types/color-theme';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss'],
})
export class TextButtonComponent implements OnInit, OnDestroy {
  @Input() color?: string;
  @Input() size = '0.75rem';
  @Input() classes = '';

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
