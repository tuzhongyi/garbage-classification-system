import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StationType } from '../../../../../common/enum/station-type.enum';
import { GarbageStation } from '../../../../../common/network/model/garbage-station/garbage-station.model';
import { PagedArgs } from '../../../../../common/network/model/model.interface';
import { GarbageManagementStationListManagerComponent } from '../garbage-management-station-list/garbage-management-station-list-manager/garbage-management-station-list-manager.component';
import { GarbageManagementStationStatisticDetailsManagerComponent } from '../garbage-management-station-statistic-details/garbage-management-station-statistic-details-manager/garbage-management-station-statistic-details-manager.component';
import { GarbageManagementStationStatisticTotalManagerComponent } from '../garbage-management-station-statistic-total/garbage-management-station-statistic-total-manager/garbage-management-station-statistic-total-manager.component';
import { GarbageManagementStationManagerIndex } from './garbage-management-station-manager.model';

@Component({
  selector: 'howell-garbage-management-station-manager',
  imports: [
    CommonModule,
    GarbageManagementStationListManagerComponent,
    GarbageManagementStationStatisticTotalManagerComponent,
    GarbageManagementStationStatisticDetailsManagerComponent,
  ],
  templateUrl: './garbage-management-station-manager.component.html',
  styleUrl: './garbage-management-station-manager.component.less',
})
export class GarbageManagementStationManagerComponent {
  @Input() type?: StationType;

  @Output() image = new EventEmitter<PagedArgs<GarbageStation>>();
  @Output() video = new EventEmitter<GarbageStation>();
  @Output() position = new EventEmitter<GarbageStation>();

  index = GarbageManagementStationManagerIndex.list;
  Index = GarbageManagementStationManagerIndex;

  on = {
    index: (index: GarbageManagementStationManagerIndex) => {
      this.index = index;
    },
    image: (data: PagedArgs<GarbageStation>) => {
      this.image.emit(data);
    },
    video: (station: GarbageStation) => {
      this.video.emit(station);
    },
    position: (station: GarbageStation) => {
      this.position.emit(station);
    },
  };
}
