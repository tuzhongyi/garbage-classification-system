import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GarbageManagementRankingComponent } from '../../component/garbage-management-ranking.component';
import {
  IGarbageManagementRankingConverter,
  IGarbageManagementRankingData,
} from '../../component/garbage-management-ranking.model';
import { GarbageManagementRankingGarbageDropBusiness } from '../business/garbage-management-ranking-garbage-drop.business';
import { GarbageManagementRankingGarbageDropCountConverter } from './converter/garbage-management-ranking-garbage-drop-count.converter';
import { GarbageManagementRankingGarbageDropDurationConverter } from './converter/garbage-management-ranking-garbage-drop-duration.converter';
import { GarbageManagementRankingGarbageDropIndex } from './garbage-management-ranking-garbage-drop-index.model';

@Component({
  selector: 'howell-garbage-management-ranking-garbage-drop-index',
  imports: [CommonModule, GarbageManagementRankingComponent],
  templateUrl: './garbage-management-ranking-garbage-drop-index.component.html',
  styleUrl: './garbage-management-ranking-garbage-drop-index.component.less',
  providers: [GarbageManagementRankingGarbageDropBusiness],
})
export class GarbageManagementRankingGarbageDropIndexComponent
  implements OnInit
{
  constructor(private business: GarbageManagementRankingGarbageDropBusiness) {}

  date = new Date();
  index = GarbageManagementRankingGarbageDropIndex.duration;
  Index = GarbageManagementRankingGarbageDropIndex;
  datas: IGarbageManagementRankingData[] = [];

  converter = {
    duration: new GarbageManagementRankingGarbageDropDurationConverter(),
    count: new GarbageManagementRankingGarbageDropCountConverter(),
    get: () => {
      switch (this.index) {
        case GarbageManagementRankingGarbageDropIndex.duration:
          return this.converter.duration;
        case GarbageManagementRankingGarbageDropIndex.count:
          return this.converter.count;
        default:
          throw new Error('Invalid index');
      }
    },
  };

  ngOnInit(): void {
    this.load(this.date, this.converter.get());
  }

  private load(date: Date, converter: IGarbageManagementRankingConverter) {
    this.business.load(date, converter).then((datas) => {
      this.datas = datas;
    });
  }

  onchange(index: GarbageManagementRankingGarbageDropIndex) {
    this.index = index;
    this.load(this.date, this.converter.get());
  }
}
