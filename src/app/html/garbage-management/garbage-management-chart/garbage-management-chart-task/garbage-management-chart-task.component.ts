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
import 'echarts-liquidfill';
import { GarbageManagementChartAbstract } from '../garbage-management-chart.abstract';
import { GarbageManagementChartTaskEChartOption } from './garbage-management-chart-task-echart.option';
import { GarbageManagementChartTaskBusiness } from './garbage-management-chart-task.business';
import { GarbageManagementChartTaskData } from './garbage-management-chart-task.model';

@Component({
  selector: 'howell-garbage-management-chart-task',
  templateUrl: './garbage-management-chart-task.component.html',
  styleUrl: './garbage-management-chart-task.component.less',
  providers: [GarbageManagementChartTaskBusiness],
})
export class GarbageManagementChartTaskComponent
  extends GarbageManagementChartAbstract
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() option: echarts.EChartsOption =
    GarbageManagementChartTaskEChartOption;

  constructor(private business: GarbageManagementChartTaskBusiness) {
    super();
  }

  @ViewChild('chart') element?: ElementRef;
  date = new Date();
  data = new GarbageManagementChartTaskData();

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
      this.business.load(this.date).then((x) => {
        this.data = x;

        let sery = (this.option.series as any)[0];
        sery.data[0].value = this.data.ratio.handle / 100;
        sery.data[1].value = this.data.ratio.timein / 100;
        chart.setOption(this.option);
      });
    });
  }
}
