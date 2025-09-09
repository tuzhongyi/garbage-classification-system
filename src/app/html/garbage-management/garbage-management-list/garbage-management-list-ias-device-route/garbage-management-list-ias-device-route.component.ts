import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class GarbageManagementListIasDeviceRouteComponent {
  @Input() unit = TimeUnit.Day;
  @Output() loaded = new EventEmitter<DeviceRoutesStatisticItem[]>();

  constructor(private business: GarbageManagementListIasDeviceRouteBusiness) {}

  datas: DeviceRoutesStatisticItem[] = [];
  Language = Language;

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.business.load(this.unit).then((x) => {
      this.datas = x;
      this.loaded.emit(x);
    });
  }
}
