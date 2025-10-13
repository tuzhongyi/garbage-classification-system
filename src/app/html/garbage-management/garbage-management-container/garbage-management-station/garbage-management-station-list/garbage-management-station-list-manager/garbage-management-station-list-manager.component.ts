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
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { StationState } from '../../../../../../common/enum/station-state.enum';
import { StationType } from '../../../../../../common/enum/station-type.enum';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { SelectDivisionComponent } from '../../../../../share/select/select-division/select-division.component';
import { GarbageStationTableArgs } from '../garbage-management-station-list-table/business/garbage-station-table.model';
import { GarbageManagementStationListTableComponent } from '../garbage-management-station-list-table/garbage-management-station-list-table.component';
import { GarbageManagementStationListManagerSource } from './garbage-management-station-list-manager.source';

@Component({
  selector: 'howell-garbage-management-station-list-manager',
  imports: [
    CommonModule,
    FormsModule,
    GarbageManagementStationListTableComponent,
    SelectDivisionComponent,
    HowellSelectComponent,
  ],
  templateUrl: './garbage-management-station-list-manager.component.html',
  styleUrl: './garbage-management-station-list-manager.component.less',
  providers: [GarbageManagementStationListManagerSource],
})
export class GarbageManagementStationListManagerComponent implements OnChanges {
  @Input() type?: StationType;
  @Input() state?: StationState;
  @Output() image: EventEmitter<PagedArgs<GarbageStation>> = new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();
  @Output() video: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(public source: GarbageManagementStationListManagerSource) {
    this.table.args.types = [...this.table.type.all];
  }

  private change = {
    type: (simple: SimpleChange) => {
      if (simple) {
        this.table.type.selected = this.type;
        this.on.type(this.type);
      }
    },
    state: (simple: SimpleChange) => {
      if (simple) {
        this.table.args.state = this.state;
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.type(changes['type']);
    this.change.state(changes['state']);
  }

  table = {
    type: {
      selected: undefined as StationType | undefined,
      all: ObjectTool.model.GarbageStation.types,
    },
    args: new GarbageStationTableArgs(),
    load: new EventEmitter<GarbageStationTableArgs>(),
  };

  on = {
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
    type: (type?: StationType) => {
      switch (type) {
        case StationType.Garbage:
          this.table.args.types = [
            StationType.Garbage,
            StationType.Smart,
            StationType.Plus,
          ];
          break;
        case StationType.IllegalDump:
          this.table.args.types = [StationType.IllegalDump];
          break;
        case StationType.VehicleWatching:
          this.table.args.types = [StationType.VehicleWatching];
          break;
        default:
          this.table.args.types = [...this.table.type.all];
          break;
      }
    },
  };
}
