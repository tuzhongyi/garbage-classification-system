import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GarbageManagementStatisticRecordItemComponent } from '../garbage-management-statistic-record-item/garbage-management-statistic-record-item.component';
import { GarbageManagementStatisticRecordItem } from '../garbage-management-statistic-record-item/garbage-management-statistic-record-item.model';
import { GarbageManagementStatisticRecordBusiness } from './business/garbage-management-statistic-record.business';

@Component({
  selector: 'howell-garbage-management-statistic-record',
  imports: [CommonModule, GarbageManagementStatisticRecordItemComponent],
  templateUrl: './garbage-management-statistic-record.component.html',
  styleUrl: './garbage-management-statistic-record.component.less',
  providers: [GarbageManagementStatisticRecordBusiness],
})
export class GarbageManagementStatisticRecordComponent implements OnInit {
  constructor(private business: GarbageManagementStatisticRecordBusiness) {}

  datas: GarbageManagementStatisticRecordItem[] = [];

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.business.load().then((x) => {
      this.datas = x;
    });
  }
}
