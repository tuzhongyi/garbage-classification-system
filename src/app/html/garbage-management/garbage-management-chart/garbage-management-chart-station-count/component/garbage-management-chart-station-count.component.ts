import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';
import { Subscription } from 'rxjs';
import { PromiseValue } from '../../../../../common/view-models/value.promise';
import { GarbageManagementChartStationCountItemComponent } from '../garbage-management-chart-station-count-item/garbage-management-chart-station-count-item.component';
import { GarbageManagementChartStationCountItem } from '../garbage-management-chart-station-count-item/garbage-management-chart-station-count-item.model';
import { GarbageManagementChartCountBusiness } from './business/garbage-management-chart-station-count.business';

@Component({
  selector: 'howell-garbage-management-chart-station-count',
  templateUrl: './garbage-management-chart-station-count.component.html',
  styleUrl: './garbage-management-chart-station-count.component.less',
  standalone: true,
  imports: [CommonModule, GarbageManagementChartStationCountItemComponent],
  providers: [GarbageManagementChartCountBusiness],
})
export class GarbageManagementChartStationCountComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  constructor(private business: GarbageManagementChartCountBusiness) {}

  @ViewChild('chart') element?: ElementRef;
  private chart = new PromiseValue<echarts.ECharts>();

  datas: GarbageManagementChartStationCountItem[] = [];
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
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  load() {
    this.business.load().then((x) => {
      this.datas = x;
    });
  }
}
