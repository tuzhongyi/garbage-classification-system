import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';

export class GarbageManagementManagerDataLoaderDeviceController {
  constructor(private that: GarbageManagementManagerComponent) {}

  private get business() {
    return this.that.business;
  }

  async load() {
    return this.business.ias.device();
  }
}
