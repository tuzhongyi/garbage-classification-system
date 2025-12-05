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

import { GridCell } from '../../../../common/network/model/garbage-station/grid-cell.model';
import { wait } from '../../../../common/tools/wait.tools';
import { SelectGridCellBusiness } from './select-grid-cell.business';

@Component({
  selector: 'howell-grid-cell-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-grid-cell.component.html',
  styleUrl: './select-grid-cell.component.less',
  providers: [SelectGridCellBusiness],
})
export class SelectGridCellComponent {
  @Input() default = false;
  @Input() selected?: GridCell;
  @Output() selectedChange = new EventEmitter<GridCell>();
  @Input() selectedId?: string;
  @Output() selectedIdChange = new EventEmitter<string>();
  @Input() parentId?: string;
  @Input() disabled = false;

  constructor(private business: SelectGridCellBusiness) {}

  datas: GridCell[] = [];

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
          wait(() => {
            return this.loaded;
          })
            .then(() => {
              this.selected = this.datas.find((x) => x.Id === this.selectedId);
              this.selectedChange.emit(this.selected);
            })
            .catch(() => {
              console.warn(
                'SelectGridCellComponent change.selectedId wait timeout'
              );
            });
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
