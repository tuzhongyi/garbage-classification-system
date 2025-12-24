import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IasEventRecord } from '../../../../common/network/model/ias/ias-event-record.model';
import { GarbageManagementListRecordEventIasComponent } from '../../garbage-management-list/garbage-management-list-record-event-ias/garbage-management-list-record-event-ias.component';
import { GarbageManagementListRecordEventIasArgs } from '../../garbage-management-list/garbage-management-list-record-event-ias/garbage-management-list-record-event-ias.model';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-list-record-event-ias',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementListRecordEventIasComponent,
  ],
  templateUrl: './garbage-management-card-list-record-event-ias.component.html',
  styleUrl: './garbage-management-card-list-record-event-ias.component.less',
})
export class GarbageManagementCardListRecordEventIasComponent {
  @Input() load?: EventEmitter<GarbageManagementListRecordEventIasArgs>;
  @Output() task = new EventEmitter<IasEventRecord>();
  @Output() itemclick = new EventEmitter<IasEventRecord>();
  title = '暴露垃圾事件记录';

  count = 0;
  loading = true;

  on = {
    loaded: (datas: IasEventRecord[]) => {
      this.loading = false;
      this.count = datas.length;
    },
    task: (data: IasEventRecord) => {
      this.task.emit(data);
    },
    click: (data: IasEventRecord) => {
      this.itemclick.emit(data);
    },
  };
}
