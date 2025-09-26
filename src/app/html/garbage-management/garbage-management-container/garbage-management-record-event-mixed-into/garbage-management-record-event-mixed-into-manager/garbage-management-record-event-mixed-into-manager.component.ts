import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MixedIntoEventRecord } from '../../../../../common/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { GarbageManagementRecordEventMixedIntoListManagerComponent } from '../garbage-management-record-event-mixed-into-list/garbage-management-record-event-mixed-into-list-manager/garbage-management-record-event-mixed-into-list-manager.component';
import { GarbageManagementRecordEventMixedIntoStatisticDetailsManagerComponent } from '../garbage-management-record-event-mixed-into-statistic-details/garbage-management-record-event-mixed-into-statistic-details-manager/garbage-management-record-event-mixed-into-statistic-details-manager.component';
import { GarbageManagementRecordEventMixedIntoIndex } from '../garbage-management-record-event-mixed-into.model';

@Component({
  selector: 'howell-garbage-management-record-event-mixed-into-manager',
  imports: [
    CommonModule,
    GarbageManagementRecordEventMixedIntoListManagerComponent,
    GarbageManagementRecordEventMixedIntoStatisticDetailsManagerComponent,
  ],
  templateUrl:
    './garbage-management-record-event-mixed-into-manager.component.html',
  styleUrl:
    './garbage-management-record-event-mixed-into-manager.component.less',
})
export class GarbageManagementRecordEventMixedIntoManagerComponent {
  @Output() image = new EventEmitter<PagedArgs<MixedIntoEventRecord>>();
  @Output() video = new EventEmitter<MixedIntoEventRecord>();
  @Output() videoall = new EventEmitter<MixedIntoEventRecord>();
  @Output() complete = new EventEmitter<MixedIntoEventRecord>();

  index = GarbageManagementRecordEventMixedIntoIndex.list;
  Index = GarbageManagementRecordEventMixedIntoIndex;

  on = {
    index: (index: GarbageManagementRecordEventMixedIntoIndex) => {
      this.index = index;
    },
    image: (data: PagedArgs<MixedIntoEventRecord>) => {
      this.image.emit(data);
    },
    video: {
      single: (data: MixedIntoEventRecord) => {
        this.video.emit(data);
      },
      all: (data: MixedIntoEventRecord) => {
        this.videoall.emit(data);
      },
    },
    complete: (data: MixedIntoEventRecord) => {
      this.complete.emit(data);
    },
  };
}
