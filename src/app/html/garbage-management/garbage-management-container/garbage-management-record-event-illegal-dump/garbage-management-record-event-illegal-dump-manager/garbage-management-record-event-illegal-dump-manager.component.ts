import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IllegalDropEventRecord } from '../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { GarbageManagementRecordEventIllegalDumpListManagerComponent } from '../garbage-management-record-event-illegal-dump-list/garbage-management-record-event-illegal-dump-list-manager/garbage-management-record-event-illegal-dump-list-manager.component';
import { GarbageManagementRecordEventIllegalDumpStatisticDetailsManagerComponent } from '../garbage-management-record-event-illegal-dump-statistic-details/garbage-management-record-event-illegal-dump-statistic-details-manager/garbage-management-record-event-illegal-dump-statistic-details-manager.component';
import {
  GarbageManagementRecordEventIllegalDumpArgs,
  GarbageManagementRecordEventIllegalDumpIndex,
} from '../garbage-management-record-event-illegal-dump.model';

@Component({
  selector: 'howell-garbage-management-record-event-illegal-dump-manager',
  imports: [
    CommonModule,
    GarbageManagementRecordEventIllegalDumpListManagerComponent,
    GarbageManagementRecordEventIllegalDumpStatisticDetailsManagerComponent,
  ],
  templateUrl:
    './garbage-management-record-event-illegal-dump-manager.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-dump-manager.component.less',
})
export class GarbageManagementRecordEventIllegalDumpManagerComponent {
  @Input() args: GarbageManagementRecordEventIllegalDumpArgs = {};
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
