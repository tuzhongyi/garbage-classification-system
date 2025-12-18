import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

import { ChartType } from '../../../../../common/enum/chart-type.enum';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { DeviceRoutesStatistic } from '../../../../../common/network/model/ias/device-routes-statistic.model';
import { ChartTool } from '../../../../../common/tools/chart-tool/chart.tool';
import { IGarbageManagementChartData } from '../../../garbage-management-chart/garbage-management-chart-line/garbage-management-chart-line.model';
import { GarbageManagementChartMultipleComponent } from '../../../garbage-management-chart/garbage-management-chart-multiple/garbage-management-chart-multiple.component';
import {
  GarbageManagementStreetDeviceRouteArgs,
  GarbageManagementStreetDeviceRouteType,
} from '../garbage-management-street-device-route.model';
import { GarbageManagementStreetDeviceRouteChartBusiness } from './garbage-management-street-device-route-chart.business';

@Component({
  selector: 'howell-garbage-management-street-device-route-chart',
  imports: [CommonModule, GarbageManagementChartMultipleComponent],
  templateUrl: './garbage-management-street-device-route-chart.component.html',
  styleUrl: './garbage-management-street-device-route-chart.component.less',
  providers: [GarbageManagementStreetDeviceRouteChartBusiness],
})
export class GarbageManagementStreetDeviceRouteChartComponent
  implements OnChanges
{
  @Input() charttype = ChartType.line;
  @Input() statistictype = GarbageManagementStreetDeviceRouteType.Meter;
  @Input('datas') source: DeviceRoutesStatistic[] = [];
  @Input() args = new GarbageManagementStreetDeviceRouteArgs();

  constructor(
    private business: GarbageManagementStreetDeviceRouteChartBusiness
  ) {}

  interval = 1;
  datas: IGarbageManagementChartData[] = [];
  xAxis = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];

  private data = {
    load: (
      datas: DeviceRoutesStatistic[],
      args: GarbageManagementStreetDeviceRouteArgs,
      type: GarbageManagementStreetDeviceRouteType
    ) => {
      this.business.load(datas, type).then((x) => {
        this.datas = x;
        this.xAxis = ChartTool.axis.x.unit(args.unit, {
          end: true,
          date: args.date,
          first: 1,
        });

        if (args.unit == TimeUnit.Week) {
          this.interval = 0;
        } else {
          this.interval = 1;
        }
      });
    },
  };
  private change = {
    source: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.data.load(this.source, this.args, this.statistictype);
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.source(changes['source']);
  }
}
