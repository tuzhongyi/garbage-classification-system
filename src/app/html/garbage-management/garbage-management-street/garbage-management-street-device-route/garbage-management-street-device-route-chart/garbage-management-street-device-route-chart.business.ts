import { Injectable } from '@angular/core';
import { DeviceRoutesStatistic } from '../../../../../common/network/model/ias/device-routes-statistic.model';
import { ColorTool } from '../../../../../common/tools/color-tool/color.tool';
import { Language } from '../../../../../common/tools/language';
import { IGarbageManagementChartData } from '../../../garbage-management-chart/garbage-management-chart-line/garbage-management-chart-line.model';
import { GarbageManagementStreetDeviceRouteType } from '../garbage-management-street-device-route.model';

@Injectable()
export class GarbageManagementStreetDeviceRouteChartBusiness {
  async load(
    datas: DeviceRoutesStatistic[],
    type: GarbageManagementStreetDeviceRouteType
  ) {
    switch (type) {
      case GarbageManagementStreetDeviceRouteType.Meter:
        return this.convert.meter(datas);
      case GarbageManagementStreetDeviceRouteType.Speed:
        return this.convert.speed(datas);
      case GarbageManagementStreetDeviceRouteType.Time:
        return this.convert.time(datas);
      default:
        return [];
    }
  }

  private convert = {
    meter: (datas: DeviceRoutesStatistic[]) => {
      let data: IGarbageManagementChartData = {
        Id: 'meter',
        Name: '总里程',
        unit: '公里',
        color: ColorTool.chart.line.get(0, 246, 255),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: parseFloat((x.TotalMeters / 1000).toFixed(2)),
            time: x.BeginTime,
          };
        }),
      };
      return [data];
    },
    speed: (datas: DeviceRoutesStatistic[]) => {
      let fastest: IGarbageManagementChartData = {
        Id: 'FastestSpeed',
        Name: '最高时速',
        unit: '公里/小时',
        color: ColorTool.chart.line.get(255, 255, 0),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: parseFloat(x.FastestSpeed.toFixed(2)),
            time: x.BeginTime,
          };
        }),
      };
      let avg: IGarbageManagementChartData = {
        Id: 'AvgSpeed',
        Name: '平均时速',
        unit: '公里/小时',
        color: ColorTool.chart.line.get(0, 246, 255),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: parseFloat(x.AvgSpeed.toFixed(2)),

            time: x.BeginTime,
          };
        }),
      };
      return [avg, fastest];
    },
    time: (datas: DeviceRoutesStatistic[]) => {
      let move: IGarbageManagementChartData = {
        Id: 'MovingSeconds',
        Name: '行驶时长',
        unit: '秒',
        color: ColorTool.chart.line.get(0, 246, 255),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: x.MovingSeconds,
            time: x.BeginTime,
          };
        }),
      };
      move.format = (value: number) => {
        return `${Language.Time(value, 'second')}`;
      };
      let stay: IGarbageManagementChartData = {
        Id: 'StaySeconds',
        Name: '停留时长',
        unit: '秒',
        color: ColorTool.chart.line.get(255, 255, 0),
        datas: datas.map((x, i) => {
          return {
            index: i,
            value: x.StaySeconds,

            time: x.BeginTime,
          };
        }),
      };
      stay.format = (value: number) => {
        return `${Language.Time(value, 'second')}`;
      };
      return [move, stay];
    },
  };
}
