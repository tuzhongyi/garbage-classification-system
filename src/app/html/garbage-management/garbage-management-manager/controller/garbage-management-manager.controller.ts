import { Injectable } from '@angular/core';
import { GarbageManagementManagerCardController } from './card/garbage-management-manager-card.controller';
import { GarbageManagementManagerDataController } from './data/garbage-management-manager-data.controller';
import { GarbageManagementManagerNavigationController } from './navigation/garbage-management-manager-navigation.controller';
import { GarbageManagementManagerStatisticController } from './statistic/garbage-management-manager-statistic.controller';

@Injectable()
export class GarbageManagementManagerController {
  constructor(
    public card: GarbageManagementManagerCardController,
    public data: GarbageManagementManagerDataController,
    public statistic: GarbageManagementManagerStatisticController
  ) {
    this.navigation = new GarbageManagementManagerNavigationController();
  }

  navigation: GarbageManagementManagerNavigationController;
}
