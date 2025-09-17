import { CommonModule } from '@angular/common';
import { HowellPanelComponent } from '../../share/panel/panel.component';
import { HowellWindowComponent } from '../../share/window/window.component';
import { GarbageManagementStationManagerComponent } from '../garbage-management-container/garbage-management-station/garbage-management-station-manager/garbage-management-station-manager.component';
import { GarbageManagementControlButtonListComponent } from '../garbage-management-control/garbage-management-control-button-list/garbage-management-control-button-list.component';
import { GarbageManagementHeaderComponent } from '../garbage-management-header/component/garbage-management-header.component';
import { GarbageManagementManagerSettingsComponent } from '../garbage-management-manager-settings/garbage-management-manager-settings.component';
import { GarbageManagementMapComponent } from '../garbage-management-map/garbage-management-map.component';
import { GarbageManagementStateStationComponent } from '../garbage-management-state/garbage-management-state-station/garbage-management-state-station.component';
import { GarbageManagementStatisticStationComponent } from '../garbage-management-statistic/garbage-management-statistic-station/component/garbage-management-statistic-station.component';
import { GarbageManagementStreetDeviceManagerComponent } from '../garbage-management-street/garbage-management-street-device/garbage-management-street-device-manager/garbage-management-street-device-manager.component';

export const GarbageManagementManagerImports = [
  CommonModule,
  GarbageManagementHeaderComponent,
  GarbageManagementMapComponent,
  GarbageManagementStatisticStationComponent,
  HowellWindowComponent,
  HowellPanelComponent,
  GarbageManagementManagerSettingsComponent,
  GarbageManagementControlButtonListComponent,
  GarbageManagementStateStationComponent,
  GarbageManagementStationManagerComponent,
  GarbageManagementStreetDeviceManagerComponent,
];
