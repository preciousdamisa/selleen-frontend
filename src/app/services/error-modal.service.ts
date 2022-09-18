import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorModalService {
  show = new Subject<{ message?: string; display: boolean }>();

  open(message: string) {
    this.show.next({ message, display: true });
  }

  close() {
    this.show.next({ display: false });
  }
}
