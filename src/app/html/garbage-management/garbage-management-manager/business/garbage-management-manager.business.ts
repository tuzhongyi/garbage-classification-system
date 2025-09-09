import { Injectable } from '@angular/core';
import { GarbageManagementManagerDeviceBusiness } from './garbage-management-manager-device.business';
import { GarbageManagementManagerStationBusiness } from './garbage-management-manager-station.business';

@Injectable()
export class GarbageManagementManagerBusiness {
  constructor(
    public station: GarbageManagementManagerStationBusiness,
    public device: GarbageManagementManagerDeviceBusiness
  ) {}
}
