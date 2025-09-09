import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ChartItem,
  GarbageManagementChartAbstract,
} from '../../garbage-management-chart.abstract';
import { GarbageManagementChartPieRecordStatisticOption } from './garbage-management-chart-pie-record-statistic.option';

@Component({
  selector: 'howell-garbage-management-chart-pie-record-statistic',
  imports: [],
  templateUrl: './garbage-management-chart-pie-record-statistic.component.html',
  styleUrl: './garbage-management-chart-pie-record-statistic.component.less',
})
export class GarbageManagementChartPieRecordStatisticComponent
  extends GarbageManagementChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() datas: ChartItem[] = [];
  @Input() option = GarbageManagementChartPieRecordStatisticOption;
  constructor() {
    super();
  }
  @ViewChild('chart')
  element?: ElementRef;
  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
  }
  private change = {
    datas: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.datas);
      }
    },
  };

  ngAfterViewInit(): void {
    this.view();
  }
  ngOnDestroy(): void {
    this.destroy();
  }

  private set(datas: ChartItem[]) {
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];

      let index = this.option.series[0].data.findIndex(
        (x: ChartItem) => x.id === item.id
      );
      if (index >= 0) {
        this.option.series[0].data[index] = item;
        this.option.series[1].data[index] = item;
      }
    }
  }

  private load(data: ChartItem[]) {
    this.chart.get().then((chart) => {
      this.set(data);
      chart.setOption(this.option);
    });
  }
}
