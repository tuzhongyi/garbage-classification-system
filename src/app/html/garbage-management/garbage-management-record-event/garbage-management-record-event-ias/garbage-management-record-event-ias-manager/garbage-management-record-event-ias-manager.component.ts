import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GarbageManagementRecordEventIasListManagerComponent } from '../garbage-management-record-event-ias-list/garbage-management-record-event-ias-list-manager/garbage-management-record-event-ias-list-manager.component';
import { GarbageManagementRecordEventIasStatisticDetailsManagerComponent } from '../garbage-management-record-event-ias-statistic-details/garbage-management-record-event-ias-statistic-details-manager/garbage-management-record-event-ias-statistic-details-manager.component';
import { GarbageManagementRecordEventIasManagerIndex } from '../garbage-management-record-event-ias.model';

@Component({
  selector: 'howell-garbage-management-record-event-ias-manager',
  imports: [
    CommonModule,
    GarbageManagementRecordEventIasListManagerComponent,
    GarbageManagementRecordEventIasStatisticDetailsManagerComponent,
  ],
  templateUrl: './garbage-management-record-event-ias-manager.component.html',
  styleUrl: './garbage-management-record-event-ias-manager.component.less',
})
export class GarbageManagementRecordEventIasManagerComponent {
  index = GarbageManagementRecordEventIasManagerIndex.list;
  Index = GarbageManagementRecordEventIasManagerIndex;
}
