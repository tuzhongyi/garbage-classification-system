import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';

export class GarbageManagementManagerDataLoaderIasRecordController {
  constructor(private business: GarbageManagementManagerBusiness) {}

  async load() {
    return this.business.ias.record();
  }
}
