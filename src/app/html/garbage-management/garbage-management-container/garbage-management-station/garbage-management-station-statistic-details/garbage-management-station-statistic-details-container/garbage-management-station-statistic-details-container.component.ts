import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartType } from '../../../../../../common/enum/chart-type.enum copy';
import { ChartTool } from '../../../../../../common/tools/chart-tool/chart.tool';
import { GarbageManagementChartRecordEventMultipleComponent } from '../../../../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event-multiple/garbage-management-chart-record-event-multiple.component';
import { IGarbageManagementChartRecordEventData } from '../../../../garbage-management-chart/garbage-management-chart-record-event/garbage-management-chart-record-event.model';
import { GarbageManagementStationStatisticDetailsArgs } from '../garbage-management-station-statistic-details.model';
import { GarbageManagementStationStatisticDetailsContainerBusiness } from './business/garbage-management-station-statistic-details-container.business';

@Component({
  selector: 'howell-garbage-management-station-statistic-details-container',
  imports: [CommonModule, GarbageManagementChartRecordEventMultipleComponent],
  templateUrl:
    './garbage-management-station-statistic-details-container.component.html',
  styleUrl:
    './garbage-management-station-statistic-details-container.component.less',
  providers: [GarbageManagementStationStatisticDetailsContainerBusiness],
})
export class GarbageManagementStationStatisticDetailsContainerComponent
  implements OnInit, OnDestroy
{
  @Input() args = new GarbageManagementStationStatisticDetailsArgs();
  @Input() type = ChartType.bar;
  @Input('load')
  _load?: EventEmitter<GarbageManagementStationStatisticDetailsArgs>;

  constructor(
    private business: GarbageManagementStationStatisticDetailsContainerBusiness
  ) {}

  datas: IGarbageManagementChartRecordEventData[] = [];
  xAxis = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'];
  private subscription = new Subscription();
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.args = x;
        this.load(this.args);
      });
      this.subscription.add(sub);
    }
  }

  private load(args: GarbageManagementStationStatisticDetailsArgs) {
    if (args.stationIds.length == 0) return;
    this.business.load(args).then((x) => {
      this.datas = x;
      this.xAxis = ChartTool.axis.x.unit(args.unit, {
        end: true,
        date: args.date,
        first: 1,
      });
    });
  }

  ngOnInit(): void {
    this.regist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
