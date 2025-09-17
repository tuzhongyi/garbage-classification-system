import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { GarbageStation } from '../../../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
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
export class GarbageManagementStationListManagerComponent {
  @Output() image: EventEmitter<PagedArgs<GarbageStation>> = new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(public source: GarbageManagementStationListManagerSource) {}

  table = {
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
    search: () => {
      this.table.load.emit(this.table.args);
    },
  };
}
