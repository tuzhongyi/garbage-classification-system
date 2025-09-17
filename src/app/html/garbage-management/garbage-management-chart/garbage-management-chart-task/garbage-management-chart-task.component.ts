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
import 'echarts-liquidfill';
import { Subscription } from 'rxjs';
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
  @Input('load') _load?: EventEmitter<void>;
  @Input() option: echarts.EChartsOption =
    GarbageManagementChartTaskEChartOption;

  constructor(private business: GarbageManagementChartTaskBusiness) {
    super();
  }

  @ViewChild('chart') element?: ElementRef;
  date = new Date();
  data = new GarbageManagementChartTaskData();
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
