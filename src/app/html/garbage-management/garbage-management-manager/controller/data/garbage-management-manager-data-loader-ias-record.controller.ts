import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';

export class GarbageManagementManagerDataLoaderIasRecordController {
  constructor(private business: GarbageManagementManagerBusiness) {}

  async load() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return this.business.ias.record(date);
  }
}
