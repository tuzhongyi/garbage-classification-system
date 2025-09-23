import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';
import { GarbageManagementManagerDataLoaderDeviceController } from './garbage-management-manager-data-loader-device.controller';
import { GarbageManagementManagerDataLoaderIasRecordController } from './garbage-management-manager-data-loader-ias-record.controller';
import { GarbageManagementManagerDataLoaderStationController } from './garbage-management-manager-data-loader-station.controller';

export class GarbageManagementManagerDataLoaderController {
  constructor(business: GarbageManagementManagerBusiness) {
    this.station = new GarbageManagementManagerDataLoaderStationController(
      business
    );
    this.device = new GarbageManagementManagerDataLoaderDeviceController(
      business
    );
    this.record = new GarbageManagementManagerDataLoaderIasRecordController(
      business
    );
  }

  station: GarbageManagementManagerDataLoaderStationController;
  device: GarbageManagementManagerDataLoaderDeviceController;
  record: GarbageManagementManagerDataLoaderIasRecordController;
}
