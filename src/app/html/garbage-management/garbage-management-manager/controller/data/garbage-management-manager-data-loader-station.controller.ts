import { GarbageStationViewModel } from '../../../../../common/view-model/garbage-station.view-model';
import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';

export class GarbageManagementManagerDataLoaderStationController {
  constructor(private business: GarbageManagementManagerBusiness) {}

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
