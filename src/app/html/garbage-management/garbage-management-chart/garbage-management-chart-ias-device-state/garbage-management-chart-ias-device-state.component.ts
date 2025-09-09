import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { GarbageManagementChartIasDeviceStateBusiness } from './garbage-management-chart-ias-device-state.business';

@Component({
  selector: 'howell-garbage-management-chart-ias-device-state',
  imports: [CommonModule],
  templateUrl: './garbage-management-chart-ias-device-state.component.html',
  styleUrl: './garbage-management-chart-ias-device-state.component.less',
  providers: [GarbageManagementChartIasDeviceStateBusiness],
})
export class GarbageManagementChartIasDeviceStateComponent {
  @Input('load') _load?: EventEmitter<void>;
  constructor(private business: GarbageManagementChartIasDeviceStateBusiness) {}

  value = {
    count: 3,
    online: 2,
    offline: 1,
  };
  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.load();
  }
  private regist() {
    if (this._load) {
      this.subscription.add(
        this._load.subscribe(() => {
          this.load();
        })
      );
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load() {
    this.value.count = 0;
    this.value.online = 0;
    this.value.offline = 0;
    this.business.load().then((datas) => {
      this.value.count = datas.length;
      datas.forEach((x) => {
        if (x.OnlineStatus === 0) {
          this.value.online++;
        } else {
          this.value.offline++;
        }
      });
    });
  }
}
