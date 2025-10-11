import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IllegalDropEventRecord } from '../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { GarbageManagementRecordEventIllegalDumpListManagerComponent } from '../garbage-management-record-event-illegal-dump-list/garbage-management-record-event-illegal-dump-list-manager/garbage-management-record-event-illegal-dump-list-manager.component';
import { GarbageManagementRecordEventIllegalDumpStatisticDetailsManagerComponent } from '../garbage-management-record-event-illegal-dump-statistic-details/garbage-management-record-event-illegal-dump-statistic-details-manager/garbage-management-record-event-illegal-dump-statistic-details-manager.component';
import { GarbageManagementRecordEventIllegalDumpStatisticTotalManagerComponent } from '../garbage-management-record-event-illegal-dump-statistic-total/garbage-management-record-event-illegal-dump-statistic-total-manager/garbage-management-record-event-illegal-dump-statistic-total-manager.component';
import { GarbageManagementRecordEventIllegalDumpIndex } from '../garbage-management-record-event-illegal-dump.model';

@Component({
  selector: 'howell-garbage-management-record-event-illegal-dump-manager',
  imports: [
    CommonModule,
    GarbageManagementRecordEventIllegalDumpListManagerComponent,
    GarbageManagementRecordEventIllegalDumpStatisticTotalManagerComponent,
    GarbageManagementRecordEventIllegalDumpStatisticDetailsManagerComponent,
  ],
  templateUrl:
    './garbage-management-record-event-illegal-dump-manager.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-dump-manager.component.less',
})
export class GarbageManagementRecordEventIllegalDumpManagerComponent {
  @Output() image = new EventEmitter<PagedArgs<IllegalDropEventRecord>>();
  @Output() video = new EventEmitter<IllegalDropEventRecord>();
  index = GarbageManagementRecordEventIllegalDumpIndex.list;
  Index = GarbageManagementRecordEventIllegalDumpIndex;

  on = {
    index: (index: GarbageManagementRecordEventIllegalDumpIndex) => {
      this.index = index;
    },
    image: (data: PagedArgs<IllegalDropEventRecord>) => {
      this.image.emit(data);
    },
    video: (data: IllegalDropEventRecord) => {
      this.video.emit(data);
    },
  };
}
