import { Injectable } from '@angular/core';
import { DeviceRoutesStatistic } from '../../../../../common/network/model/ias/device-routes-statistic.model';
import { GetMobileDeviceRoutesStatisticParams } from '../../../../../common/network/request/ias/device/route/ias-device-route-request.params';
import { IasRequestService } from '../../../../../common/network/request/ias/ias-request.service';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { Language } from '../../../../../common/tools/language';
import { GarbageManagementStreetDeviceRouteArgs } from '../garbage-management-street-device-route.model';
import { IGarbageManagementStreetDeviceRouteInfo } from './garbage-management-street-device-route-info.model';

@Injectable()
export class GarbageManagementStreetDeviceRouteInfoBusiness {
  constructor(private service: IasRequestService) {}

  async load(args: GarbageManagementStreetDeviceRouteArgs) {
    let data = await this.data.load(args);
    let model = this.convert(data);
    return model;
  }

  private convert(data: DeviceRoutesStatistic) {
    let info: IGarbageManagementStreetDeviceRouteInfo = {
      TotalMeters: `${(data.TotalMeters / 1000).toFixed(2)}`,
      AvgSpeed: `${data.AvgSpeed.toFixed(2)}`,
      FastestSpeed: `${data.FastestSpeed.toFixed(2)}`,
      MovingTime: `${Language.Time(data.MovingSeconds)}`,
      StayTime: `${Language.Time(data.StaySeconds)}`,
      CoveragePercent: `${(data.CoveragePercent ?? 0).toFixed(2)}`,
    };
    return info;
  }

  private data = {
    load: async (args: GarbageManagementStreetDeviceRouteArgs) => {
      let duration = DateTimeTool.TimeUnit(args.unit, args.date);
      let params = new GetMobileDeviceRoutesStatisticParams();
      params.MobileDeviceId = args.deviceId;
      params.BeginTime = duration.begin;
      params.EndTime = duration.end;
      params.MinSpeed = 3;
      return this.service.device.route.statistic(params).catch((e) => {
        let statistic = new DeviceRoutesStatistic();
        statistic.BeginTime = duration.begin;
        statistic.EndTime = duration.end;
        statistic.AvgSpeed = 0;
        statistic.FastestSpeed = 0;
        statistic.MovingSeconds = 0;
        statistic.StaySeconds = 0;
        statistic.TotalMeters = 0;
        statistic.CoveragePercent = 0;
        statistic.DailyMeters = 0;
        return statistic;
      });
    },
  };
}
