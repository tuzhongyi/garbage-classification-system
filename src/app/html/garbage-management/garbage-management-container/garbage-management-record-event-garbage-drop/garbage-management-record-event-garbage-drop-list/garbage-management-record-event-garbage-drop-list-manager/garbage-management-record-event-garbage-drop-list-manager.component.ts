import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { StationType } from '../../../../../../common/enum/station-type.enum';
import { GarbageDropEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/garbage-drop-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { SelectSearchGarbageStationComponent } from '../../../../../share/select/select-garbage-station-search/select-garbage-station-search.component';
import { GarbageManagementRecordEventGarbageDropArgs } from '../../garbage-management-record-event-garbage-drop.model';
import { GarbageManagementRecordEventGarbageDropListTableComponent } from '../garbage-management-record-event-garbage-drop-list-table/garbage-management-record-event-garbage-drop-list-table.component';
import { GarbageManagementRecordEventGarbageDropListTableArgs } from '../garbage-management-record-event-garbage-drop-list-table/garbage-management-record-event-garbage-drop-list-table.model';
import { GarbageManagementRecordEventGarbageDropListManagerSource } from './garbage-management-record-event-garbage-drop-list-manager.source';

@Component({
  selector: 'howell-garbage-management-record-event-garbage-drop-list-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SelectDivisionComponent,
    SelectSearchGarbageStationComponent,
    HowellSelectComponent,
    GarbageManagementRecordEventGarbageDropListTableComponent,
  ],
  templateUrl:
    './garbage-management-record-event-garbage-drop-list-manager.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-drop-list-manager.component.less',
})
export class GarbageManagementRecordEventGarbageDropListManagerComponent
  implements OnChanges
{
  @Input() args: GarbageManagementRecordEventGarbageDropArgs = {};
  @Output() argsChange =
    new EventEmitter<GarbageManagementRecordEventGarbageDropArgs>();

  @Output() image = new EventEmitter<PagedArgs<GarbageDropEventRecord>>();
  @Output() video = new EventEmitter<GarbageDropEventRecord>();
  @Output() videoall = new EventEmitter<GarbageDropEventRecord>();
  @Output() complete = new EventEmitter<GarbageDropEventRecord>();

  constructor() {}

  source = new GarbageManagementRecordEventGarbageDropListManagerSource();

  state = {
    value: undefined as number | undefined,
    on: {
      change: () => {
        this.table.args.handle = undefined;
        this.table.args.timeout = undefined;
        switch (this.state.value) {
          case 0:
            this.table.args.handle = false;
            break;
          case 1:
            this.table.args.handle = true;
            break;
          case 2:
            this.table.args.timeout = true;
            break;
          case 3:
            this.table.args.timeout = true;
            this.table.args.handle = false;
            break;
          case 4:
            this.table.args.timeout = true;
            this.table.args.handle = true;
            break;
          default:
            break;
        }
      },
    },
  };

  table = {
    args: new GarbageManagementRecordEventGarbageDropListTableArgs(),
    load: new EventEmitter<GarbageManagementRecordEventGarbageDropListTableArgs>(),
    station: {
      types: [
        StationType.Garbage,
        StationType.Plus,
        StationType.Smart,
        StationType.IllegalDump,
      ],
    },
  };

  name = {
    type: 'station',
  };

  private change = {
    args: (simple: SimpleChange) => {
      if (simple) {
        if (this.table.args.stationId != this.args.stationId) {
          this.table.args.stationId = this.args.stationId;
        }
        if (this.table.args.divisionId != this.args.divisionId) {
          this.table.args.divisionId = this.args.divisionId;
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.args(changes['args']);
  }

  on = {
    change: {
      station: () => {
        this.args.stationId = this.table.args.stationId;
        this.argsChange.emit(this.args);
      },
      division: () => {
        this.args.divisionId = this.table.args.divisionId;
        this.argsChange.emit(this.args);
      },
    },
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
