import { Injectable } from '@angular/core';
import { GarbageManagementMapDataBusiness } from './garbage-management-map-data.business';
import { GarbageManagementMapDivisionBusiness } from './garbage-management-map-division.business';
import { GarbageManagementMapGridBusiness } from './garbage-management-map-grid.business';

@Injectable()
export class GarbageManagementMapBusiness {
  constructor(
    public map: GarbageManagementMapDataBusiness,
    public division: GarbageManagementMapDivisionBusiness,
    public grid: GarbageManagementMapGridBusiness
  ) {}
}
