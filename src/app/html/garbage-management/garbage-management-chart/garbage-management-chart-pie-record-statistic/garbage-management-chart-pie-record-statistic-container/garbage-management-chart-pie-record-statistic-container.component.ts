import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { ColorTool } from '../../../../../common/tools/color-tool/color.tool';
import { ChartItem } from '../../garbage-management-chart.abstract';
import { GarbageManagementChartPieRecordStatisticComponent } from '../component/garbage-management-chart-pie-record-statistic.component';
import { GarbageManagementChartPieRecordStatisticContainerBusiness } from './business/garbage-management-chart-pie-record-statistic-container.business';
import { GarbageManagementChartPieRecordStatisticContainerArgs } from './business/garbage-management-chart-pie-record-statistic-container.model';
import { GarbageManagementChartPieRecordStatisticContainerService } from './business/service/garbage-management-chart-pie-record-statistic-container.service';

@Component({
  selector: 'howell-garbage-management-chart-pie-record-statistic-container',
  imports: [CommonModule, GarbageManagementChartPieRecordStatisticComponent],
  templateUrl:
    './garbage-management-chart-pie-record-statistic-container.component.html',
  styleUrl:
    './garbage-management-chart-pie-record-statistic-container.component.less',
  providers: [
    GarbageManagementChartPieRecordStatisticContainerService,
    GarbageManagementChartPieRecordStatisticContainerBusiness,
  ],
})
export class GarbageManagementChartPieRecordStatisticContainerComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  constructor(
    private business: GarbageManagementChartPieRecordStatisticContainerBusiness
  ) {}
  private subscription = new Subscription();
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load();
      });
      this.subscription.add(sub);
    }
  }
  ngOnInit(): void {
    this.regist();
    this.init();
    this.load();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  args = new GarbageManagementChartPieRecordStatisticContainerArgs();
  datas: ChartItem[] = [];
  count = 0;
  colors = new Map();

  private init() {
    this.colors.set(EventType.MixedInto, ColorTool.station.state.mixedinto);
    this.colors.set(EventType.GarbageFull, ColorTool.station.state.garbagefull);
    this.colors.set(EventType.IllegalDrop, ColorTool.station.state.illegaldrop);
    this.colors.set(EventType.GarbageDrop, ColorTool.station.state.garbagedrop);
    this.colors.set(
      EventType.IllegalVehicle,
      ColorTool.station.state.illegalvehicle
    );
    this.colors.set(0, ColorTool.station.state.garbageexposed);
  }

  private load() {
    this.business.load(this.args).then((datas) => {
      this.datas = datas;
      this.count = datas.reduce((pre, cur) => pre + cur.value, 0);
    });
  }
}
