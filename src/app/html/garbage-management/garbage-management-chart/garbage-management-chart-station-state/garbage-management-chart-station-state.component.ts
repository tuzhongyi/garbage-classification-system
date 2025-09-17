import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';
import { Subscription } from 'rxjs';
import { GarbageManagementChartAbstract } from '../garbage-management-chart.abstract';
import { GarbageManagementChartStationStateBusiness } from './business/garbage-management-chart-station-state.business';
import { GarbageManagementChartStationStateEChartOption } from './garbage-management-chart-station-state-echart.option';
import { GarbageManagementChartStationStateData } from './garbage-management-chart-station-state.model';

@Component({
  selector: 'howell-garbage-management-chart-station-state',
  imports: [],
  templateUrl: './garbage-management-chart-station-state.component.html',
  styleUrl: './garbage-management-chart-station-state.component.less',
  providers: [GarbageManagementChartStationStateBusiness],
})
export class GarbageManagementChartStationStateComponent
  extends GarbageManagementChartAbstract
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() option: echarts.EChartsOption =
    GarbageManagementChartStationStateEChartOption;

  constructor(private business: GarbageManagementChartStationStateBusiness) {
    super();
  }

  @ViewChild('chart') element?: ElementRef;
  data = new GarbageManagementChartStationStateData();
  private subscription = new Subscription();
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe(() => {
        this.load();
      });
      this.subscription.add(sub);
    }
  }

  ngOnInit(): void {
    this.regist();
    this.load();
    this.init();
  }
  ngAfterViewInit() {
    this.view();
  }

  ngOnDestroy() {
    this.destroy();
    this.subscription.unsubscribe();
  }

  private load() {
    this.chart.get().then((chart) => {
      this.business.load().then((x) => {
        this.data = x;
        let series = this.option.series as any;
        for (let i = 0; i < series.length; i++) {
          const sery = series[i];
          sery.data[0].value = this.data.normal;
          sery.data[1].value = this.data.error;
          sery.data[2].value = this.data.full;
          sery.data[3].value = this.data.stayed;
        }
        chart.setOption(this.option);
      });
    });
  }
}
