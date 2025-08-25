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
import { GarbageManagementChartStationCountItemEChartOption } from './garbage-management-chart-station-count-item-echart.option';
import { GarbageManagementChartStationCountItem } from './garbage-management-chart-station-count-item.model';
@Component({
  selector: 'howell-garbage-management-chart-station-count-item',
  imports: [CommonModule],
  templateUrl: './garbage-management-chart-station-count-item.component.html',
  styleUrl: './garbage-management-chart-station-count-item.component.less',
})
export class GarbageManagementChartStationCountItemComponent
  extends GarbageManagementChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() data = new GarbageManagementChartStationCountItem();
  @Input() option = GarbageManagementChartStationCountItemEChartOption;

  constructor() {
    super();
  }

  @ViewChild('chart') element?: ElementRef;

  ngOnInit(): void {
    this.load(this.data);
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.load(this.data);
  }

  ngAfterViewInit(): void {
    this.view();
  }
  ngOnDestroy(): void {
    this.destroy();
  }

  private set(data: GarbageManagementChartStationCountItem) {
    let value = 100;
    if (data.data.value > 0) {
      value = Math.round((data.data.value / data.data.count) * 100);
    }

    //sery.progress.itemStyle.color.colorStops[0].color = `rgba(${data.color.r},${data.color.g},${data.color.b},0.2)`;
    this.option.series[0].progress.itemStyle.color.colorStops[1].color = `rgba(${data.color.r},${data.color.g},${data.color.b},1)`;

    this.option.series[0].anchor.itemStyle.borderColor.colorStops[0].color = `rgba(${data.color.r},${data.color.g},${data.color.b},0.2)`;
    this.option.series[0].anchor.itemStyle.borderColor.colorStops[1].color = `rgba(${data.color.r},${data.color.g},${data.color.b},1)`;
    this.option.series[0].anchor.itemStyle.color.colorStops[0].color = `rgba(${data.color.r},${data.color.g},${data.color.b},0.8)`;

    this.option.series[0].detail.rich.value.color = `rgba(${data.color.r},${data.color.g},${data.color.b},1)`;
    this.option.series[0].detail.rich.unit.color = `rgba(${data.color.r},${data.color.g},${data.color.b},1)`;

    this.option.series[1].pointer.itemStyle.shadowColor = `rgba(${data.color.r},${data.color.g},${data.color.b},1)`;

    this.option.series[2].itemStyle.color.colorStops[1].color = `rgba(${data.color.r},${data.color.g},${data.color.b},0.3)`;

    this.option.series[0].data[0].value = value;
    this.option.series[1].data[0].value = value;
    this.option.series[2].data[0].value = value;
  }

  private load(data: GarbageManagementChartStationCountItem) {
    this.chart.get().then((chart) => {
      this.set(data);
      chart.setOption(this.option);
    });
  }
}
