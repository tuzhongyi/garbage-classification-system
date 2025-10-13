import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { StationType } from '../../../../../../common/enum/station-type.enum';
import { MixedIntoEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/mixed-into-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { SelectGarbageStationComponent } from '../../../../../share/select/select-garbage-station/select-garbage-station.component';
import { GarbageManagementRecordEventMixedIntoListTableComponent } from '../garbage-management-record-event-mixed-into-list-table/garbage-management-record-event-mixed-into-list-table.component';
import { GarbageManagementRecordEventMixedIntoListTableArgs } from '../garbage-management-record-event-mixed-into-list-table/garbage-management-record-event-mixed-into-list-table.model';

@Component({
  selector: 'howell-garbage-management-record-event-mixed-into-list-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SelectDivisionComponent,
    SelectGarbageStationComponent,
    HowellSelectComponent,
    GarbageManagementRecordEventMixedIntoListTableComponent,
  ],
  templateUrl:
    './garbage-management-record-event-mixed-into-list-manager.component.html',
  styleUrl:
    './garbage-management-record-event-mixed-into-list-manager.component.less',
})
export class GarbageManagementRecordEventMixedIntoListManagerComponent {
  @Output() image = new EventEmitter<PagedArgs<MixedIntoEventRecord>>();
  @Output() video = new EventEmitter<MixedIntoEventRecord>();
  @Output() videoall = new EventEmitter<MixedIntoEventRecord>();
  @Output() complete = new EventEmitter<MixedIntoEventRecord>();

  constructor() {}

  table = {
    args: new GarbageManagementRecordEventMixedIntoListTableArgs(),
    load: new EventEmitter<GarbageManagementRecordEventMixedIntoListTableArgs>(),
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
