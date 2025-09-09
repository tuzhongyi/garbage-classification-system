import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { IasEventRecord } from '../../../../common/network/model/ias/ias-event-record.model';
import { GarbageManagementListRecordEventIasBusiness } from './garbage-management-list-record-event-ias.business';

@Component({
  selector: 'howell-garbage-management-list-record-event-ias',
  imports: [CommonModule],
  templateUrl: './garbage-management-list-record-event-ias.component.html',
  styleUrl: './garbage-management-list-record-event-ias.component.less',
  providers: [GarbageManagementListRecordEventIasBusiness],
})
export class GarbageManagementListRecordEventIasComponent {
  @Input() unit = TimeUnit.Day;
  @Output() loaded = new EventEmitter<IasEventRecord[]>();
  constructor(private business: GarbageManagementListRecordEventIasBusiness) {}

  datas: IasEventRecord[] = [];

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.business
      .load(this.unit)
      .then((x) => {
        this.datas = x;
        this.loaded.emit(x);
      })
      .catch((x) => {
        this.loaded.emit([]);
      });
  }
}
