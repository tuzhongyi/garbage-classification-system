import { ServiceTool } from '../../../../tools/service-tool/service.tool';
import { IasDevice } from '../../../model/ias/ias-device.model';
import { IasUrl } from '../../../url/ias/ias.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetIasDevicesParams } from './ias-device-request.params';
import { IasDeviceRouteRequestService } from './route/ias-device-route-request.service';

export class IasDeviceRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = this.basic.type(IasDevice);
  }
  private type: HowellBaseTypeRequestService<IasDevice>;

  list(params: GetIasDevicesParams = new GetIasDevicesParams()) {
    let url = IasUrl.device.list();
    return this.type.paged(url, params);
  }
  get(id: string): Promise<IasDevice> {
    let url = IasUrl.device.item(id);
    return this.type.get(url);
  }

  all(params: GetIasDevicesParams = new GetIasDevicesParams()) {
    return ServiceTool.all((_params) => {
      return this.list(_params);
    }, params);
  }

  private _route?: IasDeviceRouteRequestService;
  public get route(): IasDeviceRouteRequestService {
    if (!this._route) {
      this._route = new IasDeviceRouteRequestService(this.basic);
    }
    return this._route;
  }
}
