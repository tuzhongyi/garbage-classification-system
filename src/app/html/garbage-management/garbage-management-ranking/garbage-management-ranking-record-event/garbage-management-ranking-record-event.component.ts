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
import { WheelHorizontalScrollDirective } from '../../../../common/directives/wheel-horizontal-scroll/wheel-horizontal-scroll.directive';
import { EventType } from '../../../../common/enum/event-type.enum';
import { TimeUnit } from '../../../../common/enum/time-unit.enum';
import { DivisionNumberStatistic } from '../../../../common/network/model/garbage-station/division-number-statistic.model';
import { GarbageStationNumberStatistic } from '../../../../common/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageManagementRankingComponent } from '../component/garbage-management-ranking.component';
import { IGarbageManagementRankingData } from '../component/garbage-management-ranking.model';
import { GarbageManagementRankingRecordEventProviders } from './business/garbage-management-ranking-record-event-provider';
import { GarbageManagementRankingRecordEventBusiness } from './business/garbage-management-ranking-record-event.business';
import {
  GarbageManagementRankingRecordEventArgs,
  GarbageManagementRankingRecordEventIndex,
} from './garbage-management-ranking-record-event.model';

@Component({
  selector: 'howell-garbage-management-ranking-record-event',
  imports: [
    CommonModule,
    GarbageManagementRankingComponent,
    WheelHorizontalScrollDirective,
  ],
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
    GarbageManagementRankingRecordEventIndex.illegaldump,
    GarbageManagementRankingRecordEventIndex.illegalvehicle,
  ];
  @Input() unit = TimeUnit.Day;
  @Input() date = new Date();
  @Input() index = GarbageManagementRankingRecordEventIndex.illegaldrop;
  @Output() indexChange =
    new EventEmitter<GarbageManagementRankingRecordEventIndex>();
  @Output() itemclick =
    new EventEmitter<GarbageManagementRankingRecordEventArgs>();

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
    this.regist();
    this.load();
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

  private get = {
    type: () => {
      switch (this.index) {
        case GarbageManagementRankingRecordEventIndex.garbagefull:
          return EventType.GarbageFull;
        case GarbageManagementRankingRecordEventIndex.illegaldrop:
          return EventType.IllegalDrop;
        case GarbageManagementRankingRecordEventIndex.illegaldump:
          return EventType.IllegalDrop2;
        case GarbageManagementRankingRecordEventIndex.illegalvehicle:
          return EventType.IllegalVehicle;
        case GarbageManagementRankingRecordEventIndex.mixedinto:
          return EventType.MixedInto;
        case GarbageManagementRankingRecordEventIndex.garbagedropcount:
        case GarbageManagementRankingRecordEventIndex.garbagedropduration:
        default:
          return EventType.GarbageDrop;
      }
    },
  };

  on = {
    change: (index: GarbageManagementRankingRecordEventIndex) => {
      this.index = index;
      this.indexChange.emit(index);
      this.load();
    },
    item: {
      click: (data: IGarbageManagementRankingData) => {
        let args: GarbageManagementRankingRecordEventArgs = {
          type: this.get.type(),
        };
        if (data.data instanceof DivisionNumberStatistic) {
          args.divisionId = data.data.Id;
        } else if (data.data instanceof GarbageStationNumberStatistic) {
          args.stationId = data.data.Id;
        }
        this.itemclick.emit(args);
      },
    },
  };
}
