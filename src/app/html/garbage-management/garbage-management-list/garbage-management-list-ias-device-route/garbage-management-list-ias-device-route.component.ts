import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { Language } from '../../../../common/tools/language';
import { GarbageManagementListIasDeviceRouteBusiness } from './garbage-management-list-ias-device-route.business';
import { DeviceRoutesStatisticItem } from './garbage-management-list-ias-device-route.model';

@Component({
  selector: 'howell-garbage-management-list-ias-device-route',
  imports: [CommonModule],
  templateUrl: './garbage-management-list-ias-device-route.component.html',
  styleUrl: './garbage-management-list-ias-device-route.component.less',
  providers: [GarbageManagementListIasDeviceRouteBusiness],
})
export class GarbageManagementListIasDeviceRouteComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() unit = TimeUnit.Day;
  @Output() loaded = new EventEmitter<DeviceRoutesStatisticItem[]>();

  constructor(private business: GarbageManagementListIasDeviceRouteBusiness) {}

  datas: DeviceRoutesStatisticItem[] = [];
  Language = Language;
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

  private load() {
    this.business.load(this.unit).then((x) => {
      this.datas = x;
      this.loaded.emit(x);
    });
  }
}
