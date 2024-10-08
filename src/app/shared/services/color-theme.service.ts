import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ColorTheme } from '../types/color-theme';

@Injectable({
  providedIn: 'root',
})
export class ColorThemeService {
  private _defaultTheme: ColorTheme = {
    primaryColor: '#36abd9',
    secondaryColor: '#8dd5f2',
    secondaryLightColor: '#c2e0f2',
    textLight: '#958f8f',
    textDark: '#000',
    textWhite: '#fff',
    colorGrey: '#8d8d8d',
  };

  colorTheme = new BehaviorSubject<ColorTheme>(this._defaultTheme);

  getTheme() {
    return this.colorTheme;
  }
}
