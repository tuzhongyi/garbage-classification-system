import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEventRecord } from '../../../../common/network/model/garbage-station/event-record/garbage-event-record.model';
import { GarbageManagementListRecordEventItem } from '../../garbage-management-list/garbage-management-list-record-event/business/garbage-management-list-record-event.model';
import { GarbageManagementListRecordEventComponent } from '../../garbage-management-list/garbage-management-list-record-event/garbage-management-list-record-event.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-list-record-event',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementListRecordEventComponent,
  ],
  templateUrl: './garbage-management-card-list-record-event.component.html',
  styleUrl: './garbage-management-card-list-record-event.component.less',
})
export class GarbageManagementCardListRecordEventComponent {
  @Input() load?: EventEmitter<void>;
  @Output() details = new EventEmitter<IEventRecord>();
  title = '今日待处置事件';

  count = 0;
  loading = true;

  on = {
    loaded: (datas: GarbageManagementListRecordEventItem[]) => {
      this.loading = false;
      this.count = datas.length;
    },
    details: (data: IEventRecord) => {
      this.details.emit(data);
    },
  };
}
