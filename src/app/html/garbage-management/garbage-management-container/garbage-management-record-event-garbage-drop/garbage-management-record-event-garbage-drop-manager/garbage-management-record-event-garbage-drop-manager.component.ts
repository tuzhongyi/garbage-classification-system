import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GarbageDropEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { GarbageManagementRecordEventGarbageDropDurationManagerComponent } from '../garbage-management-record-event-garbage-drop-duration/garbage-management-record-event-garbage-drop-duration-manager/garbage-management-record-event-garbage-drop-duration-manager.component';
import { GarbageManagementRecordEventGarbageDropListManagerComponent } from '../garbage-management-record-event-garbage-drop-list/garbage-management-record-event-garbage-drop-list-manager/garbage-management-record-event-garbage-drop-list-manager.component';
import { GarbageManagementRecordEventGarbageDropStatisticDetailsManagerComponent } from '../garbage-management-record-event-garbage-drop-statistic-details/garbage-management-record-event-garbage-drop-statistic-details-manager/garbage-management-record-event-garbage-drop-statistic-details-manager.component';
import {
  GarbageManagementRecordEventGarbageDropArgs,
  GarbageManagementRecordEventGarbageDropIndex,
} from '../garbage-management-record-event-garbage-drop.model';

@Component({
  selector: 'howell-garbage-management-record-event-garbage-drop-manager',
  imports: [
    CommonModule,
    GarbageManagementRecordEventGarbageDropListManagerComponent,
    GarbageManagementRecordEventGarbageDropStatisticDetailsManagerComponent,
    GarbageManagementRecordEventGarbageDropDurationManagerComponent,
  ],
  templateUrl:
    './garbage-management-record-event-garbage-drop-manager.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-drop-manager.component.less',
})
export class GarbageManagementRecordEventGarbageDropManagerComponent {
  @Input() args: GarbageManagementRecordEventGarbageDropArgs = {};
  @Output() image = new EventEmitter<PagedArgs<GarbageDropEventRecord>>();
  @Output() video = new EventEmitter<GarbageDropEventRecord>();
  @Output() videoall = new EventEmitter<GarbageDropEventRecord>();
  @Output() complete = new EventEmitter<GarbageDropEventRecord>();
  index = GarbageManagementRecordEventGarbageDropIndex.list;
  Index = GarbageManagementRecordEventGarbageDropIndex;

  on = {
    index: (index: GarbageManagementRecordEventGarbageDropIndex) => {
      this.index = index;
    },
    image: (data: PagedArgs<GarbageDropEventRecord>) => {
      this.image.emit(data);
    },
    video: {
      single: (data: GarbageDropEventRecord) => {
        this.video.emit(data);
      },
      all: (data: GarbageDropEventRecord) => {
        this.videoall.emit(data);
      },
    },
    complete: (data: GarbageDropEventRecord) => {
      this.complete.emit(data);
    },
  };
}
