import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { Language } from '../../../../../../common/tools/language';

@Component({
  selector: 'howell-garbage-management-record-event-ias-task-info',
  imports: [CommonModule, TextSpaceBetweenDirective],
  templateUrl: './garbage-management-record-event-ias-task-info.component.html',
  styleUrl: './garbage-management-record-event-ias-task-info.component.less',
})
export class GarbageManagementRecordEventIasTaskInfoComponent
  implements OnInit
{
  @Input() data?: IasEventRecord;

  Language = Language;

  ngOnInit(): void {}
}
