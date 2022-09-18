import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Directive({
  selector: '[outsideClick]',
})
export class OutsideClickDirective implements AfterViewInit, OnDestroy {
  @Output() outsideClick = new EventEmitter();

  subs?: Subscription;

  constructor(
    private elRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.subs = fromEvent(this.document, 'click')
      .pipe(
        filter((ev) => {
          return !this.isInside(ev.target as HTMLElement);
        })
      )
      .subscribe({
        next: () => {
          this.outsideClick.emit();
        },
      });
  }

  isInside(el: HTMLElement): boolean {
    return (
      el === this.elRef.nativeElement || this.elRef.nativeElement.contains(el)
    );
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
