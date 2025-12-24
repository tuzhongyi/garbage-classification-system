import { Injectable } from '@angular/core';
import { GarbageManagementManagerComponent } from '../garbage-management-manager.component';
import { GarbageManagementManagerCardController } from './card/garbage-management-manager-card.controller';
import { GarbageManagementManagerDataController } from './data/garbage-management-manager-data.controller';
import { GarbageManagementManagerMapController } from './map/garbage-management-manager-map.controller';
import { GarbageManagementManagerMediumController } from './medium/garbage-management-manager-medium.controller';
import { GarbageManagementManagerNavigationController } from './navigation/garbage-management-manager-navigation.controller';
import { GarbageManagementManagerStateController } from './state/garbage-management-manager-state.controller';
import { GarbageManagementManagerStatisticController } from './statistic/garbage-management-manager-statistic.controller';

@Injectable()
export class GarbageManagementManagerController {
  card: GarbageManagementManagerCardController;
  data: GarbageManagementManagerDataController;
  statistic: GarbageManagementManagerStatisticController;
  medium: GarbageManagementManagerMediumController;
  map: GarbageManagementManagerMapController;
  navigation: GarbageManagementManagerNavigationController;
  state: GarbageManagementManagerStateController;
  constructor(that: GarbageManagementManagerComponent) {
    this.card = new GarbageManagementManagerCardController(that);
    this.data = new GarbageManagementManagerDataController(that);
    this.statistic = new GarbageManagementManagerStatisticController(that);
    this.medium = new GarbageManagementManagerMediumController(that);
    this.map = new GarbageManagementManagerMapController(that);
    this.navigation = new GarbageManagementManagerNavigationController();
    this.state = new GarbageManagementManagerStateController(that);
  }
}
