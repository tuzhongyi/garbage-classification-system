import { CommonModule } from '@angular/common';
import { GarbageManagementCardComponent } from '../garbage-management-card/component/garbage-management-card.component';
import { GarbageManagementChartRecordEventIllegalDropComponent } from '../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event-illegal-drop/garbage-management-chart-record-event-illegal-drop.component';
import { GarbageManagementChartRecordEventMixedIntoComponent } from '../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event-mixed-into/garbage-management-chart-record-event-mixed-into.component';
import { GarbageManagementChartStationCountComponent } from '../garbage-management-chart/garbage-management-chart-station-count/component/garbage-management-chart-station-count.component';
import { GarbageManagementChartStationStateComponent } from '../garbage-management-chart/garbage-management-chart-station-state/garbage-management-chart-station-state.component';
import { GarbageManagementChartTaskComponent } from '../garbage-management-chart/garbage-management-chart-task/garbage-management-chart-task.component';
import { GarbageManagementHeaderComponent } from '../garbage-management-header/component/garbage-management-header.component';
import { GarbageManagementMapComponent } from '../garbage-management-map/garbage-management-map.component';
import { GarbageManagementRankingGarbageDropIndexComponent } from '../garbage-management-ranking/garbage-management-ranking-garbage-drop/garbage-management-ranking-garbage-drop-index/garbage-management-ranking-garbage-drop-index.component';
import { GarbageManagementRankingRecordEventIndexComponent } from '../garbage-management-ranking/garbage-management-ranking-record-event/garbage-management-ranking-record-event-index/garbage-management-ranking-record-event-index.component';
import { GarbageManagementStatisticGarbageComponent } from '../garbage-management-statistic/garbage-management-statistic-garbage/component/garbage-management-statistic-garbage.component';
import { GarbageManagementStatisticRecordComponent } from '../garbage-management-statistic/garbage-management-statistic-record/component/garbage-management-statistic-record.component';

export const garbageManagementContainerImports = [
  CommonModule,
  GarbageManagementHeaderComponent,
  GarbageManagementMapComponent,

  GarbageManagementCardComponent,
  GarbageManagementChartRecordEventIllegalDropComponent,
  GarbageManagementChartRecordEventMixedIntoComponent,
  GarbageManagementRankingRecordEventIndexComponent,
  GarbageManagementRankingGarbageDropIndexComponent,
  GarbageManagementChartTaskComponent,
  GarbageManagementChartStationCountComponent,
  GarbageManagementChartStationStateComponent,
  GarbageManagementStatisticGarbageComponent,
  GarbageManagementStatisticRecordComponent,
];
