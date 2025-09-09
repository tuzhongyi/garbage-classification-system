import { GarbageManagementMapDataBusiness } from './business/garbage-management-map-data.business';
import { GarbageManagementMapDivisionBusiness } from './business/garbage-management-map-division.business';
import { GarbageManagementMapGridBusiness } from './business/garbage-management-map-grid.business';
import { GarbageManagementMapBusiness } from './business/garbage-management-map.business';
import { GarbageManagementMapAMapController } from './controller/amap/garbage-management-map-amap.controller';
import { GarbageManagementMapController } from './controller/garbage-management-map.controller';

const businesses = [
  GarbageManagementMapDataBusiness,
  GarbageManagementMapDivisionBusiness,
  GarbageManagementMapGridBusiness,
  GarbageManagementMapBusiness,
];

const controllers = [
  GarbageManagementMapAMapController,
  GarbageManagementMapController,
];

export const GarbageManagementMapProviders = [...businesses, ...controllers];
