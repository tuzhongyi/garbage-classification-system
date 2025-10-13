import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartTool } from '../../../../../../common/tools/chart-tool/chart.tool';
import { ColorTool } from '../../../../../../common/tools/color-tool/color.tool';
import { GarbageManagementChartLineComponent } from '../../../../garbage-management-chart/garbage-management-chart-line/garbage-management-chart-line.component';
import {
  IGarbageManagementChartData,
  ITimeData,
} from '../../../../garbage-management-chart/garbage-management-chart-line/garbage-management-chart-line.model';
import { GarbageManagementRecordEventDetailsDivisionBusiness } from '../../../garbage-management-record-event-business/garbage-management-record-event-details-division.business';
import { GarbageManagementRecordEventDetailsStationBusiness } from '../../../garbage-management-record-event-business/garbage-management-record-event-details-station.business';
import { GarbageManagementRecordEventDetailsConverter } from '../../../garbage-management-record-event-business/garbage-management-record-event-details.converter';
import { GarbageManagementRecordEventIllegalDumpStatisticDetailsContainerBusiness } from './garbage-management-record-event-illegal-dump-statistic-details-container.business';
import { GarbageManagementRecordEventIllegalDumpStatisticDetailsArgs } from './garbage-management-record-event-illegal-dump-statistic-details-container.model';

@Component({
  selector:
    'howell-garbage-management-record-event-illegal-dump-statistic-details-container',
  imports: [CommonModule, GarbageManagementChartLineComponent],
  templateUrl:
    './garbage-management-record-event-illegal-dump-statistic-details-container.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-dump-statistic-details-container.component.less',
  providers: [
    GarbageManagementRecordEventDetailsConverter,
    GarbageManagementRecordEventDetailsDivisionBusiness,
    GarbageManagementRecordEventDetailsStationBusiness,
    GarbageManagementRecordEventIllegalDumpStatisticDetailsContainerBusiness,
  ],
})
export class GarbageManagementRecordEventIllegalDumpStatisticDetailsContainerComponent
  implements OnInit, OnDestroy
{
  @Input() args =
    new GarbageManagementRecordEventIllegalDumpStatisticDetailsArgs();
  @Input()
  load?: EventEmitter<GarbageManagementRecordEventIllegalDumpStatisticDetailsArgs>;
  constructor(
    private business: GarbageManagementRecordEventIllegalDumpStatisticDetailsContainerBusiness
  ) {}
  chart = {
    data: undefined as IGarbageManagementChartData | undefined,
    load: new EventEmitter<void>(),
    color: ColorTool.chart.line.record.illegaldump,
    interval: 0,
    xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
  };

  private subscription = new Subscription();
  private regist() {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this.args = x;
        this.data.load(this.args);
      });
      this.subscription.add(sub);
    }
  }
  ngOnInit(): void {
    this.regist();
    this.data.load(this.args);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private data = {
    load: (
      args: GarbageManagementRecordEventIllegalDumpStatisticDetailsArgs
    ) => {
      this.business.load(args).then((datas) => {
        let data = datas[0];
        this.chart.data = {
          Id: '',
          Name: '',
          color: this.chart.color,
          datas: data.map<ITimeData<number>>((x) => {
            return { time: x.time, value: x.value ?? 0 };
          }),
        };

        this.chart.xAxis = ChartTool.axis.x.unit(args.unit, {
          end: true,
          date: args.date,
          first: 1,
        });
      });
    },
  };
}
