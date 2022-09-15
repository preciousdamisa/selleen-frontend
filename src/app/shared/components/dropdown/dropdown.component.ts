import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DropdownItem } from '../../types/shared';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  @Input() items: DropdownItem[] = [];
  @Output() selected = new EventEmitter<string>();

  open = false;

  onToggle() {
    this.open = !this.open;
  }

  onSelect(id: string) {
    this.selected.emit(id);
    this.onClose();
  }

  onOpen() {
    this.open = true;
  }

  onClose() {
    this.open = false;
  }
}
