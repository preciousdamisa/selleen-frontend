import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  show = new Subject<boolean>();

  open() {
    this.show.next(true);
  }

  close() {
    this.show.next(false);
  }
}
