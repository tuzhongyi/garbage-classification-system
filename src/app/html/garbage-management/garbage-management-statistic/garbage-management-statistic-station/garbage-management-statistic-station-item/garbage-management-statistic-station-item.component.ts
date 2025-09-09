import { Component, Input } from '@angular/core';
import { GarbageManagementStatisticStationItem } from './garbage-management-statistic-station-item.model';

@Component({
  selector: 'howell-garbage-management-statistic-station-item',
  imports: [],
  templateUrl: './garbage-management-statistic-station-item.component.html',
  styleUrl: './garbage-management-statistic-station-item.component.less',
})
export class GarbageManagementStatisticStationItemComponent {
  @Input() data = new GarbageManagementStatisticStationItem();
  constructor() {}
}
