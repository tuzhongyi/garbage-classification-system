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
import { SelectDivisionBusiness } from './select-division.business';

@Component({
  selector: 'howell-division-select',
  imports: [CommonModule, FormsModule],
  templateUrl: './select-division.component.html',
  styleUrl: './select-division.component.less',
  providers: [SelectDivisionBusiness],
})
export class SelectDivisionComponent {
  @Input() selected?: Division;
  @Output() selectedChange = new EventEmitter<Division>();
  @Input() selectedId?: string;
  @Output() selectedIdChange = new EventEmitter<string>();
  @Input() parentId?: string;

  constructor(private business: SelectDivisionBusiness) {}

  datas: Division[] = [];

  private load(parentId?: string) {
    this.business.load(parentId).then((x) => {
      this.datas = x;
    });
  }
  private change = {
    divisionId: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.parentId);
      }
    },
  };

  ngOnInit(): void {
    this.load(this.parentId);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.divisionId(changes['parentId']);
  }

  on = {
    change: () => {
      this.selectedChange.emit(this.selected);

      this.selectedId = this.selected?.Id;
      this.selectedIdChange.emit(this.selectedId);
    },
  };
}
