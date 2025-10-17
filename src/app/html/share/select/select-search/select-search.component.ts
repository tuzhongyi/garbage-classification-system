import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectDirective } from '../../../../common/components/select/hw-select/select.directive';
import { IIdNameModel } from '../../../../common/network/model/model.interface';

@Component({
  selector: 'howell-select-search',
  imports: [CommonModule, FormsModule, SelectDirective],
  templateUrl: './select-search.component.html',
  styleUrl: './select-search.component.less',
})
export class SelectSearchComponent {
  @Input() clearable = false;
  @Input('datas') _datas: IIdNameModel[] = [];
  @Input() selected?: IIdNameModel;
  @Output() selectedChange = new EventEmitter<IIdNameModel>();
  @Output() element = new EventEmitter<SelectDirective>();

  constructor() {}

  @ViewChild(SelectDirective)
  set _element(v: SelectDirective) {
    if (v) {
      this.element.emit(v);
    }
  }

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
      this.show = false;
      this.on.clean();
      if (this.selected == item) return;
      this.selected = item;
      this.selectedChange.emit(this.selected);
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
