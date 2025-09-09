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
import { GarbageManagementRankingRecordEventProviders } from './business/garbage-management-ranking-record-event-provider';
import { GarbageManagementRankingRecordEventBusiness } from './business/garbage-management-ranking-record-event.business';
import { GarbageManagementRankingRecordEventIndex } from './garbage-management-ranking-record-event.model';

@Component({
  selector: 'howell-garbage-management-ranking-record-event',
  imports: [CommonModule, GarbageManagementRankingComponent],
  templateUrl: './garbage-management-ranking-record-event.component.html',
  styleUrl: './garbage-management-ranking-record-event.component.less',
  providers: [...GarbageManagementRankingRecordEventProviders],
})
export class GarbageManagementRankingRecordEventComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() display = [
    GarbageManagementRankingRecordEventIndex.illegaldrop,
    GarbageManagementRankingRecordEventIndex.garbagedropduration,
    GarbageManagementRankingRecordEventIndex.garbagedropcount,
    GarbageManagementRankingRecordEventIndex.mixedinto,
    GarbageManagementRankingRecordEventIndex.garbagefull,
    GarbageManagementRankingRecordEventIndex.illegalvehicle,
  ];
  @Input() unit = TimeUnit.Day;
  @Input() date = new Date();
  @Input() index = GarbageManagementRankingRecordEventIndex.illegaldrop;
  @Output() indexChange =
    new EventEmitter<GarbageManagementRankingRecordEventIndex>();

  constructor(private business: GarbageManagementRankingRecordEventBusiness) {}

  Index = GarbageManagementRankingRecordEventIndex;
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
    change: (index: GarbageManagementRankingRecordEventIndex) => {
      this.index = index;
      this.indexChange.emit(index);
      this.load();
    },
  };
}
