import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { SelectDirective } from './select.directive';

@Component({
  selector: 'hw-select',
  imports: [CommonModule],
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.less'],
})
export class HowellSelectComponent implements AfterViewChecked {
  @Input() nullable: boolean = false;
  @Input() nulltext = '请选择';
  @Input() input_element?: SelectDirective;

  @Input() public set style(v: any) {
    if (this._style === undefined) {
      this._style = {};
    }
    this._style = Object.assign(this._style, v);
  }
  private _style: any;
  public get style(): any {
    return this._style;
  }

  private _selected?: any = undefined;
  public get selected(): any | undefined {
    return this._selected;
  }
  @Input() public set selected(v: any | undefined | null) {
    if (v === null || v === '') {
      this._selected = undefined;
    } else {
      this._selected = v;
    }
  }
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();

  constructor(public detector: ChangeDetectorRef) {}

  @ContentChild(SelectDirective)
  element_directive?: SelectDirective;
  @ContentChild('select')
  element_select?: ElementRef<HTMLSelectElement>;
  @ViewChild('current')
  current?: ElementRef<HTMLDivElement>;

  get element() {
    if (this.input_element) {
      return this.input_element;
    } else if (this.element_directive) {
      return this.element_directive;
    } else if (this.element_select) {
      return this.element_select.nativeElement;
    } else if (this.current) {
      return this.current.nativeElement.querySelector('select');
    } else {
      return undefined;
    }
  }

  get disabled() {
    if (this.element) {
      return this.element.disabled;
    }
    return false;
  }

  ngAfterViewChecked(): void {
    if (this.nullable) {
      if (this.selected === undefined) {
        if (this.element) {
          this.element.value = '';
        }
      }
    }
  }
  onclear(e: Event) {
    this.selected = undefined;
    this.selectedChange.emit(this.selected);
    e.stopImmediatePropagation();
  }
}
