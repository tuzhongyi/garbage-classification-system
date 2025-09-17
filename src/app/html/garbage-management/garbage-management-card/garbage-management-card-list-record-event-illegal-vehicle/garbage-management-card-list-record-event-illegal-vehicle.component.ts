import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { IllegalVehicleEventRecord } from '../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { GarbageManagementListRecordEventIllegalVehicleComponent } from '../../garbage-management-list/garbage-management-list-record-event-illegal-vehicle/garbage-management-list-record-event-illegal-vehicle.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'app-garbage-management-card-list-record-event-illegal-vehicle',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementListRecordEventIllegalVehicleComponent,
  ],
  templateUrl:
    './garbage-management-card-list-record-event-illegal-vehicle.component.html',
  styleUrl:
    './garbage-management-card-list-record-event-illegal-vehicle.component.less',
})
export class GarbageManagementCardListRecordEventIllegalVehicleComponent {
  @Input() load?: EventEmitter<void>;
  title = '非法清运事件记录';

  count = 0;
  loading = true;

  on = {
    loaded: (datas: IllegalVehicleEventRecord[]) => {
      this.loading = false;
      this.count = datas.length;
    },
  };
}
