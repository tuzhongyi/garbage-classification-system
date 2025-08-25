import { Injectable } from '@angular/core';
import { GarbageManagementMapDataBusiness } from './garbage-management-map-data.business';
import { GarbageManagementMapStationBusiness } from './garbage-management-map-station.business';

@Injectable()
export class GarbageManagementMapBusiness {
  constructor(
    public map: GarbageManagementMapDataBusiness,
    public station: GarbageManagementMapStationBusiness
  ) {}
}
