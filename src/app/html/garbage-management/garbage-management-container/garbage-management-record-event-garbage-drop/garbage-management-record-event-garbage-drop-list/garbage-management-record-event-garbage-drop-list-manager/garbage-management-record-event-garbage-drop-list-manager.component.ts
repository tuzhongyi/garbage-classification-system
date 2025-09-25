import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { GarbageDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { SelectGarbageStationComponent } from '../../../../../share/select/select-garbage-station/select-garbage-station.component';
import { GarbageManagementRecordEventGarbageDropListTableComponent } from '../garbage-management-record-event-garbage-drop-list-table/garbage-management-record-event-garbage-drop-list-table.component';
import { GarbageManagementRecordEventGarbageDropListTableArgs } from '../garbage-management-record-event-garbage-drop-list-table/garbage-management-record-event-garbage-drop-list-table.model';

@Component({
  selector: 'howell-garbage-management-record-event-garbage-drop-list-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SelectDivisionComponent,
    SelectGarbageStationComponent,
    HowellSelectComponent,
    GarbageManagementRecordEventGarbageDropListTableComponent,
  ],
  templateUrl:
    './garbage-management-record-event-garbage-drop-list-manager.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-drop-list-manager.component.less',
})
export class GarbageManagementRecordEventGarbageDropListManagerComponent {
  @Output() image = new EventEmitter<PagedArgs<GarbageDropEventRecord>>();
  @Output() video = new EventEmitter<GarbageDropEventRecord>();

  constructor() {}

  table = {
    args: new GarbageManagementRecordEventGarbageDropListTableArgs(),
    load: new EventEmitter<GarbageManagementRecordEventGarbageDropListTableArgs>(),
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

    image: (data: PagedArgs<GarbageDropEventRecord>) => {
      this.image.emit(data);
    },
    video: (data: GarbageDropEventRecord) => {
      this.video.emit(data);
    },
  };
}
