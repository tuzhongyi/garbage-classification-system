import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IasEventRecord } from '../../../../common/network/model/ias/ias-event-record.model';
import { GarbageManagementListRecordEventIasComponent } from '../../garbage-management-list/garbage-management-list-record-event-ias/garbage-management-list-record-event-ias.component';
import { GarbageManagementCardComponent } from '../component/garbage-management-card.component';

@Component({
  selector: 'howell-garbage-management-card-list-record-event-ias',
  imports: [
    CommonModule,
    GarbageManagementCardComponent,
    GarbageManagementListRecordEventIasComponent,
  ],
  templateUrl: './garbage-management-card-list-record-event-ias.component.html',
  styleUrl: './garbage-management-card-list-record-event-ias.component.less',
})
export class GarbageManagementCardListRecordEventIasComponent {
  title = '垃圾暴露事件记录';

  count = 0;
  loading = true;

  on = {
    loaded: (datas: IasEventRecord[]) => {
      this.loading = false;
      this.count = datas.length;
    },
  };
}
