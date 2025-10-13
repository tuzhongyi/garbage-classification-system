import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IllegalVehicleEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { Language } from '../../../../../../common/tools/language';

@Component({
  selector:
    'howell-garbage-management-record-event-illegal-vehicle-task-progress',
  imports: [CommonModule],
  templateUrl:
    './garbage-management-record-event-illegal-vehicle-task-progress.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-vehicle-task-progress.component.less',
})
export class GarbageManagementRecordEventIllegalVehicleTaskProgressComponent {
  @Input() data?: IllegalVehicleEventRecord;

  Language = Language;
}
