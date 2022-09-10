import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ColorThemeService } from '../../services/color-theme.service';
import { ColorTheme } from '../../types/color-theme';
import { SelectOption } from '../../types/shared';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {
  // Select
  @Input() selectOptions: SelectOption[] = [];

  // Text area
  @Input() cols = '30';
  @Input() rows = '10';

  // Checkbox
  @Input() checkboxSize = '0.75rem';
  @Input() checkboxLabelSize = '0.75rem';

  // General
  @Input() control: any;
  @Input() classes = '';
  @Input() label = '';
  @Input() id = '';
  @Input() type:
    | 'text'
    | 'number'
    | 'date'
    | 'password'
    | 'textarea'
    | 'checkbox'
    | 'select' = 'text';
  @Input() placeholder = '';
  @Input() required = true;
  @Input() disabled = false;
  @Input() bottomMargin = true;

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

  get hasErrors() {
    const { touched, errors } = this.control;
    return touched && errors;
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
