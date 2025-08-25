import { Component } from '@angular/core';
import { GarbageManagementChartRecordEventIllegalDropComponent } from '../../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event-illegal-drop/garbage-management-chart-record-event-illegal-drop.component';
import { GarbageManagementChartRecordEventMixedIntoComponent } from '../../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event-mixed-into/garbage-management-chart-record-event-mixed-into.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-record-event',
  imports: [
    GarbageManagementCardComponent,
    GarbageManagementChartRecordEventIllegalDropComponent,
    GarbageManagementChartRecordEventMixedIntoComponent,
  ],
  templateUrl: './garbage-management-card-record-event.component.html',
  styleUrl: './garbage-management-card-record-event.component.less',
})
export class GarbageManagementCardRecordEventComponent {}
