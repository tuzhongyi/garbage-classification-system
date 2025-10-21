import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GarbageFullEventRecord } from '../../../../../common/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { GarbageManagementRecordEventGarbageFullListManagerComponent } from '../garbage-management-record-event-garbage-full-list/garbage-management-record-event-garbage-full-list-manager/garbage-management-record-event-garbage-full-list-manager.component';
import { GarbageManagementRecordEventGarbageFullStationComponent } from '../garbage-management-record-event-garbage-full-station/garbage-management-record-event-garbage-full-station.component';
import { GarbageManagementRecordEventGarbageFullStatisticDetailsManagerComponent } from '../garbage-management-record-event-garbage-full-statistic-details/garbage-management-record-event-garbage-full-statistic-details-manager/garbage-management-record-event-garbage-full-statistic-details-manager.component';
import {
  GarbageManagementRecordEventGarbageFullArgs,
  GarbageManagementRecordEventGarbageFullIndex,
} from '../garbage-management-record-event-garbage-full.model';

@Component({
  selector: 'howell-garbage-management-record-event-garbage-full-manager',
  imports: [
    CommonModule,
    GarbageManagementRecordEventGarbageFullListManagerComponent,
    GarbageManagementRecordEventGarbageFullStatisticDetailsManagerComponent,
    GarbageManagementRecordEventGarbageFullStationComponent,
  ],
  templateUrl:
    './garbage-management-record-event-garbage-full-manager.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-full-manager.component.less',
})
export class GarbageManagementRecordEventGarbageFullManagerComponent {
  @Input() args: GarbageManagementRecordEventGarbageFullArgs = {};
  @Output() image = new EventEmitter<PagedArgs<GarbageFullEventRecord>>();
  @Output() video = new EventEmitter<GarbageFullEventRecord>();
  @Output() videoall = new EventEmitter<GarbageFullEventRecord>();
  @Output() complete = new EventEmitter<GarbageFullEventRecord>();
  @Output() stationimage: EventEmitter<PagedArgs<GarbageStation>> =
    new EventEmitter();
  @Output() stationposition: EventEmitter<GarbageStation> = new EventEmitter();
  @Output() stationvideo: EventEmitter<GarbageStation> = new EventEmitter();

  index = GarbageManagementRecordEventGarbageFullIndex.list;
  Index = GarbageManagementRecordEventGarbageFullIndex;

  on = {
    index: (index: GarbageManagementRecordEventGarbageFullIndex) => {
      this.index = index;
    },
    image: (data: PagedArgs<GarbageFullEventRecord>) => {
      this.image.emit(data);
    },
    video: {
      single: (data: GarbageFullEventRecord) => {
        this.video.emit(data);
      },
      all: (data: GarbageFullEventRecord) => {
        this.videoall.emit(data);
      },
    },
    complete: (data: GarbageFullEventRecord) => {
      this.complete.emit(data);
    },
    station: {
      image: (data: PagedArgs<GarbageStation>) => {
        this.stationimage.emit(data);
      },
      position: (data: GarbageStation) => {
        this.stationposition.emit(data);
      },
      video: (data: GarbageStation) => {
        this.stationvideo.emit(data);
      },
    },
  };
}
