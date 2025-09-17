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
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { GarbageManagementChartAbstract } from '../../garbage-management-chart.abstract';
import {
  IGarbageManagementChartRecordEventColor,
  IGarbageManagementChartRecordEventData,
} from '../garbage-management-chart-record-event.model';
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
  @Input() data?: IGarbageManagementChartRecordEventData;
  @Input() unit = TimeUnit.Day;
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
    color: (color: IGarbageManagementChartRecordEventColor) => {
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
    unit: (unit: TimeUnit) => {
      switch (unit) {
        case TimeUnit.Day:
          (this.option.xAxis as any).axisLabel.interval = 3;
          break;
        case TimeUnit.Month:
          (this.option.xAxis as any).axisLabel.interval = 1;
          break;

        default:
          (this.option.xAxis as any).axisLabel.interval = 0;
          break;
      }
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
      this.set.unit(this.unit);
      chart.setOption(this.option);
    });
  }
}
