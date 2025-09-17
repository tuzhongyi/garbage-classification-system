import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
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
export class GarbageManagementListRecordEventIllegalVehicleComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() unit = TimeUnit.Day;
  @Output() loaded = new EventEmitter<IllegalVehicleEventRecord[]>();
  constructor(
    private business: GarbageManagementListRecordEventIllegalVehicleBusiness
  ) {}

  datas: IllegalVehicleEventRecord[] = [];
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
