import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGarbageManagementRankingData } from './garbage-management-ranking.model';

@Component({
  selector: 'howell-garbage-management-ranking',
  imports: [CommonModule],
  templateUrl: './garbage-management-ranking.component.html',
  styleUrl: './garbage-management-ranking.component.less',
})
export class GarbageManagementRankingComponent {
  @Input() datas: IGarbageManagementRankingData[] = [];
  @Output() itemclick = new EventEmitter<IGarbageManagementRankingData>();

  on = {
    click: (item: IGarbageManagementRankingData) => {
      this.itemclick.emit(item);
    },
  };
}
