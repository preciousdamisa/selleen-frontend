import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabBarService {
  tabSwitched = new Subject<string>();
}
