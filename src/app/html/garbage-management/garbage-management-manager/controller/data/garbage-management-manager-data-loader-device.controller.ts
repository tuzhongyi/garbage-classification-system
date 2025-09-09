import { IasDevice } from '../../../../../common/network/model/ias/ias-device.model';
import { GarbageManagementManagerBusiness } from '../../business/garbage-management-manager.business';

export class GarbageManagementManagerDataLoaderDeviceController {
  constructor(private business: GarbageManagementManagerBusiness) {}

  private loaded = false;
  private datas: IasDevice[] = [];

  async load() {
    if (this.loaded) {
      return this.datas;
    }
    this.datas = await this.business.device.load();
    this.loaded = true;
    return this.datas;
  }
}
