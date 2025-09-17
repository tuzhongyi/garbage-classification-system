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
import { ChartType } from '../../../../../common/enum/chart-type.enum copy';
import { TimeUnit } from '../../../../../common/enum/time-unit.enum';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { GarbageManagementChartAbstract } from '../../garbage-management-chart.abstract';
import { GarbageManagementChartRecordEventEChartOption } from '../component/garbage-management-chart-record-event-echart.option';
import {
  IGarbageManagementChartRecordEventColor,
  IGarbageManagementChartRecordEventData,
} from '../garbage-management-chart-record-event.model';

@Component({
  selector: 'howell-garbage-management-chart-record-event-multiple',
  imports: [CommonModule],
  templateUrl:
    './garbage-management-chart-record-event-multiple.component.html',
  styleUrl: './garbage-management-chart-record-event-multiple.component.less',
})
export class GarbageManagementChartRecordEventMultipleComponent
  extends GarbageManagementChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() datas: IGarbageManagementChartRecordEventData[] = [];
  @Input() unit = TimeUnit.Day;
  @Input() type = ChartType.bar;
  @Input() xAxis: string[] = [
    '00:00',
    '04:00',
    '08:00',
    '12:00',
    '16:00',
    '20:00',
    '24:00',
  ];
  @Input() option = Object.assign(
    {},
    GarbageManagementChartRecordEventEChartOption
  );
  private sery = (this.option.series as any)[0];

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
    data: (datas: IGarbageManagementChartRecordEventData[]) => {
      this.option.series = [];
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        let sery: any = ObjectTool.clone(this.sery);
        sery.type = this.type;
        sery.name = data.Name;
        sery.data = [...data.datas.map((x) => x.value)];
        switch (this.type) {
          case ChartType.line:
            if (data.color) {
              this.set.color.line(sery, data.color);
            }
            break;
          case ChartType.bar:
            if (data.color) {
              this.set.color.bar(sery, data.color);
            }
            sery.markPoint = {};
            break;
          default:
            break;
        }

        this.option.series.push(sery);
      }
    },
    color: {
      line: (sery: any, color: IGarbageManagementChartRecordEventColor) => {
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
      bar: (sery: any, color: IGarbageManagementChartRecordEventColor) => {
        if (color.area) {
          if (!sery.itemStyle) {
            sery.itemStyle = {};
          }
          sery.itemStyle.color = color.area;
        }
      },
    },
    unit: (unit: TimeUnit) => {
      switch (unit) {
        case TimeUnit.Day:
          (this.option.xAxis as any).axisLabel.interval = 3;
          break;
        case TimeUnit.Month:
          (this.option.xAxis as any).axisLabel.interval = 0;
          break;

        default:
          (this.option.xAxis as any).axisLabel.interval = 0;
          break;
      }
    },
  };

  private load() {
    this.chart.get().then((chart) => {
      (this.option.xAxis as any).data = [...this.xAxis];
      this.set.data(this.datas);
      this.set.unit(this.unit);
      this.option.tooltip = {
        trigger: 'axis',
        axisPointer: {
          show: false,
        },
      };
      this.option.legend = {
        data: this.datas.map((x) => x.Name),
        right: 0,
        top: 0,
        orient: 'vertical',
        textStyle: {
          color: '#bdd3ff',
        },
      };
      chart.setOption(this.option);
    });
  }
}
