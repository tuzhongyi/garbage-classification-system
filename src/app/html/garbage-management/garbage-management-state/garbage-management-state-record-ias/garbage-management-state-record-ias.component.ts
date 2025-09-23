import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { GarbageManagementStateItemComponent } from '../garbage-management-state-item/garbage-management-state-item.component';
import {
  GarbageManagementStateItem,
  GarbageManagementStateItemColor,
} from '../garbage-management-state-item/garbage-management-state-item.model';

@Component({
  selector: 'howell-garbage-management-state-record-ias',
  imports: [CommonModule, GarbageManagementStateItemComponent],
  templateUrl: './garbage-management-state-record-ias.component.html',
  styleUrl: './garbage-management-state-record-ias.component.less',
})
export class GarbageManagementStateRecordIasComponent implements OnChanges {
  @Input() count = 0;
  @Input() selected = true;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor() {
    this.data = this.init();
  }

  data: GarbageManagementStateItem;

  private init() {
    let data = new GarbageManagementStateItem();
    data.color = GarbageManagementStateItemColor.cyan;
    data.name = '暴露垃圾';
    data.show = true;
    data.value = 0;
    return data;
  }

  private change = {
    count: (simple: SimpleChange) => {
      if (simple) {
        this.data.value = this.count;
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.count(changes['count']);
  }

  on = {
    click: () => {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
    },
  };
}
