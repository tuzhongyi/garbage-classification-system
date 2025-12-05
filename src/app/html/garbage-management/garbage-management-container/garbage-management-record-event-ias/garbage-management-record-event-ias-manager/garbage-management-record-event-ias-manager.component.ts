import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Duration } from '../../../../../common/network/model/garbage-station/duration.model';
import { IasEventRecord } from '../../../../../common/network/model/ias/ias-event-record.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { GarbageManagementRecordEventIasListManagerComponent } from '../garbage-management-record-event-ias-list/garbage-management-record-event-ias-list-manager/garbage-management-record-event-ias-list-manager.component';
import { GarbageManagementRecordEventIasStatisticDetailsManagerComponent } from '../garbage-management-record-event-ias-statistic-details/garbage-management-record-event-ias-statistic-details-manager/garbage-management-record-event-ias-statistic-details-manager.component';
import {
  GarbageManagementRecordEventIasArgs,
  GarbageManagementRecordEventIasManagerIndex,
} from '../garbage-management-record-event-ias.model';

@Component({
  selector: 'howell-garbage-management-record-event-ias-manager',
  imports: [
    CommonModule,
    GarbageManagementRecordEventIasListManagerComponent,
    GarbageManagementRecordEventIasStatisticDetailsManagerComponent,
  ],
  templateUrl: './garbage-management-record-event-ias-manager.component.html',
  styleUrl: './garbage-management-record-event-ias-manager.component.less',
})
export class GarbageManagementRecordEventIasManagerComponent {
  @Input() args: GarbageManagementRecordEventIasArgs = {};
  @Output() task = new EventEmitter<IasEventRecord>();
  @Output() position = new EventEmitter<IasEventRecord>();
  @Output() image = new EventEmitter<PagedArgs<IasEventRecord>>();
  @Output() video = new EventEmitter<IasEventRecord>();
  @Output() association = new EventEmitter<{
    duration: Duration;
    data: IasEventRecord;
  }>();
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
    image: (data: PagedArgs<IasEventRecord>) => {
      this.image.emit(data);
    },
    video: (data: IasEventRecord) => {
      this.video.emit(data);
    },
    association: (data: { duration: Duration; data: IasEventRecord }) => {
      this.association.emit(data);
    },
  };
}
