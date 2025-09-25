import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
import { GarbageManagementRecordEventIasListManagerComponent } from '../garbage-management-record-event-ias-list/garbage-management-record-event-ias-list-manager/garbage-management-record-event-ias-list-manager.component';
import { GarbageManagementRecordEventIasStatisticDetailsManagerComponent } from '../garbage-management-record-event-ias-statistic-details/garbage-management-record-event-ias-statistic-details-manager/garbage-management-record-event-ias-statistic-details-manager.component';
import { GarbageManagementRecordEventIasStatisticRouteManagerComponent } from '../garbage-management-record-event-ias-statistic-route/garbage-management-record-event-ias-statistic-route-manager/garbage-management-record-event-ias-statistic-route-manager.component';
import { GarbageManagementRecordEventIasManagerIndex } from '../garbage-management-record-event-ias.model';

@Component({
  selector: 'howell-garbage-management-record-event-ias-manager',
  imports: [
    CommonModule,
    GarbageManagementRecordEventIasListManagerComponent,
    GarbageManagementRecordEventIasStatisticDetailsManagerComponent,
    GarbageManagementRecordEventIasStatisticRouteManagerComponent,
  ],
  templateUrl: './garbage-management-record-event-ias-manager.component.html',
  styleUrl: './garbage-management-record-event-ias-manager.component.less',
})
export class GarbageManagementRecordEventIasManagerComponent {
  @Output() task = new EventEmitter<IasEventRecord>();
  @Output() position = new EventEmitter<IasEventRecord>();
  index = GarbageManagementRecordEventIasManagerIndex.list;
  Index = GarbageManagementRecordEventIasManagerIndex;

  on = {
    index: (index: GarbageManagementRecordEventIasManagerIndex) => {
      this.index = index;
    },
    task: (data: IasEventRecord) => {
      this.task.emit(data);
    },
    position: (data: IasEventRecord) => {
      this.position.emit(data);
    },
  };
}
