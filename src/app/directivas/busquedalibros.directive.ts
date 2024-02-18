import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { fromEvent, map, debounceTime, distinctUntilChanged } from 'rxjs';

@Directive({
  selector: '[appBusquedalibros]'
})
export class BusquedalibrosDirective implements OnInit {
  @Output() appBusqueda = new EventEmitter<string>();

  constructor(private el: ElementRef) { }

  ngOnInit() {
    fromEvent(this.el.nativeElement, 'input').pipe(
      map((e: any) => e.target.value),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((text: string) => this.appBusqueda.emit(text));
  }
}
