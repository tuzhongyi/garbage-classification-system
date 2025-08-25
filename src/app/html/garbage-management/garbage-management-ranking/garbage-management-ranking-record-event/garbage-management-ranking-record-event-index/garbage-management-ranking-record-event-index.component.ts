import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventType } from '../../../../../common/enum/event-type.enum';
import { Language } from '../../../../../common/tools/language';
import { GarbageManagementRankingComponent } from '../../component/garbage-management-ranking.component';
import { IGarbageManagementRankingData } from '../../component/garbage-management-ranking.model';
import { GarbageManagementRankingRecordEventDivisionBusiness } from '../business/garbage-management-ranking-record-event-division.business';
import { GarbageManagementRankingRecordEventStationBusiness } from '../business/garbage-management-ranking-record-event-station.business';
import { GarbageManagementRankingRecordEventBusiness } from '../business/garbage-management-ranking-record-event.business';

@Component({
  selector: 'howell-garbage-management-ranking-record-event-index',
  imports: [CommonModule, GarbageManagementRankingComponent],
  templateUrl: './garbage-management-ranking-record-event-index.component.html',
  styleUrl: './garbage-management-ranking-record-event-index.component.less',
  providers: [
    GarbageManagementRankingRecordEventDivisionBusiness,
    GarbageManagementRankingRecordEventStationBusiness,
    GarbageManagementRankingRecordEventBusiness,
  ],
})
export class GarbageManagementRankingRecordEventIndexComponent {
  constructor(private business: GarbageManagementRankingRecordEventBusiness) {}

  type = EventType.IllegalDrop;

  date = new Date();
  datas: IGarbageManagementRankingData[] = [];
  Type = EventType;
  Language = Language;

  ngOnInit(): void {
    this.load(this.type, this.date);
  }

  private load(type: EventType, date: Date) {
    this.business.load(type, date).then((datas) => {
      this.datas = datas;
    });
  }

  onchange(type: EventType) {
    this.type = type;
    this.load(this.type, this.date);
  }
}
