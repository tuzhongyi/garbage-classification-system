import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GarbageManagementChartTaskComponent } from '../../garbage-management-chart/garbage-management-chart-task/garbage-management-chart-task.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-chart-task',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementChartTaskComponent,
  ],
  templateUrl: './garbage-management-card-chart-task.component.html',
  styleUrl: './garbage-management-card-chart-task.component.less',
})
export class GarbageManagementCardChartTaskComponent {
  title = '今日垃圾滞留任务';
}
