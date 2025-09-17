import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WheelHorizontalScrollDirective } from '../../../../common/directives/wheel-horizontal-scroll/wheel-horizontal-scroll.directive';
import { IIdNameModel } from '../../../../common/network/model/model.interface';

@Component({
  selector: 'howell-select-multiple',
  imports: [CommonModule, FormsModule, WheelHorizontalScrollDirective],
  templateUrl: './select-multiple.component.html',
  styleUrl: './select-multiple.component.less',
})
export class SelectMultipleComponent implements OnInit, OnChanges, OnDestroy {
  @Input('datas') _datas: IIdNameModel[] = [];
  @Input() selecteds: IIdNameModel[] = [];
  @Output() selectedsChange = new EventEmitter<IIdNameModel[]>();

  constructor() {}

  datas: IIdNameModel[] = [];
  handle = {
    close: undefined as any,
    enter: undefined as any,
  };
  show = false;
  name = '';

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
        this.datas = [...this._datas];
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['_datas']);
  }
  ngOnInit(): void {
    this.handle.close = this.on.close;
    this.handle.enter = this.on.enter;
    window.addEventListener('click', this.handle.close);
    window.addEventListener('keydown', this.handle.enter);
  }
  ngOnDestroy(): void {
    if (this.handle.close) {
      window.removeEventListener('click', this.handle.close);
    }
    if (this.handle.enter) {
      window.removeEventListener('keydown', this.handle.enter);
    }
  }

  on = {
    close: () => {
      this.show = false;
    },
    open: (e: Event) => {
      this.show = !this.show;
      e.stopPropagation();
    },
    stop: (e: Event) => {
      e.stopPropagation();
    },
    select: (item: IIdNameModel) => {
      let index = this.selecteds.findIndex((x) => x.Id == item.Id);
      if (index < 0) {
        this.selecteds.push(item);
      } else {
        this.selecteds.splice(index, 1);
      }

      this.selectedsChange.emit(this.selecteds);
    },
    enter: (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.on.search();
      }
    },
    search: () => {
      if (this.name) {
        this.datas = this._datas.filter((x) => x.Name.includes(this.name));
      } else {
        this.datas = [...this._datas];
      }
    },
    clean: () => {
      this.name = '';
      this.on.search();
    },
  };
}
