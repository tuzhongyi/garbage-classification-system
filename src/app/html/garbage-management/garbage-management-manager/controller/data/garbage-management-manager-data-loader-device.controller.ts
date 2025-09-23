import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';

export class GarbageManagementManagerDataLoaderDeviceController {
  constructor(private business: GarbageManagementManagerBusiness) {}

  async load() {
    return this.business.ias.device();
  }
}
