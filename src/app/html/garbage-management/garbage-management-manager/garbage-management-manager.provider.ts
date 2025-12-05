import { GarbageManagementManagerIasBusiness } from './business/garbage-management-manager-ias.business';
import { GarbageManagementManagerStationBusiness } from './business/garbage-management-manager-station.business';
import { GarbageManagementManagerBusiness } from './business/garbage-management-manager.business';
import { GarbageManagementManagerWindowProvider } from './window/garbage-management-manager.window';

const businesses = [
  GarbageManagementManagerStationBusiness,
  GarbageManagementManagerIasBusiness,
  GarbageManagementManagerBusiness,
];

export const GarbageManagementManagerProviders = [
  ...businesses,
  ...GarbageManagementManagerWindowProvider,
];
