import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Language } from '../../../../../../common/tools/language';
import { GarbageManagementRecordEventIasListTableArgs } from '../garbage-management-record-event-ias-list-table/business/garbage-management-record-event-ias-list-table.model';
import { GarbageManagementRecordEventIasListTableComponent } from '../garbage-management-record-event-ias-list-table/garbage-management-record-event-ias-list-table.component';

@Component({
  selector: 'howell-garbage-management-record-event-ias-list-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    GarbageManagementRecordEventIasListTableComponent,
  ],
  templateUrl:
    './garbage-management-record-event-ias-list-manager.component.html',
  styleUrl: './garbage-management-record-event-ias-list-manager.component.less',
})
export class GarbageManagementRecordEventIasListManagerComponent {
  @Output() image = new EventEmitter<PagedArgs<IasEventRecord>>();
  @Output() position = new EventEmitter<IasEventRecord>();
  @Output() task = new EventEmitter<IasEventRecord>();

  table = {
    args: new GarbageManagementRecordEventIasListTableArgs(),
    load: new EventEmitter<GarbageManagementRecordEventIasListTableArgs>(),
  };

  date = {
    format: Language.yyyyMMddHHmmss,
  };

  on = {
    image: (args: PagedArgs<IasEventRecord>) => {
      this.image.emit(args);
    },
    position: (data: IasEventRecord) => {
      this.position.emit(data);
    },
    task: (data: IasEventRecord) => {
      this.task.emit(data);
    },
    search: () => {
      this.table.args.first = true;
      this.table.load.emit(this.table.args);
    },
  };
}
