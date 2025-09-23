import { Injectable } from '@angular/core';
import { DeviceRoutesStatistic } from '../../../../../../common/network/model/ias/device-routes-statistic.model';
import { GetMobileDeviceRoutesStatisticParams } from '../../../../../../common/network/request/ias/device/route/ias-device-route-request.params';
import { IasRequestService } from '../../../../../../common/network/request/ias/ias-request.service';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Language } from '../../../../../../common/tools/language';
import { GarbageManagementRecordEventIasStatisticRouteArgs } from '../garbage-management-record-event-ias-statistic-route.model';
import { IGarbageManagementRecordEventIasStatisticRouteInfo } from './garbage-management-record-event-ias-statistic-route-info.model';

@Injectable()
export class GarbageManagementRecordEventIasStatisticRouteInfoBusiness {
  constructor(private service: IasRequestService) {}

  async load(args: GarbageManagementRecordEventIasStatisticRouteArgs) {
    let data = await this.data.load(args);
    let model = this.convert(data);
    return model;
  }

  private convert(data: DeviceRoutesStatistic) {
    let info: IGarbageManagementRecordEventIasStatisticRouteInfo = {
      TotalMeters: `${(data.TotalMeters / 1000).toFixed(2)}`,
      AvgSpeed: `${data.AvgSpeed.toFixed(2)}`,
      FastestSpeed: `${data.FastestSpeed.toFixed(2)}`,
      MovingTime: `${Language.Time(data.MovingSeconds)}`,
      StayTime: `${Language.Time(data.StaySeconds)}`,
    };
    return info;
  }

  private data = {
    load: async (args: GarbageManagementRecordEventIasStatisticRouteArgs) => {
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
        return statistic;
      });
    },
  };
}
