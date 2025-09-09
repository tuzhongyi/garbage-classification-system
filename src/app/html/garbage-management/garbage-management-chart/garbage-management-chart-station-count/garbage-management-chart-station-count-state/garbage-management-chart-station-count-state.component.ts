import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PromiseValue } from '../../../../../common/view-models/value.promise';
import { GarbageManagementChartStationCountItemComponent } from '../garbage-management-chart-station-count-item/garbage-management-chart-station-count-item.component';
import { GarbageManagementChartStationCountItem } from '../garbage-management-chart-station-count-item/garbage-management-chart-station-count-item.model';
import { GarbageManagementChartStationCountStateBusiness } from './business/garbage-management-chart-station-count-state.business';

@Component({
  selector: 'howell-garbage-management-chart-station-count-state',
  imports: [CommonModule, GarbageManagementChartStationCountItemComponent],
  templateUrl: './garbage-management-chart-station-count-state.component.html',
  styleUrl: './garbage-management-chart-station-count-state.component.less',
  providers: [GarbageManagementChartStationCountStateBusiness],
})
export class GarbageManagementChartStationCountStateComponent
  implements OnInit
{
  constructor(
    private business: GarbageManagementChartStationCountStateBusiness
  ) {}

  @ViewChild('chart') element?: ElementRef;
  private chart = new PromiseValue<echarts.ECharts>();

  datas: GarbageManagementChartStationCountItem[] = [];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.business.load().then((x) => {
      this.datas = x;
    });
  }
}
