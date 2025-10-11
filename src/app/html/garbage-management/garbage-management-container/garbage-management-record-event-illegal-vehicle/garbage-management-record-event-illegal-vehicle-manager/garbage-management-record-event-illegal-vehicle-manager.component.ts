import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IllegalVehicleEventRecord } from '../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { GarbageManagementRecordEventGarbageDropStatisticDetailsManagerComponent } from '../../garbage-management-record-event-garbage-drop/garbage-management-record-event-garbage-drop-statistic-details/garbage-management-record-event-garbage-drop-statistic-details-manager/garbage-management-record-event-garbage-drop-statistic-details-manager.component';
import { GarbageManagementRecordEventIllegalVehicleListManagerComponent } from '../garbage-management-record-event-illegal-vehicle-list/garbage-management-record-event-illegal-vehicle-list-manager/garbage-management-record-event-illegal-vehicle-list-manager.component';
import { GarbageManagementRecordEventIllegalVehicleIndex } from '../garbage-management-record-event-illegal-vehicle.model';
import { GarbageManagementRecordEventIllegalVehicleStatisticDetailsManagerComponent } from '../garbage-management-record-event-illegal-vehicle-statistic-details/garbage-management-record-event-illegal-vehicle-statistic-details-manager/garbage-management-record-event-illegal-vehicle-statistic-details-manager.component';

@Component({
  selector: 'howell-garbage-management-record-event-illegal-vehicle-manager',
  imports: [
    CommonModule,
    GarbageManagementRecordEventIllegalVehicleListManagerComponent,
    GarbageManagementRecordEventIllegalVehicleStatisticDetailsManagerComponent,
  ],
  templateUrl:
    './garbage-management-record-event-illegal-vehicle-manager.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-vehicle-manager.component.less',
})
export class GarbageManagementRecordEventIllegalVehicleManagerComponent {
  @Output() image = new EventEmitter<PagedArgs<IllegalVehicleEventRecord>>();
  @Output() video = new EventEmitter<IllegalVehicleEventRecord>();
  @Output() videoall = new EventEmitter<IllegalVehicleEventRecord>();
  @Output() complete = new EventEmitter<IllegalVehicleEventRecord>();
  index = GarbageManagementRecordEventIllegalVehicleIndex.list;
  Index = GarbageManagementRecordEventIllegalVehicleIndex;

  on = {
    index: (index: GarbageManagementRecordEventIllegalVehicleIndex) => {
      this.index = index;
    },
    image: (data: PagedArgs<IllegalVehicleEventRecord>) => {
      this.image.emit(data);
    },
    video: {
      single: (data: IllegalVehicleEventRecord) => {
        this.video.emit(data);
      },
      all: (data: IllegalVehicleEventRecord) => {
        this.videoall.emit(data);
      },
    },
    complete: (data: IllegalVehicleEventRecord) => {
      this.complete.emit(data);
    },
  };
}
