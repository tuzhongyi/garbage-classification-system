import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[hw-select-content]',
})
export class SelectDirective {
  constructor(private e: ElementRef<HTMLElement>) {}

  get value() {
    if (this.nativeElement instanceof HTMLSelectElement) {
      return this.nativeElement.value;
    } else {
      return this.nativeElement.getAttribute('value') ?? '';
    }
  }
  set value(v: string) {
    if (this.nativeElement instanceof HTMLSelectElement) {
      this.nativeElement.value = v;
    } else {
      this.nativeElement.setAttribute('value', v);
    }
  }

  public get disabled(): boolean {
    if (this.nativeElement instanceof HTMLSelectElement) {
      return this.nativeElement.disabled;
    } else {
      return this.nativeElement.classList.contains('disabled');
    }
  }
  public set disabled(v: boolean) {
    if (this.nativeElement instanceof HTMLSelectElement) {
      this.nativeElement.disabled = v;
    } else {
      this.nativeElement.classList.toggle('disabled', v);
    }
  }

  get nativeElement() {
    return this.e.nativeElement;
  }
}
