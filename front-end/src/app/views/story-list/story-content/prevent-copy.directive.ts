import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventCopy]'
})
export class PreventCopyDirective {
  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }

  @HostListener('dblclick', ['$event'])
  onDoubleClick(event) {
    event.preventDefault();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode === 67) {
      event.preventDefault();
    }
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode === 86) {
      event.preventDefault();
    }
    if ($event.keyCode === 123) {
      event.preventDefault();
    }
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode === 93) {
      event.preventDefault();
    }
  }

  constructor() { }
}
