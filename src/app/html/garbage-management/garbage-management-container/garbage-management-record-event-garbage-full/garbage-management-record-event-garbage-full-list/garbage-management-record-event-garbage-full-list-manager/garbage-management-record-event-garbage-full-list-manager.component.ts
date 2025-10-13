import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { StationType } from '../../../../../../common/enum/station-type.enum';
import { GarbageFullEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-full-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { SelectGarbageStationComponent } from '../../../../../share/select/select-garbage-station/select-garbage-station.component';
import { GarbageManagementRecordEventGarbageFullListTableComponent } from '../garbage-management-record-event-garbage-full-list-table/garbage-management-record-event-garbage-full-list-table.component';
import { GarbageManagementRecordEventGarbageFullListTableArgs } from '../garbage-management-record-event-garbage-full-list-table/garbage-management-record-event-garbage-full-list-table.model';

@Component({
  selector: 'howell-garbage-management-record-event-garbage-full-list-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SelectDivisionComponent,
    SelectGarbageStationComponent,
    HowellSelectComponent,
    GarbageManagementRecordEventGarbageFullListTableComponent,
  ],
  templateUrl:
    './garbage-management-record-event-garbage-full-list-manager.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-full-list-manager.component.less',
})
export class GarbageManagementRecordEventGarbageFullListManagerComponent {
  @Output() image = new EventEmitter<PagedArgs<GarbageFullEventRecord>>();
  @Output() video = new EventEmitter<GarbageFullEventRecord>();
  @Output() videoall = new EventEmitter<GarbageFullEventRecord>();
  @Output() complete = new EventEmitter<GarbageFullEventRecord>();

  constructor() {}

  table = {
    args: new GarbageManagementRecordEventGarbageFullListTableArgs(),
    load: new EventEmitter<GarbageManagementRecordEventGarbageFullListTableArgs>(),
    station: {
      types: [StationType.Garbage, StationType.Plus, StationType.Smart],
    },
  };

  name = {
    type: 'station',
  };

  on = {
    search: () => {
      this.table.load.emit(this.table.args);
    },
    name: () => {
      switch (this.name.type) {
        case 'station':
          this.table.args.communityname = undefined;
          break;
        case 'community':
          this.table.args.stationname = undefined;
          break;

        default:
          break;
      }
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
  };
}
