import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GarbageManagementStationListManagerComponent } from '../garbage-management-station-list/garbage-management-station-list-manager/garbage-management-station-list-manager.component';
import { GarbageManagementStationStatisticDetailsManagerComponent } from '../garbage-management-station-statistic-details/garbage-management-station-statistic-details-manager/garbage-management-station-statistic-details-manager.component';
import { GarbageManagementStationStatisticTotalManagerComponent } from '../garbage-management-station-statistic-total/garbage-management-station-statistic-total-manager/garbage-management-station-statistic-total-manager.component';
import { GarbageManagementStationManagerIndex } from './garbage-management-station-manager.model';
import { StationType } from '../../../../../common/enum/station-type.enum';

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
@Input() type?:StationType

  index = GarbageManagementStationManagerIndex.list;
  Index = GarbageManagementStationManagerIndex;

  on = {
    index: (index: GarbageManagementStationManagerIndex) => {
      this.index = index;
    },
  };
}
