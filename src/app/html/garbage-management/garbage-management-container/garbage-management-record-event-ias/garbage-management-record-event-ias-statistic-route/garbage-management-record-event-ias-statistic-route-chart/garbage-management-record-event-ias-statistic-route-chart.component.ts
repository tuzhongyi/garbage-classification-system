import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

import { ChartType } from '../../../../../../common/enum/chart-type.enum copy';
import { DeviceRoutesStatistic } from '../../../../../../common/network/model/ias/device-routes-statistic.model';
import { ChartTool } from '../../../../../../common/tools/chart-tool/chart.tool';
import { IGarbageManagementChartData } from '../../../../garbage-management-chart/garbage-management-chart-line/garbage-management-chart-line.model';
import { GarbageManagementChartMultipleComponent } from '../../../../garbage-management-chart/garbage-management-chart-multiple/garbage-management-chart-multiple.component';
import {
  GarbageManagementRecordEventIasStatisticRouteArgs,
  GarbageManagementRecordEventIasStatisticRouteType,
} from '../garbage-management-record-event-ias-statistic-route.model';
import { GarbageManagementRecordEventIasStatisticRouteChartBusiness } from './business/garbage-management-record-event-ias-statistic-route-chart.business';

@Component({
  selector: 'howell-garbage-management-record-event-ias-statistic-route-chart',
  imports: [CommonModule, GarbageManagementChartMultipleComponent],
  templateUrl:
    './garbage-management-record-event-ias-statistic-route-chart.component.html',
  styleUrl:
    './garbage-management-record-event-ias-statistic-route-chart.component.less',
  providers: [GarbageManagementRecordEventIasStatisticRouteChartBusiness],
})
export class GarbageManagementRecordEventIasStatisticRouteChartComponent
  implements OnChanges
{
  @Input() charttype = ChartType.line;
  @Input() statistictype =
    GarbageManagementRecordEventIasStatisticRouteType.Meter;
  @Input('datas') source: DeviceRoutesStatistic[] = [];
  @Input() args = new GarbageManagementRecordEventIasStatisticRouteArgs();

  constructor(
    private business: GarbageManagementRecordEventIasStatisticRouteChartBusiness
  ) {}

  datas: IGarbageManagementChartData[] = [];
  xAxis = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];

  private data = {
    load: (
      datas: DeviceRoutesStatistic[],
      args: GarbageManagementRecordEventIasStatisticRouteArgs,
      type: GarbageManagementRecordEventIasStatisticRouteType
    ) => {
      this.business.load(datas, type).then((x) => {
        this.datas = x;
        this.xAxis = ChartTool.axis.x.unit(args.unit, {
          end: true,
          date: args.date,
          first: 1,
        });
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
