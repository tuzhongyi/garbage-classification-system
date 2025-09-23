import { Injectable } from '@angular/core';
import { GarbageManagementManagerIasBusiness } from './garbage-management-manager-ias.business';
import { GarbageManagementManagerStationBusiness } from './garbage-management-manager-station.business';

@Injectable()
export class GarbageManagementManagerBusiness {
  constructor(
    public station: GarbageManagementManagerStationBusiness,
    public ias: GarbageManagementManagerIasBusiness
  ) {}
}
