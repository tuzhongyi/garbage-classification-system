import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';
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
  @Input() option: echarts.EChartsOption =
    GarbageManagementChartStationStateEChartOption;

  constructor(private business: GarbageManagementChartStationStateBusiness) {
    super();
  }

  @ViewChild('chart') element?: ElementRef;
  data = new GarbageManagementChartStationStateData();

  ngOnInit(): void {
    this.load();
    this.init();
  }
  ngAfterViewInit() {
    this.view();
  }

  ngOnDestroy() {
    this.destroy();
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
