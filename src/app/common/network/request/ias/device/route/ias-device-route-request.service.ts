import { DeviceRoutesStatistic } from '../../../../model/ias/device-routes-statistic.model';
import { IasGpsItem } from '../../../../model/ias/ias-gps-item.model';
import { IasUrl } from '../../../../url/ias/ias.url';
import { HowellBaseRequestService } from '../../../base-request-howell.service';
import {
  GetIasDeviceRoutesParams,
  GetMobileDeviceRoutesStatisticParams,
} from './ias-device-route-request.params';

export class IasDeviceRouteRequestService {
  constructor(private basic: HowellBaseRequestService) {}

  list(params = new GetIasDeviceRoutesParams()) {
    let url = IasUrl.device.route.list();
    return this.basic.paged<IasGpsItem>(url, IasGpsItem, params);
  }

  statistic(params = new GetMobileDeviceRoutesStatisticParams()) {
    let url = IasUrl.device.route.statistic();
    return this.basic.post<DeviceRoutesStatistic>(
      url,
      DeviceRoutesStatistic,
      params
    );
  }
}
