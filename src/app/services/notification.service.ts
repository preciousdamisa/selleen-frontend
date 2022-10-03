import { Injectable } from '@angular/core';
import { Observable, scan, Subject } from 'rxjs';

import { Command } from '../types';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private messagesIn: Subject<Command>;
  messagesOut: Observable<Command[]>;

  constructor() {
    this.messagesIn = new Subject<Command>();
    this.messagesOut = this.messagesIn.pipe(
      scan((msgs: Command[], cmd: Command) => {
        if (cmd.type === 'clear') {
          return msgs.filter((m) => m.id !== cmd.id);
        }
        return [...msgs, cmd];
      }, [])
    );
  }

  add(
    text: string,
    type: 'success' | 'error' | 'clear',
    opts = { duration: 5000 }
  ) {
    const id = this.randomId();

    this.messagesIn.next({
      id,
      text,
      type,
    });

    setTimeout(() => {
      this.clear(id);
    }, opts.duration);
  }

  clear(id: number) {
    this.messagesIn.next({
      id,
      type: 'clear',
    });
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}
