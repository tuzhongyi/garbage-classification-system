import { Component, Input } from '@angular/core';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { GarbageManagementStatisticRecordItem } from './garbage-management-statistic-record-item.model';

@Component({
  selector: 'howell-garbage-management-statistic-record-item',
  imports: [],
  templateUrl: './garbage-management-statistic-record-item.component.html',
  styleUrl: './garbage-management-statistic-record-item.component.less',
})
export class GarbageManagementStatisticRecordItemComponent {
  @Input() data = new GarbageManagementStatisticRecordItem();
  constructor() {
    this.init();
  }

  classname = new Map<EventType, string>();

  init() {
    this.classname.set(EventType.IllegalDrop, 'illegal-drop');
    this.classname.set(EventType.GarbageFull, 'garbage-full');
    this.classname.set(EventType.MixedInto, 'mixed-into');
    this.classname.set(EventType.GarbageDrop, 'garbage-stayed');
  }
}
