import { GarbageManagementManagerDeviceBusiness } from './business/garbage-management-manager-device.business';
import { GarbageManagementManagerStationBusiness } from './business/garbage-management-manager-station.business';
import { GarbageManagementManagerBusiness } from './business/garbage-management-manager.business';
import { GarbageManagementManagerCardController } from './controller/card/garbage-management-manager-card.controller';
import { GarbageManagementManagerDataController } from './controller/data/garbage-management-manager-data.controller';
import { GarbageManagementManagerController } from './controller/garbage-management-manager.controller';

const controllers = [
  GarbageManagementManagerController,
  GarbageManagementManagerCardController,
  GarbageManagementManagerDataController,
];

const businesses = [
  GarbageManagementManagerStationBusiness,
  GarbageManagementManagerDeviceBusiness,
  GarbageManagementManagerBusiness,
];
export const GarbageManagementManagerProviders = [
  ...controllers,
  ...businesses,
];
