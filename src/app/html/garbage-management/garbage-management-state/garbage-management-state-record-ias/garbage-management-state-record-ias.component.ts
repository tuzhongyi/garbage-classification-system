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
  @Input() exposed = 0;
  @Input() timeout = 0;
  @Input() selected: [boolean, boolean] = [true, true];
  @Output() selectedChange = new EventEmitter<[boolean, boolean]>();

  constructor() {
    this.datas = this.init();
  }

  datas: GarbageManagementStateItem[] = [];

  private init() {
    let exposed = new GarbageManagementStateItem();
    exposed.color = GarbageManagementStateItemColor.cyan;
    exposed.name = '暴露垃圾';
    exposed.show = true;
    exposed.value = 0;

    let timeout = new GarbageManagementStateItem();
    timeout.color = GarbageManagementStateItemColor.green;
    timeout.name = '高频事件';
    timeout.show = true;
    timeout.value = 0;

    return [exposed, timeout];
  }

  private change = {
    exposed: (simple: SimpleChange) => {
      if (simple) {
        this.datas[0].value = this.exposed;
        this.datas[1].value = this.timeout;
      }
    },
    timeout: (simple: SimpleChange) => {
      if (simple) {
        this.datas[0].value = this.exposed;
        this.datas[1].value = this.timeout;
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.exposed(changes['exposed']);
    this.change.timeout(changes['timeout']);
  }

  on = {
    click: (index: number) => {
      this.selected[index] = !this.selected[index];
      this.selectedChange.emit(this.selected);
    },
  };
}
