import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { GarbageManagementStatisticGarbageComponent } from '../../garbage-management-statistic/garbage-management-statistic-garbage/component/garbage-management-statistic-garbage.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-statistic-garbage',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementStatisticGarbageComponent,
  ],
  templateUrl: './garbage-management-card-statistic-garbage.component.html',
  styleUrl: './garbage-management-card-statistic-garbage.component.less',
})
export class GarbageManagementCardStatisticGarbageComponent {
  @Input() load?: EventEmitter<void>;
  title = '今日垃圾落地排名';
}
