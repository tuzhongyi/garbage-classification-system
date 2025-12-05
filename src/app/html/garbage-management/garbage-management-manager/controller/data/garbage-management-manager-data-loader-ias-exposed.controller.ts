import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';

export class GarbageManagementManagerDataLoaderIasExposedController {
  constructor(private that: GarbageManagementManagerComponent) {}
  private get business() {
    return this.that.business;
  }
  async load(date: Date) {
    return this.business.ias.record(date);
  }
}
