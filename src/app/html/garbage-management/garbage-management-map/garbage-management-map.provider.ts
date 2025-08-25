import { GarbageManagementMapDataBusiness } from './business/garbage-management-map-data.business';
import { GarbageManagementMapStationBusiness } from './business/garbage-management-map-station.business';
import { GarbageManagementMapBusiness } from './business/garbage-management-map.business';
import { GarbageManagementMapAMapController } from './controller/amap/garbage-management-map-amap.controller';
import { GarbageManagementMapController } from './controller/garbage-management-map.controller';

const businesses = [
  GarbageManagementMapDataBusiness,
  GarbageManagementMapStationBusiness,
  GarbageManagementMapBusiness,
];

const controllers = [
  GarbageManagementMapAMapController,
  GarbageManagementMapController,
];

export const GarbageManagementMapProviders = [...businesses, ...controllers];
