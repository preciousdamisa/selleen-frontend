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
import { DropdownItem } from '../../types/shared';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  @Input() items: DropdownItem[] = [];
  @Input() menuBackgroundColor = '';
  @Input() itemColor = '';
  @Input() itemClasses = '';

  @Output() selected = new EventEmitter<string>();

  subs?: Subscription;
  opened = false;

  constructor(private themeService: ColorThemeService) {}

  ngOnInit(): void {
    this.subs = this.themeService.getTheme().subscribe({
      next: (theme) => {
        this.menuBackgroundColor = !this.menuBackgroundColor
          ? theme.primaryColor
          : this.menuBackgroundColor;

        this.itemColor = !this.itemColor ? theme.textWhite : this.itemColor;
      },
    });
  }

  onToggle() {
    this.opened = !this.opened;
  }

  onSelect(id: string) {
    this.selected.emit(id);
    this.onClose();
  }

  onClose() {
    this.opened = false;
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
