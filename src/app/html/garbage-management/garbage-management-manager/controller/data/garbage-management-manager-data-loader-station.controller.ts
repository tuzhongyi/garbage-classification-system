import { GarbageStationViewModel } from '../../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementManagerComponent } from '../../garbage-management-manager.component';

export class GarbageManagementManagerDataLoaderStationController {
  constructor(private that: GarbageManagementManagerComponent) {}
  private get business() {
    return this.that.business;
  }
  private loaded = false;

  private datas: GarbageStationViewModel[] = [];

  async load() {
    if (this.loaded) {
      return this.datas;
    }
    this.datas = await this.business.station.load();
    this.loaded = true;
    return this.datas;
  }
}
