import { CommonModule } from '@angular/common';
import { HowellPanelComponent } from '../../share/panel/panel.component';
import { HowellWindowComponent } from '../../share/window/window.component';
import { GarbageManagementCardComponent } from '../garbage-management-card/component/garbage-management-card.component';
import { GarbageManagementCardChartStationCountComponent } from '../garbage-management-card/garbage-management-card-chart-station-count/garbage-management-card-chart-station-count.component';
import { GarbageManagementCardChartStationStateComponent } from '../garbage-management-card/garbage-management-card-chart-station-state/garbage-management-card-chart-station-state.component';
import { GarbageManagementCardChartTaskComponent } from '../garbage-management-card/garbage-management-card-chart-task/garbage-management-card-chart-task.component';
import { GarbageManagementCardStatisticGarbageComponent } from '../garbage-management-card/garbage-management-card-statistic-garbage/garbage-management-card-statistic-garbage.component';
import { GarbageManagementControlButtonListComponent } from '../garbage-management-control/garbage-management-control-button-list/garbage-management-control-button-list.component';
import { GarbageManagementHeaderComponent } from '../garbage-management-header/component/garbage-management-header.component';
import { GarbageManagementManagerSettingsComponent } from '../garbage-management-manager-settings/garbage-management-manager-settings.component';
import { GarbageManagementMapComponent } from '../garbage-management-map/garbage-management-map.component';
import { GarbageManagementStateStationComponent } from '../garbage-management-state/garbage-management-state-station/garbage-management-state-station.component';
import { GarbageManagementStatisticStationComponent } from '../garbage-management-statistic/garbage-management-statistic-station/component/garbage-management-statistic-station.component';

export const GarbageManagementManagerImports = [
  CommonModule,
  GarbageManagementHeaderComponent,
  GarbageManagementMapComponent,
  GarbageManagementCardComponent,
  GarbageManagementCardChartTaskComponent,
  GarbageManagementCardChartStationCountComponent,
  GarbageManagementCardChartStationStateComponent,
  GarbageManagementCardStatisticGarbageComponent,
  GarbageManagementStatisticStationComponent,
  HowellWindowComponent,
  HowellPanelComponent,
  GarbageManagementManagerSettingsComponent,
  GarbageManagementControlButtonListComponent,
  GarbageManagementStateStationComponent,
];
