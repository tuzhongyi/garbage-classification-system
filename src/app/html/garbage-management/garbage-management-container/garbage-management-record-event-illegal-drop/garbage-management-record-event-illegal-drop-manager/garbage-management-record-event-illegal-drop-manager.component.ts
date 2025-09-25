import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IllegalDropEventRecord } from '../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { GarbageManagementRecordEventIllegalDropListManagerComponent } from '../garbage-management-record-event-illegal-drop-list/garbage-management-record-event-illegal-drop-list-manager/garbage-management-record-event-illegal-drop-list-manager.component';
import { GarbageManagementRecordEventIllegalDropStatisticDetailsManagerComponent } from '../garbage-management-record-event-illegal-drop-statistic-details/garbage-management-record-event-illegal-drop-statistic-details-manager/garbage-management-record-event-illegal-drop-statistic-details-manager.component';
import { GarbageManagementRecordEventIllegalDropStatisticTotalManagerComponent } from '../garbage-management-record-event-illegal-drop-statistic-total/garbage-management-record-event-illegal-drop-statistic-total-manager/garbage-management-record-event-illegal-drop-statistic-total-manager.component';
import { GarbageManagementRecordEventIllegalDropIndex } from '../garbage-management-record-event-illegal-drop.model';

@Component({
  selector: 'howell-garbage-management-record-event-illegal-drop-manager',
  imports: [
    CommonModule,
    GarbageManagementRecordEventIllegalDropListManagerComponent,
    GarbageManagementRecordEventIllegalDropStatisticTotalManagerComponent,
    GarbageManagementRecordEventIllegalDropStatisticDetailsManagerComponent,
  ],
  templateUrl:
    './garbage-management-record-event-illegal-drop-manager.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-drop-manager.component.less',
})
export class GarbageManagementRecordEventIllegalDropManagerComponent {
  @Output() image = new EventEmitter<PagedArgs<IllegalDropEventRecord>>();
  @Output() video = new EventEmitter<IllegalDropEventRecord>();
  index = GarbageManagementRecordEventIllegalDropIndex.list;
  Index = GarbageManagementRecordEventIllegalDropIndex;

  on = {
    index: (index: GarbageManagementRecordEventIllegalDropIndex) => {
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
