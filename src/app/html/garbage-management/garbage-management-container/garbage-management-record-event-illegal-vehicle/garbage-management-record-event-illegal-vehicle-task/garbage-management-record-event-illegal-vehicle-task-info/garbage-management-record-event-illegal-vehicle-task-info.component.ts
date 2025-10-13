import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { IllegalVehicleEventRecord } from '../../../../../../common/network/model/garbage-station/event-record/illegal-vehicle-event-record.model';
import { Language } from '../../../../../../common/tools/language';
import { IllegalVehicleEventRecordViewModel } from '../../garbage-management-record-event-illegal-vehicle-list/garbage-management-record-event-illegal-vehicle-list-table/garbage-management-record-event-illegal-vehicle-list-table.model';

@Component({
  selector: 'howell-garbage-management-record-event-illegal-vehicle-task-info',
  imports: [CommonModule, TextSpaceBetweenDirective],
  templateUrl:
    './garbage-management-record-event-illegal-vehicle-task-info.component.html',
  styleUrl:
    './garbage-management-record-event-illegal-vehicle-task-info.component.less',
})
export class GarbageManagementRecordEventIllegalVehicleTaskInfoComponent
  implements OnInit
{
  @Input() data?: IllegalVehicleEventRecord;

  viewmodel?: IllegalVehicleEventRecordViewModel;
  Language = Language;

  ngOnInit(): void {
    if (this.data) {
      this.viewmodel = Object.assign(
        new IllegalVehicleEventRecordViewModel(),
        this.data
      );
    }
  }
}
