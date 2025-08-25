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
  @Input() option = GarbageManagementChartRecordEventEChartOption;
  @Input() title = '垃圾落地';
  @Input() unit = '起';
  @Input() datas: number[] = [40, 60, 55, 50, 55, 65, 45];
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

  count = 0;
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

  private load() {
    this.chart.get().then((chart) => {
      (this.option.xAxis as any).data = [...this.xAxis];
      (this.option.series as any)[0].data = [...this.datas];
      this.count = this.datas.reduce((a, b) => a + b, 0);
      chart.setOption(this.option);
    });
  }
}
