import { Component, Input } from '@angular/core';
import { GarbageManagementStatisticGarbageItem } from './garbage-management-statistic-garbage-item.model';

@Component({
  selector: 'howell-garbage-management-statistic-garbage-item',
  imports: [],
  templateUrl: './garbage-management-statistic-garbage-item.component.html',
  styleUrl: './garbage-management-statistic-garbage-item.component.less',
})
export class GarbageManagementStatisticGarbageItemComponent {
  @Input() data = new GarbageManagementStatisticGarbageItem();
}
