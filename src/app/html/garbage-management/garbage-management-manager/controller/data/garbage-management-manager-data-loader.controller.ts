import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';
import { GarbageManagementManagerDataLoaderDeviceController } from './garbage-management-manager-data-loader-device.controller';
import { GarbageManagementManagerDataLoaderIasExposedController } from './garbage-management-manager-data-loader-ias-exposed.controller';
import { GarbageManagementManagerDataLoaderStationController } from './garbage-management-manager-data-loader-station.controller';

export class GarbageManagementManagerDataLoaderController {
  station: GarbageManagementManagerDataLoaderStationController;
  device: GarbageManagementManagerDataLoaderDeviceController;
  exposed: GarbageManagementManagerDataLoaderIasExposedController;

  constructor(that: GarbageManagementManagerComponent) {
    this.station = new GarbageManagementManagerDataLoaderStationController(
      that
    );
    this.device = new GarbageManagementManagerDataLoaderDeviceController(that);
    this.exposed = new GarbageManagementManagerDataLoaderIasExposedController(
      that
    );
  }
}
