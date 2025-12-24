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
import {
  IasRecordEventStatisticArgs,
  IasRecordEventStatisticType,
} from './business/garbage-management-ranking-record-event-ias.model';
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
  @Input('load') _load?: EventEmitter<IasRecordEventStatisticArgs>;
  @Input() unit = TimeUnit.Day;
  @Input() date = new Date();
  @Input() index = IasRecordEventStatisticType.grid;
  @Output() indexChange = new EventEmitter<IasRecordEventStatisticType>();
  @Output() itemclick = new EventEmitter<IGarbageManagementRankingData>();
  constructor(
    private business: GarbageManagementRankingRecordEventIasBusiness
  ) {}

  Index = IasRecordEventStatisticType;
  datas: IGarbageManagementRankingData[] = [];
  private args: IasRecordEventStatisticArgs = {};
  private subscription = new Subscription();
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.args = x ?? {};
        this.load(this.args);
      });
      this.subscription.add(sub);
    }
  }
  private change = {
    unit: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.args);
      }
    },
  };
  ngOnInit(): void {
    this.load(this.args);
    this.regist();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.unit(changes['unit']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(args: IasRecordEventStatisticArgs) {
    this.business.load(this.index, this.unit, this.date, args).then((x) => {
      this.datas = x;
    });
  }

  on = {
    change: (index: IasRecordEventStatisticType) => {
      this.index = index;
      this.indexChange.emit(index);
      this.load(this.args);
    },
    item: (item: IGarbageManagementRankingData) => {
      this.itemclick.emit(item);
    },
  };
}
