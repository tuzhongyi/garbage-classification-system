import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { GarbageManagementRankingComponent } from '../component/garbage-management-ranking.component';
import { IGarbageManagementRankingData } from '../component/garbage-management-ranking.model';
import { GarbageManagementRankingRecordEventIasBusiness } from './business/garbage-management-ranking-record-event-ias.business';
import { IasRecordEventStatisticType } from './business/garbage-management-ranking-record-event-ias.model';
import { GarbageManagementRankingRecordEventIasProviders } from './business/garbage-management-ranking-record-event-ias.provider';

@Component({
  selector: 'howell-garbage-management-ranking-record-event-ias',
  imports: [CommonModule, GarbageManagementRankingComponent],
  templateUrl: './garbage-management-ranking-record-event-ias.component.html',
  styleUrl: './garbage-management-ranking-record-event-ias.component.less',
  providers: [...GarbageManagementRankingRecordEventIasProviders],
})
export class GarbageManagementRankingRecordEventIasComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() unit = TimeUnit.Day;
  @Input() date = new Date();
  @Input() index = IasRecordEventStatisticType.grid;
  @Output() indexChange = new EventEmitter<IasRecordEventStatisticType>();
  constructor(
    private business: GarbageManagementRankingRecordEventIasBusiness
  ) {}

  Index = IasRecordEventStatisticType;
  datas: IGarbageManagementRankingData[] = [];
  private subscription = new Subscription();
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe(() => {
        this.load();
      });
      this.subscription.add(sub);
    }
  }
  private change = {
    unit: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load();
      }
    },
  };
  ngOnInit(): void {
    this.load();
    this.regist();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.unit(changes['unit']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load() {
    this.business.load(this.index, this.unit, this.date).then((x) => {
      this.datas = x;
    });
  }

  on = {
    change: (index: IasRecordEventStatisticType) => {
      this.index = index;
      this.indexChange.emit(index);
      this.load();
    },
  };
}
