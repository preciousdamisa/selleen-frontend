import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ShowModalData } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  show = new Subject<ShowModalData>();

  open(data: ShowModalData) {
    this.show.next(data);
  }

  close() {
    this.show.next({ view: null });
  }
}
