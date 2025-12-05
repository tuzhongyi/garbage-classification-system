import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/select/hw-select/select-control.component';
import { Duration } from '../../../../../../common/network/model/garbage-station/duration.model';
import { IasEventRecord } from '../../../../../../common/network/model/ias/ias-event-record.model';
import { PagedArgs } from '../../../../../../common/network/model/model.interface';
import { Language } from '../../../../../../common/tools/language';
import { SelectGridCellComponent } from '../../../../../share/select/select-grid-cell/select-grid-cell.component';
import { GarbageManagementRecordEventIasListTableArgs } from '../garbage-management-record-event-ias-list-table/business/garbage-management-record-event-ias-list-table.model';
import { GarbageManagementRecordEventIasListTableComponent } from '../garbage-management-record-event-ias-list-table/garbage-management-record-event-ias-list-table.component';

@Component({
  selector: 'howell-garbage-management-record-event-ias-list-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    SelectGridCellComponent,
    HowellSelectComponent,
    GarbageManagementRecordEventIasListTableComponent,
  ],
  templateUrl:
    './garbage-management-record-event-ias-list-manager.component.html',
  styleUrl: './garbage-management-record-event-ias-list-manager.component.less',
})
export class GarbageManagementRecordEventIasListManagerComponent
  implements OnChanges
{
  @Input() timeout?: boolean;
  @Output() image = new EventEmitter<PagedArgs<IasEventRecord>>();
  @Output() position = new EventEmitter<IasEventRecord>();
  @Output() task = new EventEmitter<IasEventRecord>();
  @Output() video = new EventEmitter<IasEventRecord>();
  @Output() association = new EventEmitter<{
    duration: Duration;
    data: IasEventRecord;
  }>();
  table = {
    args: new GarbageManagementRecordEventIasListTableArgs(),
    load: new EventEmitter<GarbageManagementRecordEventIasListTableArgs>(),
  };

  date = {
    format: Language.yyyyMMddHHmmss,
  };

  private change = {
    timeout: (simple: SimpleChange) => {
      if (simple) {
        this.table.args.timeout = this.timeout;
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.timeout(changes['timeout']);
  }

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
    video: (data: IasEventRecord) => {
      this.video.emit(data);
    },
    search: () => {
      this.table.args.first = true;
      this.table.load.emit(this.table.args);
    },
    association: (args: { duration: Duration; data: IasEventRecord }) => {
      this.association.emit(args);
    },
  };
}
