import { TemplateRef } from '@angular/core';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}

export type ModalSize = 'lg' | 'md' | 'sm';
export interface ShowModalData {
  view: TemplateRef<any> | null;
  size?: ModalSize;
  centered?: boolean;
}
