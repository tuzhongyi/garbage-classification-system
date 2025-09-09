import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { GarbageManagementListRecordEventBusiness } from './business/garbage-management-list-record-event.business';
import { GarbageManagementListRecordEventItem } from './business/garbage-management-list-record-event.model';

@Component({
  selector: 'howell-garbage-management-list-record-event',
  imports: [CommonModule],
  templateUrl: './garbage-management-list-record-event.component.html',
  styleUrl: './garbage-management-list-record-event.component.less',
  providers: [GarbageManagementListRecordEventBusiness],
})
export class GarbageManagementListRecordEventComponent implements OnInit {
  @Input() unit = TimeUnit.Day;
  @Output() loaded = new EventEmitter<GarbageManagementListRecordEventItem[]>();
  constructor(private business: GarbageManagementListRecordEventBusiness) {}

  datas: GarbageManagementListRecordEventItem[] = [];

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.business.load(this.unit).then((x) => {
      this.datas = x;
      this.loaded.emit(this.datas);
    });
  }
}
