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
import { HowellSelectComponent } from '../../../../../common/components/select/hw-select/select-control.component';
import { StationState } from '../../../../../common/enum/station-state.enum';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { SelectDivisionComponent } from '../../../../share/select/select-division/select-division.component';
import { GarbageStationTableArgs } from '../../garbage-management-station/garbage-management-station-list/garbage-management-station-list-table/business/garbage-station-table.model';
import { GarbageManagementStationListTableComponent } from '../../garbage-management-station/garbage-management-station-list/garbage-management-station-list-table/garbage-management-station-list-table.component';
import { GarbageManagementRecordEventGarbageFullArgs } from '../garbage-management-record-event-garbage-full.model';

@Component({
  selector: 'howell-garbage-management-record-event-garbage-full-station',
  imports: [
    CommonModule,
    FormsModule,
    GarbageManagementStationListTableComponent,
    SelectDivisionComponent,
    HowellSelectComponent,
  ],
  templateUrl:
    './garbage-management-record-event-garbage-full-station.component.html',
  styleUrl:
    './garbage-management-record-event-garbage-full-station.component.less',
})
export class GarbageManagementRecordEventGarbageFullStationComponent
  implements OnChanges
{
  @Input() args: GarbageManagementRecordEventGarbageFullArgs = {};
  @Output() argsChange =
    new EventEmitter<GarbageManagementRecordEventGarbageFullArgs>();

  @Output() image: EventEmitter<PagedArgs<GarbageStation>> = new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();
  @Output() video: EventEmitter<GarbageStation> = new EventEmitter();

  constructor() {
    this.table.args.state = StationState.Full;
  }

  table = {
    args: new GarbageStationTableArgs(),
    load: new EventEmitter<GarbageStationTableArgs>(),
  };

  private change = {
    args: (simple: SimpleChange) => {
      if (simple) {
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
      division: () => {
        this.args.divisionId = this.table.args.divisionId;
        this.argsChange.emit(this.args);
      },
    },
    image: (args: PagedArgs<GarbageStation>) => {
      this.image.emit(args);
    },
    position: (data: GarbageStation) => {
      this.position.emit(data);
    },
    video: (data: GarbageStation) => {
      this.video.emit(data);
    },
    search: () => {
      this.table.load.emit(this.table.args);
    },
  };
}
