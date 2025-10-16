import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Division } from '../../../../common/network/model/garbage-station/division.model';
import { wait } from '../../../../common/tools/tools';
import { SelectDivisionBusiness } from './select-division.business';

@Component({
  selector: 'howell-division-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-division.component.html',
  styleUrl: './select-division.component.less',
  providers: [SelectDivisionBusiness],
})
export class SelectDivisionComponent {
  @Input() default = false;
  @Input() selected?: Division;
  @Output() selectedChange = new EventEmitter<Division>();
  @Input() selectedId?: string;
  @Output() selectedIdChange = new EventEmitter<string>();
  @Input() parentId?: string;
  @Input() disabled = false;

  constructor(private business: SelectDivisionBusiness) {}

  datas: Division[] = [];

  loaded = false;

  private load(parentId?: string) {
    this.loaded = false;
    this.business
      .load(parentId)
      .then((x) => {
        this.datas = x;
        if (this.default && this.datas.length > 0) {
          this.selected = this.datas[0];
          this.on.change();
        }
      })
      .finally(() => {
        this.loaded = true;
      });
  }
  private change = {
    parentId: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.parentId);
      }
    },
    selectedId: (simple: SimpleChange) => {
      if (simple) {
        if (this.selectedId) {
          wait(
            () => {
              return this.loaded;
            },
            () => {
              this.selected = this.datas.find((x) => x.Id === this.selectedId);
              this.selectedChange.emit(this.selected);
            }
          );
        }
      }
    },
  };

  ngOnInit(): void {
    this.load(this.parentId);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.parentId(changes['parentId']);
    this.change.selectedId(changes['selectedId']);
  }

  on = {
    change: () => {
      this.selectedChange.emit(this.selected);

      this.selectedId = this.selected?.Id;
      this.selectedIdChange.emit(this.selectedId);
    },
  };
}
