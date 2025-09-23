import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { Language } from '../../../../../../common/tools/language';

@Component({
  selector: 'howell-garbage-management-record-event-ias-task-progress',
  imports: [CommonModule],
  templateUrl:
    './garbage-management-record-event-ias-task-progress.component.html',
  styleUrl:
    './garbage-management-record-event-ias-task-progress.component.less',
})
export class GarbageManagementRecordEventIasTaskProgressComponent {
  @Input() data?: IasEventRecord;

  Language = Language;
}
