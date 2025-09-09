import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';

import { CommonModule } from '@angular/common';
import { IllegalVehicleEventRecord } from '../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { GarbageManagementListRecordEventIllegalVehicleBusiness } from './garbage-management-list-record-event-illegal-vehicle.business';

@Component({
  selector: 'howell-garbage-management-list-record-event-illegal-vehicle',
  imports: [CommonModule],
  templateUrl:
    './garbage-management-list-record-event-illegal-vehicle.component.html',
  styleUrl:
    './garbage-management-list-record-event-illegal-vehicle.component.less',
  providers: [GarbageManagementListRecordEventIllegalVehicleBusiness],
})
export class GarbageManagementListRecordEventIllegalVehicleComponent {
  @Input() unit = TimeUnit.Day;
  @Output() loaded = new EventEmitter<IllegalVehicleEventRecord[]>();
  constructor(
    private business: GarbageManagementListRecordEventIllegalVehicleBusiness
  ) {}

  datas: IllegalVehicleEventRecord[] = [];

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
