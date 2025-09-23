import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  IGarbageManagementChartColor,
  IGarbageManagementChartData,
} from '../../garbage-management-chart-line/garbage-management-chart-line.model';
import { GarbageManagementChartAbstract } from '../../garbage-management-chart.abstract';
import { GarbageManagementChartRecordEventEChartOption } from './garbage-management-chart-record-event-echart.option';

@Component({
  imports: [CommonModule],
  selector: 'howell-garbage-management-chart-record-event',
  templateUrl: './garbage-management-chart-record-event.component.html',
  styleUrl: './garbage-management-chart-record-event.component.less',
  standalone: true,
})
export class GarbageManagementChartRecordEventComponent
  extends GarbageManagementChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() option = Object.assign(
    {},
    GarbageManagementChartRecordEventEChartOption
  );
  @Input() data?: IGarbageManagementChartData;
  @Input() interval = 0;
  @Input() xAxis: string[] = [
    '00:00',
    '04:00',
    '08:00',
    '12:00',
    '16:00',
    '20:00',
    '24:00',
  ];

  constructor() {
    super();
  }
  @ViewChild('chart') element?: ElementRef;

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.view();
  }
  ngOnDestroy() {
    this.destroy();
  }

  private set = {
    color: (color: IGarbageManagementChartColor) => {
      let sery = (this.option.series as any)[0];
      if (color.area) {
        sery.areaStyle.color = color.area;
      }
      if (color.line) {
        sery.lineStyle.color = color.line;
      }
      if (color.point) {
        if (color.point.background) {
          sery.markPoint.itemStyle.color = color.point.background;
        }
        if (color.point.border) {
          sery.markPoint.itemStyle.borderColor = color.point.border;
        }
      }
    },
    interval: (value: number) => {
      (this.option.xAxis as any).axisLabel.interval = value;
    },
  };

  private load() {
    this.chart.get().then((chart) => {
      if (!this.data) return;
      (this.option.xAxis as any).data = [...this.xAxis];
      let sery = (this.option.series as any)[0];
      sery.data = [...this.data.datas.map((x) => x.value)];
      if (this.data.color) {
        this.set.color(this.data.color);
      }
      this.set.interval(this.interval);
      chart.setOption(this.option);
    });
  }
}
