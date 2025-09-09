import { Injectable } from '@angular/core';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { DeviceRoutesStatistic } from '../../../../common/network/model/ias/device-routes-statistic.model';
import { GetMobileDeviceRoutesStatisticParams } from '../../../../common/network/request/ias/device/route/ias-device-route-request.params';
import { IasRequestService } from '../../../../common/network/request/ias/ias-request.service';
import { DateTimeTool } from '../../../../common/tools/date-time-tool/datetime.tool';
import { Language } from '../../../../common/tools/language';
import { DeviceRoutesStatisticItem } from './garbage-management-list-ias-device-route.model';

@Injectable()
export class GarbageManagementListIasDeviceRouteBusiness {
  constructor(private service: IasRequestService) {}

  load(unit: TimeUnit) {
    return new Promise<DeviceRoutesStatisticItem[]>((resolve) => {
      this.data.device().then((devices) => {
        if (devices.length === 0) {
          resolve([]);
          return;
        }
        let promises = devices.map((device) => {
          return this.data.route(device.Id, unit);
        });
        Promise.all(promises).then((route) => {
          let items = route.map((x) => this.convert(x));
          resolve(items);
        });
      });
    });
  }

  convert(data: DeviceRoutesStatistic) {
    let item: DeviceRoutesStatisticItem = {
      name: data.Name,
      moving: Language.Time(data.MovingSeconds) ?? '0分钟',
      stay: Language.Time(data.StaySeconds) ?? '0分钟',
      totalmeters: Language.meter(data.TotalMeters),
    };
    return item;
  }

  data = {
    device: () => {
      return this.service.device.all().catch(() => {
        return [];
      });
    },
    route: (id: string, unit: TimeUnit) => {
      let duration = DateTimeTool.TimeUnit(unit, new Date());
      let params = new GetMobileDeviceRoutesStatisticParams();
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.MobileDeviceId = id;
      return this.service.device.route.statistic(params);
    },
  };
}
