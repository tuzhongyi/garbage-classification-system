import { GarbageManagementManagerIasBusiness } from './business/garbage-management-manager-ias.business';
import { GarbageManagementManagerStationBusiness } from './business/garbage-management-manager-station.business';
import { GarbageManagementManagerBusiness } from './business/garbage-management-manager.business';
import { GarbageManagementManagerCardController } from './controller/card/garbage-management-manager-card.controller';
import { GarbageManagementManagerDataController } from './controller/data/garbage-management-manager-data.controller';
import { GarbageManagementManagerController } from './controller/garbage-management-manager.controller';
import { GarbageManagementManagerStatisticController } from './controller/statistic/garbage-management-manager-statistic.controller';
import { GarbageManagementManagerVideoController } from './controller/video/garbage-management-manager-video.controller';
import { GarbageManagementManagerPanel } from './panel/garbage-management-manager.panel';
import { GarbageManagementManagerWindow } from './window/garbage-management-manager.window';

const controllers = [
  GarbageManagementManagerController,
  GarbageManagementManagerCardController,
  GarbageManagementManagerDataController,
  GarbageManagementManagerStatisticController,
  GarbageManagementManagerVideoController,
];

const businesses = [
  GarbageManagementManagerStationBusiness,
  GarbageManagementManagerIasBusiness,
  GarbageManagementManagerBusiness,
];
export const GarbageManagementManagerProviders = [
  ...controllers,
  ...businesses,
  GarbageManagementManagerPanel,
  GarbageManagementManagerWindow,
];
