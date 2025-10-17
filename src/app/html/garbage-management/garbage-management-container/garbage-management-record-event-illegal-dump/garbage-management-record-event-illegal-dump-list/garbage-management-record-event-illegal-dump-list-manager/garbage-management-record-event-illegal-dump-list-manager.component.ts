import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { StationType } from '../../../../../../common/enum/station-type.enum';
import { IllegalDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-drop-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { SelectSearchGarbageStationComponent } from '../../../../../share/select/select-garbage-station-search/select-garbage-station-search.component';
import { GarbageManagementRecordEventIllegalDumpListTableComponent } from '../garbage-management-record-event-illegal-dump-list-table/garbage-management-record-event-illegal-dump-list-table.component';
import { GarbageManagementRecordEventIllegalDumpListTableArgs } from '../garbage-management-record-event-illegal-dump-list-table/garbage-management-record-event-illegal-dump-list-table.model';

@Component({
  selector: 'howell-garbage-management-record-event-illegal-dump-list-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SelectDivisionComponent,
    SelectSearchGarbageStationComponent,
    HowellSelectComponent,
    GarbageManagementRecordEventIllegalDumpListTableComponent,
  ],
  templateUrl:
    './garbage-management-record-event-illegal-dump-list-manager.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-dump-list-manager.component.less',
})
export class GarbageManagementRecordEventIllegalDumpListManagerComponent {
  @Output() image = new EventEmitter<PagedArgs<IllegalDropEventRecord>>();
  @Output() video = new EventEmitter<IllegalDropEventRecord>();

  constructor() {}

  table = {
    args: new GarbageManagementRecordEventIllegalDumpListTableArgs(),
    load: new EventEmitter<GarbageManagementRecordEventIllegalDumpListTableArgs>(),
    station: {
      types: [StationType.IllegalDump],
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

    image: (data: PagedArgs<IllegalDropEventRecord>) => {
      this.image.emit(data);
    },
    video: (data: IllegalDropEventRecord) => {
      this.video.emit(data);
    },
  };
}
