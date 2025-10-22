import { Injectable } from '@angular/core';
import { ConfigRequestService } from '../../../../common/network/request/config/config-request.service';
import { GarbageManagementManagerIasBusiness } from './garbage-management-manager-ias.business';
import { GarbageManagementManagerStationBusiness } from './garbage-management-manager-station.business';

@Injectable()
export class GarbageManagementManagerBusiness {
  constructor(
    public station: GarbageManagementManagerStationBusiness,
    public ias: GarbageManagementManagerIasBusiness,
    private config: ConfigRequestService
  ) {}

  async version() {
    let data = await this.config.version();
    return data.version;
  }
}
