import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';
import { GarbageManagementManagerDataLoaderDeviceController } from './garbage-management-manager-data-loader-device.controller';
import { GarbageManagementManagerDataLoaderStationController } from './garbage-management-manager-data-loader-station.controller';

export class GarbageManagementManagerDataLoaderController {
  constructor(business: GarbageManagementManagerBusiness) {
    this.station = new GarbageManagementManagerDataLoaderStationController(
      business
    );
    this.device = new GarbageManagementManagerDataLoaderDeviceController(
      business
    );
  }

  station: GarbageManagementManagerDataLoaderStationController;
  device: GarbageManagementManagerDataLoaderDeviceController;
}
